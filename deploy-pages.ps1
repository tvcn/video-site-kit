param(
  [ValidateSet('main','subsites','content','kit','pages','all')]
  [string]$Mode = 'all',
  [switch]$NoProxy
)
$ErrorActionPreference = 'Stop'
$root = 'C:\Users\chenhua\Desktop\tvcn'
$envPath = 'C:\Users\chenhua\.config\tvcn\github.env'
$git = Join-Path $root 'build\mingit\cmd\git.exe'
$statePath = Join-Path $root 'build\deploy-state.json'

if (-not (Test-Path -LiteralPath $git)) { throw "Missing git: $git" }
$lines = Get-Content -LiteralPath $envPath
$token = ($lines | Where-Object { $_ -match '^(ghp_|github_pat_)' } | Select-Object -First 1)
if (-not $token) { throw 'Token line not found in github.env' }
$token = $token.Trim()
$urlLine = ($lines | Where-Object { $_ -match '^https://github\.com/' } | Select-Object -First 1)
if ($urlLine) {
  $owner = ($urlLine.Trim() -replace '^https://github\.com/','').Trim('/')
} else {
  $owner = 'tvcn'
}
$headers = @{
  Authorization = "Bearer $token"
  Accept = 'application/vnd.github+json'
  'X-GitHub-Api-Version' = '2022-11-28'
  'User-Agent' = 'tvcn-pages-deploy'
}

function Get-GitHubEdge {
  $candidates = @('140.82.114.3','140.82.121.3','20.27.177.113','20.200.245.247','20.205.243.166','140.82.113.3','140.82.112.3')
  if ($env:TVCN_GIT_EDGE) {
    $candidates = @($env:TVCN_GIT_EDGE) + $candidates
  }
  foreach ($ip in $candidates) {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
      $iar = $client.BeginConnect($ip, 443, $null, $null)
      if ($iar.AsyncWaitHandle.WaitOne(2500)) {
        $client.EndConnect($iar)
        return $ip
      }
    } catch {
    } finally {
      $client.Close()
    }
  }
  throw 'No reachable GitHub edge IP'
}

$sites = @(
  @{ id='main';      repo='video-production-hub'; domain='tvcn.org';         stage='main';      role='主站' },
  @{ id='story';     repo='video-storytelling';   domain='story.tvcn.org';       stage='story';     role='故事与编剧' },
  @{ id='shoot';     repo='video-shooting';       domain='shoot.tvcn.org';       stage='shoot';     role='拍摄' },
  @{ id='post';      repo='video-editing';        domain='post.tvcn.org';        stage='post';      role='后期' },
  @{ id='ai';        repo='ai-video';             domain='ai.tvcn.org';          stage='ai';        role='AI 影像' },
  @{ id='animation'; repo='video-animation';      domain='animation.tvcn.org';   stage='animation'; role='动画' },
  @{ id='formats';   repo='video-formats';        domain='formats.tvcn.org';     stage='formats';   role='片型' },
  @{ id='tools';     repo='video-tools';          domain='tools.tvcn.org';       stage='tools';     role='工具' },
  @{ id='context';   repo='media-literacy';       domain='context.tvcn.org';     stage='context';   role='影像史与素养' }
)

function Invoke-GH {
  param(
    [Parameter(Mandatory=$true)][string]$Method,
    [Parameter(Mandatory=$true)][string]$Path,
    [object]$Body = $null,
    [int]$Retry = 0
  )
  $uri = 'https://api.github.com' + $Path
  $params = @{
    Uri = $uri
    Method = $Method
    Headers = $headers
    ErrorAction = 'Stop'
    TimeoutSec = 120
    ResponseHeadersVariable = 'ghHeaders'
  }
  if ($null -ne $Body) {
    $params.Body = ($Body | ConvertTo-Json -Depth 20 -Compress)
    $params.ContentType = 'application/json'
  }
  try {
    $result = Invoke-RestMethod @params
    $script:LastHeaders = $ghHeaders
    return $result
  } catch {
    $response = $_.Exception.Response
    $code = if ($response) { [int]$response.StatusCode } else { 0 }
    $msg = $_.ErrorDetails.Message
    if (-not $msg) { $msg = $_.Exception.Message }
    if ($code -eq 403 -and $Retry -lt 6) {
      $reset = $null
      if ($response) {
        try { $reset = ($response.Headers.GetValues('X-RateLimit-Reset') | Select-Object -First 1) } catch {}
      }
      if ($reset) {
        $wait = [Math]::Max(5, ([DateTimeOffset]::FromUnixTimeSeconds([long]$reset) - [DateTimeOffset]::UtcNow).TotalSeconds + 2)
      } else {
        $wait = 30
      }
      Write-Output ("WAIT_RATE_LIMIT={0}s PATH={1}" -f [int]$wait, $Path)
      Start-Sleep -Seconds ([int]$wait)
      return (Invoke-GH -Method $Method -Path $Path -Body $Body -Retry ($Retry + 1))
    }
    throw ("GitHub {0} {1} failed {2}: {3}" -f $Method, $Path, $code, $msg)
  }
}

function Get-RepoOrNull([string]$Repo) {
  try { return (Invoke-GH -Method GET -Path "/repos/$owner/$Repo") }
  catch {
    if ($_.Exception.Message -match 'failed 404') { return $null }
    throw
  }
}

function Ensure-Repo {
  param([string]$Repo, [string]$Description, [string]$Homepage)
  $existing = Get-RepoOrNull $Repo
  if ($existing) {
    Write-Output ("REPO_EXISTS=" + $Repo)
    return $existing
  }
  $body = @{
    name = $Repo
    description = $Description
    homepage = $Homepage
    private = $false
    has_issues = $false
    has_wiki = $false
    auto_init = $false
    is_template = $false
  }
  $created = Invoke-GH -Method POST -Path "/user/repos" -Body $body
  Write-Output ("REPO_CREATED=" + $Repo)
  Start-Sleep -Seconds 2
  return $created
}

function Set-GitIdentity {
  & $git -C $args[0] config user.name 'TVCN Publisher'
  & $git -C $args[0] config user.email 'tvcn@users.noreply.github.com'
  & $git -C $args[0] config core.autocrlf false
  & $git -C $args[0] config core.quotepath false
}

function Push-Stage {
  param([string]$Repo, [string]$StageDir, [string]$Message)
  if (-not (Test-Path -LiteralPath $StageDir)) { throw "Missing stage: $StageDir" }
  if (-not (Test-Path -LiteralPath (Join-Path $StageDir '.git'))) {
    & $git init -b main $StageDir | Out-Null
  }
  Set-GitIdentity $StageDir
  $remotes = & $git -C $StageDir remote
  if ($remotes -notcontains 'origin') {
    & $git -C $StageDir remote add origin ("https://github.com/{0}/{1}.git" -f $owner, $Repo) | Out-Null
  }

  $env:GIT_CONFIG_COUNT = $null
  $basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$token"))
  $netArgs = @('-c', "http.extraheader=Authorization: Basic $basic")
  if ($NoProxy) {
    # The local proxy may be down; push directly without changing global git config.
    $netArgs += @('-c', 'http.proxy=', '-c', 'https.proxy=')
    $netArgs += @('-c', 'http.sslBackend=schannel')
  }

  # Push the whole tree. Retry on connection resets; a partial upload is
  # restarted, but the pack is already compressed locally.
  & $git -C $StageDir add -A
  $status = & $git -C $StageDir status --porcelain
  if ($status) {
    & $git -C $StageDir commit -m $Message | Out-Null
  } else {
    Write-Output ("NO_CHANGES=" + $Repo)
  }

  # Pack loose objects before upload; large loose-object pushes are more
  # likely to reset on this network.
  & $git -C $StageDir gc --quiet

  for ($attempt = 1; $attempt -le 3; $attempt++) {
    $pushArgs = @('-C', $StageDir) + $netArgs
    if ($NoProxy) {
      $edge = Get-GitHubEdge
      $pushArgs += @('-c', ("http.curloptResolve=github.com:443:" + $edge))
      Write-Output ("PUSH_EDGE={0} ATTEMPT={1}" -f $edge, $attempt)
    }
    $pushArgs += @('-c', 'http.version=HTTP/1.1', '-c', 'http.postBuffer=524288000', 'push', '-u', 'origin', 'main', '--force')
    & $git @pushArgs
    if ($LASTEXITCODE -eq 0) { break }
    if ($attempt -lt 3) {
      Write-Output ("RETRY_PUSH={0} ATTEMPT={1}" -f $Repo, $attempt)
      Start-Sleep -Seconds 10
    }
  }
  if ($LASTEXITCODE -ne 0) { throw "git push failed: $Repo" }
  Write-Output ("GIT_PUSHED=" + $Repo)
}

function New-Blob {
  param([string]$Repo, [string]$FilePath)
  $bytes = [IO.File]::ReadAllBytes($FilePath)
  if ($bytes.Length -eq 0) { $bytes = [byte[]](10) }
  $b64 = [Convert]::ToBase64String($bytes)
  $r = Invoke-GH -Method POST -Path "/repos/$owner/$Repo/git/blobs" -Body @{ content=$b64; encoding='base64' }
  return $r.sha
}

function Patch-RepoFiles {
  param([string]$Repo, [string]$StageDir, [string[]]$Paths, [string]$Message)
  $ref = $null
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try {
      $ref = Invoke-GH -Method GET -Path "/repos/$owner/$Repo/git/ref/heads/main"
      break
    } catch {
      if ($_.Exception.Message -notmatch 'failed 404') { throw }
      Start-Sleep -Seconds 2
    }
  }
  if (-not $ref) { throw "main branch not ready: $Repo" }
  $commit = Invoke-GH -Method GET -Path "/repos/$owner/$Repo/git/commits/$($ref.object.sha)"
  $entries = @()
  foreach ($p in $Paths) {
    $full = Join-Path $StageDir $p
    if (-not (Test-Path -LiteralPath $full)) { throw "Missing patch file: $full" }
    $sha = New-Blob -Repo $Repo -FilePath $full
    $entries += @{ path=$p; mode='100644'; type='blob'; sha=$sha }
  }
  $tree = Invoke-GH -Method POST -Path "/repos/$owner/$Repo/git/trees" -Body @{ tree=$entries; base_tree=$commit.tree.sha }
  $newCommit = Invoke-GH -Method POST -Path "/repos/$owner/$Repo/git/commits" -Body @{ message=$Message; tree=$tree.sha; parents=@($ref.object.sha) }
  Invoke-GH -Method PATCH -Path "/repos/$owner/$Repo/git/refs/heads/main" -Body @{ sha=$newCommit.sha; force=$true } | Out-Null
  Write-Output ("PATCHED=" + $Repo)
  return $newCommit.sha
}

function Configure-Pages {
  param([string]$Repo, [string]$Cname)
  $pages = $null
  try { $pages = Invoke-GH -Method GET -Path "/repos/$owner/$Repo/pages" } catch { if ($_.Exception.Message -notmatch 'failed 404') { throw } }
  if (-not $pages) {
    $pages = Invoke-GH -Method POST -Path "/repos/$owner/$Repo/pages" -Body @{
      source = @{ branch='main'; path='/' }
      build_type = 'legacy'
    }
    Write-Output ("PAGES_ENABLED=" + $Repo)
    Start-Sleep -Seconds 3
  } else {
    Write-Output ("PAGES_EXISTS=" + $Repo)
  }
  try {
    $updated = Invoke-GH -Method PUT -Path "/repos/$owner/$Repo/pages" -Body @{
      cname = $Cname
      https_enforced = $false
      build_type = 'legacy'
      source = @{ branch='main'; path='/' }
    }
    Write-Output ("PAGES_CNAME_SET={0} => {1}" -f $Repo, $Cname)
    return $updated
  } catch {
    Write-Output ("PAGES_CNAME_FAILED={0} => {1} : {2}" -f $Repo, $Cname, $_.Exception.Message)
    return $null
  }
}

Write-Output ("OWNER=" + $owner)
Write-Output ("MODE=" + $Mode)

if ($Mode -in @('all','main')) {
  $mainStage = Join-Path $root 'build\pages-sites\main'
  Ensure-Repo -Repo 'video-production-hub' -Description 'TVCN 影像制作知识库主站：路径、方法、工具与案例' -Homepage 'https://tvcn.org' | Out-Null
  Push-Stage -Repo 'video-production-hub' -StageDir $mainStage -Message 'Publish TVCN main site'
  Invoke-GH -Method PATCH -Path "/repos/$owner/video-production-hub" -Body @{ is_template=$true; default_branch='main' } | Out-Null
}

if ($Mode -in @('all','subsites')) {
  foreach ($site in ($sites | Where-Object { $_.id -ne 'main' })) {
    $stage = Join-Path $root ("build\pages-sites\" + $site.stage)
    $existing = Get-RepoOrNull $site.repo
    if (-not $existing) {
      $body = @{
        owner = $owner
        name = $site.repo
        description = "TVCN 分站：" + $site.role
        private = $false
        include_all_branches = $false
      }
      Invoke-GH -Method POST -Path "/repos/$owner/video-production-hub/generate" -Body $body | Out-Null
      Write-Output ("GENERATED=" + $site.repo)
      Start-Sleep -Seconds 3
      $existing = Get-RepoOrNull $site.repo
      if (-not $existing) { throw "Generated repo not found: $($site.repo)" }
    } else {
      Write-Output ("SUBSITE_EXISTS=" + $site.repo)
    }
    # A generated subsite is a full copy of the site; push the whole stage so
    # static pages, sitemap and SEO head stay in sync with the main site.
    Push-Stage -Repo $site.repo -StageDir $stage -Message ("Publish {0} site" -f $site.id)
  }
}

if ($Mode -in @('all','content')) {
  Ensure-Repo -Repo 'video-production-handbook' -Description 'TVCN 双语内容仓：464 对 Markdown、928 个图解引用、索引与来源' -Homepage 'https://tvcn.org' | Out-Null
  Push-Stage -Repo 'video-production-handbook' -StageDir (Join-Path $root 'v2\content') -Message 'Publish TVCN bilingual handbook'
}

if ($Mode -in @('all','kit')) {
  Ensure-Repo -Repo 'video-site-kit' -Description 'TVCN 站点引擎、页面骨架、QA 与发布工具' -Homepage 'https://tvcn.org' | Out-Null
  Push-Stage -Repo 'video-site-kit' -StageDir (Join-Path $root 'build\site-kit') -Message 'Publish TVCN site kit'
}

if ($Mode -in @('all','pages')) {
  foreach ($site in $sites) {
    Configure-Pages -Repo $site.repo -Cname $site.domain | Out-Null
  }
}

Write-Output 'DEPLOY_STEP_DONE'

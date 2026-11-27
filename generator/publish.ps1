param(
  [string]$Site = 'all',
  [switch]$Push,
  [switch]$SkipAudit
)
$ErrorActionPreference = 'Stop'
$root = 'C:\Users\chenhua\Desktop\tvcn'
$git = 'C:\Program Files\Git\cmd\git.exe'
$sites = @('main','story','shoot','post','ai','animation','formats','tools','context')

if (-not $SkipAudit) {
  node (Join-Path $root 'generator\qa-sites.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'site QA failed' }
  node (Join-Path $root 'generator\qa-links.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'link QA failed' }
}

$targets = if ($Site -eq 'all') { $sites } else { @($Site) }
foreach ($id in $targets) {
  $src = Join-Path $root "out\$id"
  $dst = Join-Path $root "deploy\$id"
  if (-not (Test-Path -LiteralPath (Join-Path $src 'index.html'))) { throw "missing out build: $id" }
  if (-not (Test-Path -LiteralPath (Join-Path $dst '.git'))) { throw "missing deploy git: $id" }

  $tmpGit = Join-Path $root ("deploy\.publish-git-" + $id)
  if (Test-Path -LiteralPath $tmpGit) { Remove-Item -LiteralPath $tmpGit -Recurse -Force }
  Move-Item -LiteralPath (Join-Path $dst '.git') -Destination $tmpGit
  & 'C:\Windows\System32\robocopy.exe' $src $dst /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed: $id ($LASTEXITCODE)" }
  Move-Item -LiteralPath $tmpGit -Destination (Join-Path $dst '.git')

  & $git -C $dst config user.name 'TVCN Publisher'
  & $git -C $dst config user.email 'tvcn@users.noreply.github.com'
  & $git -C $dst add -A
  $status = & $git -C $dst status --porcelain
  if ($status) { & $git -C $dst commit -m "Publish $id per-site build" | Out-Null }
  else { Write-Output "NO_CHANGES=$id" }

  if ($Push) {
    $envFile = 'C:\Users\chenhua\.config\tvcn\github.env'
    $token = (Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^(ghp_|github_pat_)' } | Select-Object -First 1).Trim()
    if (-not $token) { throw 'GitHub token not found' }
    $basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$token"))
    & $git -C $dst -c "http.extraheader=Authorization: Basic $basic" -c 'http.proxy=' -c 'https.proxy=' push -u origin main
    if ($LASTEXITCODE -ne 0) { throw "push failed: $id" }
    Write-Output "PUSHED=$id"
  } else {
    Write-Output "STAGED=$id"
  }
}
Write-Output 'DONE'

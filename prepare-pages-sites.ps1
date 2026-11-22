$ErrorActionPreference = 'Stop'
$root = 'C:\Users\chenhua\Desktop\tvcn'
$dist = Join-Path $root 'v2\dist'
$outRoot = Join-Path $root 'build\pages-sites'
if (-not (Test-Path -LiteralPath (Join-Path $dist 'index.html'))) { throw "Missing dist index: $dist" }
if (Test-Path -LiteralPath $outRoot) { Remove-Item -LiteralPath $outRoot -Recurse -Force }
New-Item -ItemType Directory -Path $outRoot | Out-Null

$sites = @(
  @{ id='main';      repo='video-production-hub'; domain='www.tvcn.org';             route=$null },
  @{ id='story';     repo='video-storytelling';   domain='story.tvcn.org';       route='story' },
  @{ id='shoot';     repo='video-shooting';       domain='shoot.tvcn.org';       route='shoot' },
  @{ id='post';      repo='video-editing';        domain='post.tvcn.org';        route='post' },
  @{ id='ai';        repo='ai-video';             domain='ai.tvcn.org';          route='ai' },
  @{ id='animation'; repo='video-animation';      domain='animation.tvcn.org';   route='animation' },
  @{ id='formats';   repo='video-formats';        domain='formats.tvcn.org';     route='formats' },
  @{ id='tools';     repo='video-tools';          domain='tools.tvcn.org';       route='tools' },
  @{ id='context';   repo='media-literacy';       domain='context.tvcn.org';     route='context' }
)

foreach ($site in $sites) {
  $dest = Join-Path $outRoot $site.id
  New-Item -ItemType Directory -Path $dest | Out-Null
  & 'C:\Windows\System32\robocopy.exe' $dist $dest /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $($site.id): $LASTEXITCODE" }

  Set-Content -LiteralPath (Join-Path $dest 'CNAME') -Value $site.domain -Encoding utf8NoBOM

  $indexPath = Join-Path $dest 'index.html'
  $index = [IO.File]::ReadAllText($indexPath)
  $oldSeo = 'const SEO_BASE = "https://www.tvcn.org";'
  $newSeo = 'const SEO_BASE = "https://' + $site.domain + '";'
  if (-not $index.Contains($oldSeo)) { throw "SEO_BASE not found in $($site.id)" }
  $index = $index.Replace($oldSeo, $newSeo)

  if ($site.route) {
    $hostScript = @"
<script>
(() => {
  const siteMap = {
    "story.tvcn.org": "story",
    "shoot.tvcn.org": "shoot",
    "post.tvcn.org": "post",
    "ai.tvcn.org": "ai",
    "animation.tvcn.org": "animation",
    "formats.tvcn.org": "formats",
    "tools.tvcn.org": "tools",
    "context.tvcn.org": "context"
  };
  const siteId = siteMap[location.hostname];
  if (siteId && (!location.hash || location.hash === "#" || location.hash === "#/")) {
    history.replaceState(null, "", "#/site/" + siteId);
  }
})();
</script>
"@
    $bodyPattern = '(<body[^>]*>)'
    $match = [regex]::Match($index, $bodyPattern, 'IgnoreCase')
    if (-not $match.Success) { throw "body tag not found in $($site.id)" }
    $index = $index.Substring(0, $match.Index + $match.Length) + [Environment]::NewLine + $hostScript + $index.Substring($match.Index + $match.Length)
  }

  [IO.File]::WriteAllText($indexPath, $index, (New-Object System.Text.UTF8Encoding($false)))
  $files = (Get-ChildItem -LiteralPath $dest -Recurse -File).Count
  $size = (Get-ChildItem -LiteralPath $dest -Recurse -File | Measure-Object Length -Sum).Sum
  Write-Output ("SITE={0} DOMAIN={1} FILES={2} BYTES={3} SEO={4}" -f $site.id, $site.domain, $files, $size, $site.domain)
}
Write-Output ("STAGING=" + $outRoot)

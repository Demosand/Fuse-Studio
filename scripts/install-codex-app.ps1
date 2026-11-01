# Fuse Studio: register a personal Codex desktop marketplace, no Codex CLI or Git required.
# This script does NOT execute remote code or download the plugin.
# Codex downloads Fuse Studio when you select Install in its Plugins directory.
$ErrorActionPreference = "Stop"

try {
  $homeDir = [Environment]::GetFolderPath("UserProfile")
  $dir = Join-Path $homeDir ".agents\plugins"
  $file = Join-Path $dir "marketplace.json"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  $entry = @{
    name = "fuse-studio"
    source = @{
      source = "url"
      url = "https://github.com/Demosand/Fuse-Studio.git"
      ref = "main"
    }
    policy = @{
      installation = "AVAILABLE"
      authentication = "ON_INSTALL"
    }
    category = "Productivity"
  }

  if (Test-Path -LiteralPath $file) {
    $raw = Get-Content -LiteralPath $file -Raw -Encoding UTF8
    $config = $raw | ConvertFrom-Json
    if ($null -eq $config -or $null -eq $config.PSObject.Properties["name"]) {
      throw "Existing marketplace JSON is missing 'name'; not overwriting it."
    }
    if ($null -eq $config.PSObject.Properties["plugins"]) {
      $config | Add-Member -NotePropertyName "plugins" -NotePropertyValue @()
    }
    if ($null -eq $config.PSObject.Properties["interface"]) {
      $config | Add-Member -NotePropertyName "interface" -NotePropertyValue @{ displayName = "Personal Plugins" }
    }
    $others = @($config.plugins | Where-Object { $null -ne $_ -and $_.name -ne "fuse-studio" })
    $config.plugins = @($others) + @($entry)
    $backup = "$file.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Copy-Item -LiteralPath $file -Destination $backup
    Write-Host "Existing marketplace backed up to: $backup"
  }
  else {
    $config = @{
      name = "personal"
      interface = @{ displayName = "Personal Plugins" }
      plugins = @($entry)
    }
  }

  $json = ConvertTo-Json -InputObject $config -Depth 30
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($file, $json + [Environment]::NewLine, $utf8)
  Write-Host ""
  Write-Host "Fuse Studio marketplace registered for Codex desktop."
  Write-Host "Config: $file"
  Write-Host "Next: restart Codex, open Plugins Directory, choose Personal Plugins, and click Install on Fuse Studio."
  Write-Host "No Codex CLI or Git required."
}
catch {
  Write-Error "Fuse Studio setup failed: $($_.Exception.Message)"
  exit 1
}

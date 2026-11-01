@echo off
setlocal
echo Fuse Studio - Codex Desktop Installer (no Codex CLI needed)
echo It only updates your personal Codex marketplace JSON.
echo Source: https://github.com/Demosand/Fuse-Studio
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-codex-app.ps1"
if errorlevel 1 (
  echo.
  echo Installation setup failed. See the message above.
  pause
  exit /b 1
)
echo.
echo Restart Codex and install Fuse Studio via the Plugins Directory.
pause

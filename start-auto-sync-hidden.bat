@echo off
cd /d "%~dp0"
echo Dang khoi dong Git Auto-Sync o che do chay ngam (Hidden Background)...
powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command "Start-Process powershell.exe -ArgumentList '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File \"\"%~dp0auto-sync.ps1\"\"' -WindowStyle Hidden"
echo [OK] Auto-Sync dang chay ngam trong he thong!
timeout /t 3 >nul

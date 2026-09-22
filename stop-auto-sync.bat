@echo off
title Dung Git Auto-Sync
echo Dang dung cac tien trinh Git Auto-Sync...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*auto-sync.ps1*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Host ('Da dung tien trinh PID: ' + $_.ProcessId) -ForegroundColor Green }"
echo [OK] Hoan tat!
pause

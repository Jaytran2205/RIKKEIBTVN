@echo off
title Git Auto-Sync Watcher
echo Dang khoi dong Git Auto-Sync...
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-sync.ps1" -IntervalSeconds 300
pause

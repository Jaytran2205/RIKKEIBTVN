@echo off
title Ninh Binh Digital - Localhost Web Server
color 0A
cd /d "%~dp0"

echo ========================================================
echo   KHOI DONG LOCALHOST WEB SERVER
echo ========================================================
echo.

:: 1. Giai phong port 5000 neu co tien trinh cu bi ket
echo [1/2] Kiem tra port 5000...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":5000" ^| findstr "LISTENING"') do (
    echo       - Tat tien trinh cu dang giu port 5000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

ping 127.0.0.1 -n 2 >nul

:: 2. Chay server bang Python
echo [2/2] Dang khoi dong server...
echo.

where python >nul 2>&1
if %errorlevel% equ 0 (
    python server.py
    goto finish
)

where py >nul 2>&1
if %errorlevel% equ 0 (
    py server.py
    goto finish
)

where python3 >nul 2>&1
if %errorlevel% equ 0 (
    python3 server.py
    goto finish
)

echo [Thong bao] May tinh chua cai Python. Dang chuyen sang PowerShell Web Server...
powershell -ExecutionPolicy Bypass -Command "Write-Host 'Server dang chay tai http://localhost:5000' -ForegroundColor Green; Start-Process 'http://localhost:5000'; Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd ''%~dp0''; python -m http.server 5000'"

:finish
pause

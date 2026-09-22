@echo off
title BrowserSkill Daemon (Tencent)
color 0B
echo ========================================================
echo   KHOI DONG BROWSER-SKILL DAEMON (TENCENT)
echo   Endpoint WebSocket: ws://127.0.0.1:52800
echo ========================================================
echo.
echo Daemon se lang nghe ket noi tu Extension Chrome/Edge.
echo Giu nguyen cua so nay khi can AI dieu khien trinh duyet!
echo.
"%USERPROFILE%\.local\bin\bsk.exe" daemon start --foreground
pause

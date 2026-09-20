@echo off
title Localhost - Tranh Dong Loc Nam
color 0E
cd /d "%~dp0"
echo ========================================================
echo   KHOI CHAY LOCALHOST - TRANH DONG LOC NAM
echo   Dia chi: http://localhost:5000/index.html#vanban
echo ========================================================
echo.
python server.py
pause

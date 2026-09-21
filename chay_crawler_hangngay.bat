@echo off
title Ninh Binh Digital - Daily Crawler & Data Sync
color 0B
cd /d "%~dp0"
echo =========================================================================
echo   NINH BINH DIGITAL - CRAWLER DU LIEU DU LICH & AM THUC HANG NGAY
echo =========================================================================
echo.
python crawler_ninhbinh_daily.py --sync
echo.
echo =========================================================================
echo   HOAN TAT DONG BO DU LIEU VAO DATABASE JSON VA GIAO DIEN WEB!
echo =========================================================================
pause

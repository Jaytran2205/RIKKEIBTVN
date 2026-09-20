@echo off
chcp 65001 >nul
echo ========================================================
echo   ĐANG TIẾN HÀNH XÓA TOÀN BỘ FILE LIÊN QUAN ĐẾN VBEE
echo ========================================================

del /f /q "build_vbee_full_js.py" 2>nul
del /f /q "call_real_vbee.py" 2>nul
del /f /q "check_vbee_studio.py" 2>nul
del /f /q "clean_vbee_branding.py" 2>nul
del /f /q "extract_all_vbee_voices.py" 2>nul
del /f /q "fetch_vbee_voices.py" 2>nul
del /f /q "test_vbee.py" 2>nul
del /f /q "test_vbee_2.py" 2>nul
del /f /q "test_vbee_3.py" 2>nul
del /f /q "test_vbee_4.py" 2>nul
del /f /q "test_vbee_result.py" 2>nul
del /f /q "test_voice_codes.py" 2>nul
del /f /q "test_proxy_local.py" 2>nul
del /f /q "vbee_proxy_server.py" 2>nul
del /f /q "vbee-all-voices.js" 2>nul
del /f /q "vbee_categorized_voices.json" 2>nul
del /f /q "vbee_full_voices.json" 2>nul

rmdir /s /q "tts-integration" 2>nul

echo.
echo [HOÀN TẤT] Đã xóa triệt để toàn bộ 17 file và thư mục tts-integration!
echo ========================================================
(goto) 2>nul & del "%~f0"

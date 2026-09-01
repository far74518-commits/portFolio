@echo off
title Farman Ali Portfolio Local Server
echo ==========================================
echo Starting Farman Ali Portfolio Web Server...
echo ==========================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
if %errorlevel% neq 0 (
    echo Starting in default browser directly...
    start "" "%~dp0index.html"
)
pause

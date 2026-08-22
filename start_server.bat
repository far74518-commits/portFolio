@echo off
echo Starting local web server...
echo Please do not close this window while you are viewing your website.
echo.
start http://localhost:8000
python -m http.server 8000
pause

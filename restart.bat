@echo off
echo Stopping all Node.js processes...
taskkill /F /IM node.exe
timeout /t 2
echo.
echo Starting backend server...
cd backend
start cmd /k "npm run dev"
echo.
echo Backend started! Wait 3 seconds then start frontend...
timeout /t 3
cd ..
echo Starting frontend...
start cmd /k "npm run dev"
echo.
echo Both servers started in new windows!

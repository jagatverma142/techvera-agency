@echo off
setlocal

REM Ensure script runs from backend folder (where this .bat exists)
cd /d "%~dp0"

REM Create folders
mkdir src 2>nul
mkdir src\config 2>nul
mkdir src\models 2>nul
mkdir src\routes 2>nul
mkdir src\middleware 2>nul

REM Create files (if not exists)
for %%F in (
  "src\server.js"
  "src\config\db.js"
  "src\middleware\auth.js"
  "src\models\Lead.js"
  "src\models\Service.js"
  "src\routes\auth.routes.js"
  "src\routes\leads.routes.js"
  "src\routes\services.routes.js"
  ".env"
) do (
  if not exist %%F type nul > %%F
)

echo.
echo Done: folders and files created successfully.
echo Location: %CD%
echo.

endlocal
pause

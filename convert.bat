@echo off
echo.
echo  Blog Converter: Markdown to HTML
echo  ---------------------------------

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo  Installing dependencies...
    call npm install
    echo.
)

:: Run the conversion script
node convert-blogs.js

pause

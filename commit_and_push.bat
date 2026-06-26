@echo off
echo ==============================================
echo Updating GitHub Pages (steve_yu)...
echo ==============================================

cd /d "d:\OneDrive - 振添股份有限公司\ML_DATA\steve_yu"

:: 若有 .env，載入其中的環境變數
if exist ".env" (
	for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
		set "%%A=%%B"
	)
)

echo [0/3] Setting remote URL...
git remote set-url origin https://%GIT_TOKEN%@github.com/Vincent626/concrete-strength-analysis.git

echo [1/3] Adding files...
git add .

echo [2/3] Committing changes...
git commit -m "Update model & dataset"

echo [3/3] Pushing to remote...
git push origin main

echo ==============================================
echo ✅ Update complete!
echo Please allow 1-2 minutes for GitHub Pages to build.
echo ==============================================
pause

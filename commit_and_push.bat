@echo off
echo ==============================================
echo Updating GitHub Pages (steve_yu)...
echo ==============================================

cd /d "d:\OneDrive - 振添股份有限公司\ML_DATA\steve_yu"

echo [0/3] Setting remote URL...
git remote set-url origin https://Vincent626@github.com/Vincent626/concrete-strength-analysis.git

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

@echo off
echo ==============================================
echo Updating GitHub Pages (steve_yu)...
echo ==============================================

cd /d "d:\OneDrive - 振添股份有限公司\ML_DATA\steve_yu"

echo [1/3] Adding files...
git add .

echo [2/3] Committing changes...
git commit -m "Update v8: Integrated mixer current features for M60 model improvement (R2=0.19)"

echo [3/3] Pushing to remote...
git push origin main

echo ==============================================
echo ✅ Update complete!
echo Please allow 1-2 minutes for GitHub Pages to build.
echo ==============================================
pause

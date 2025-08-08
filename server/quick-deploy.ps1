# Quick deployment script for Oracle Cloud
# Run this from PowerShell in the server directory

param(
    [string]$ServerIP = "144.24.131.152",
    [string]$User = "ubuntu"
)

Write-Host "🚀 Starting deployment to Oracle Cloud..." -ForegroundColor Green

# Upload server folder
Write-Host "📂 Uploading server files..." -ForegroundColor Yellow
scp -r . "$User@$ServerIP`:~/linkmanager-server-new"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
    
    Write-Host "🔄 Now SSH into your server and run:" -ForegroundColor Cyan
    Write-Host "ssh $User@$ServerIP" -ForegroundColor White
    Write-Host "cd ~/linkmanager-server-new" -ForegroundColor White
    Write-Host "npm install --no-scripts" -ForegroundColor White
    Write-Host "npx prisma generate" -ForegroundColor White
    Write-Host "npm run build" -ForegroundColor White
    Write-Host "pm2 restart linkmanager-api" -ForegroundColor White
} else {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
}

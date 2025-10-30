# MERN Blog - Create Categories Script
# Run this AFTER you've registered in the browser

Write-Host "🔐 Step 1: Logging in..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"mofogofoluwa744@gmail.com","password":"Fogofoluwa744"}'
    $token = $response.token
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "Token: $token`n" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Login failed! Please register in the browser first at http://localhost:5173" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit
}

Write-Host "📂 Step 2: Creating categories..." -ForegroundColor Cyan

# Create Technology category
try {
    $tech = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Technology","description":"Tech related posts"}'
    Write-Host "✅ Created: Technology" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Technology category might already exist" -ForegroundColor Yellow
}

# Create Lifestyle category
try {
    $lifestyle = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Lifestyle","description":"Lifestyle and wellness"}'
    Write-Host "✅ Created: Lifestyle" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Lifestyle category might already exist" -ForegroundColor Yellow
}

# Create Travel category
try {
    $travel = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Travel","description":"Travel adventures"}'
    Write-Host "✅ Created: Travel" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Travel category might already exist" -ForegroundColor Yellow
}

# Create Food category
try {
    $food = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Food","description":"Recipes and food reviews"}'
    Write-Host "✅ Created: Food" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Food category might already exist" -ForegroundColor Yellow
}

Write-Host "`n📋 Step 3: Listing all categories..." -ForegroundColor Cyan
$categories = Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method GET
Write-Host "✅ Total categories: $($categories.data.Length)" -ForegroundColor Green
$categories.data | ForEach-Object {
    Write-Host "   - $($_.name): $($_.description)" -ForegroundColor White
}

Write-Host "`n🎉 Categories setup complete! Now you can create posts in the browser." -ForegroundColor Green
Write-Host "👉 Go to http://localhost:5173 and click 'Create Post'" -ForegroundColor Cyan

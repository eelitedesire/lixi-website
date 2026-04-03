#!/bin/bash

COMMIT_MSG="${1:-Update website}"

echo "🚀 Deploying Lixi Battery Website..."
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "$COMMIT_MSG"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Git push failed!"
    exit 1
fi

echo ""
echo "🔄 Deploying to server..."

# Deploy on server
ssh root@192.168.160.98 << 'EOF'
set -e
cd /var/www/lixi-website
echo "📥 Pulling latest code..."
git pull origin main
echo "📦 Installing frontend dependencies..."
npm install
echo "🔨 Building frontend..."
npm run build
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "♻️  Restarting PM2 processes..."
pm2 restart lixi-frontend
pm2 restart lixi-backend
echo ""
echo "📊 Process status:"
pm2 list | grep lixi
echo ""
echo "📝 Recent logs (Frontend):"
pm2 logs lixi-frontend --lines 10 --nostream
echo ""
echo "📝 Recent logs (Backend):"
pm2 logs lixi-backend --lines 10 --nostream
EOF

echo ""
echo "✅ Deployment complete!"
echo "🌐 Visit: https://lixibattery.com"

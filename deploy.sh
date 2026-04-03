#!/bin/bash

SERVER_IP="192.168.160.98"
DOMAIN="lixibattery.com"
PROJECT_DIR="/var/www/lixi-website"
FRONTEND_PORT=3002
BACKEND_PORT=3003

echo "🚀 Deploying Lixi Battery Website..."

# Copy Nginx config
echo "📝 Copying Nginx configuration..."
scp nginx-ssl.conf root@$SERVER_IP:/etc/nginx/sites-available/lixi

# SSH and setup
ssh root@$SERVER_IP << 'ENDSSH'
# Enable site
ln -sf /etc/nginx/sites-available/lixi /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t && systemctl reload nginx

# Create project directory
mkdir -p /var/www/lixi-website
cd /var/www/lixi-website

# Clone or pull repository
if [ -d ".git" ]; then
    git pull
else
    git clone YOUR_GITHUB_REPO_URL .
fi

# Install frontend dependencies
npm install

# Build frontend
npm run build

# Install backend dependencies
cd backend
npm install

# Setup PM2 processes
pm2 delete lixi-frontend 2>/dev/null || true
pm2 delete lixi-backend 2>/dev/null || true

# Start frontend (serve build)
pm2 start npm --name "lixi-frontend" -- run preview -- --port 3002 --host

# Start backend
pm2 start server.js --name "lixi-backend" -- --port 3003

pm2 save
pm2 startup

echo "✅ Lixi website deployed successfully!"
ENDSSH

echo "✅ Deployment complete!"
echo "⚠️  Don't forget to:"
echo "   1. Update YOUR_GITHUB_REPO_URL in this script"
echo "   2. Generate SSL certificates: certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN"
echo "   3. Configure DNS A records to point to $SERVER_IP"

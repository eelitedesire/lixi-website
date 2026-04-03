#!/bin/bash

# Configuration
GITHUB_REPO="eelitedesire/lixi-website"
SERVER_IP="192.168.160.98"
DOMAIN="lixibattery.com"

echo "🚀 Deploying Lixi Battery from GitHub..."

# Upload Nginx config
scp nginx-ssl.conf root@$SERVER_IP:/etc/nginx/sites-available/lixi

# Deploy on server
ssh root@$SERVER_IP << ENDSSH
set -e

# Setup Nginx
ln -sf /etc/nginx/sites-available/lixi /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Clone/Update repository
if [ ! -d "/var/www/lixi-website" ]; then
    cd /var/www
    git clone https://github.com/$GITHUB_REPO.git lixi-website
fi

cd /var/www/lixi-website
git pull origin main

# Build frontend
npm install
npm run build

# Backend
cd backend
npm install
cd ..

# PM2
pm2 delete lixi-frontend 2>/dev/null || true
pm2 delete lixi-backend 2>/dev/null || true

pm2 start npm --name "lixi-frontend" -- run preview -- --port 3002 --host
pm2 start backend/server.js --name "lixi-backend"
pm2 save

echo "✅ Deployed successfully!"
ENDSSH

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Update GITHUB_REPO in this script"
echo "2. Generate SSL: ssh root@$SERVER_IP 'certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN'"
echo "3. Point DNS A records to $SERVER_IP"

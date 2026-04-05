#!/bin/bash

# Start LIXI Website (Frontend + Backend)

echo "🚀 Starting LIXI Backend Server..."
cd backend
npm start > /tmp/lixi-backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID) on http://localhost:3003"

cd ..
echo ""
echo "🚀 Starting LIXI Frontend..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT

# Admin Panel Database Integration - Deployment Guide

## Overview
The admin panel now uses AWS DynamoDB for permanent data storage via Lambda functions.

## Backend Deployment

### 1. Deploy Backend Infrastructure
```bash
cd backend
sam build
sam deploy --guided
```

Configuration:
- Stack name: `lixi-backend`
- Region: `eu-central-1`
- Confirm changes: Y
- Allow SAM CLI IAM role creation: Y

### 2. Note API Gateway URL
After deployment, copy the API URL from outputs:
```
https://xxxxx.execute-api.eu-central-1.amazonaws.com/prod
```

### 3. Update Frontend Environment
Create/update `.env` file:
```env
VITE_API_URL=https://xxxxx.execute-api.eu-central-1.amazonaws.com/prod
```

## Database Tables Created
- `lixi-blog` - Blog posts
- `lixi-products` - Products
- `lixi-quotes` - Quote requests
- `lixi-services` - Service centers
- `lixi-projects` - Projects
- `lixi-users` - Users
- `lixi-shopping` - Shopping items
- `lixi-solutions` - Solutions
- `lixi-about` - About sections

## API Endpoints
All admin operations use: `/api/admin/{resource}/{action}`

### Actions:
- `list` - Get all items (GET)
- `create` - Create new item (POST)
- `update` - Update existing item (POST)
- `delete` - Delete item (POST)

### Example:
```
POST /api/admin/blog/create
POST /api/admin/products/update
POST /api/admin/quotes/delete
GET /api/admin/blog/list
```

## Frontend Integration
Components updated with database integration:
- ✅ BlogManager
- ✅ ProductManager
- ⏳ QuoteManager (add similar pattern)
- ⏳ ServiceManager (add similar pattern)
- ⏳ ProjectManager (add similar pattern)

## Testing Locally

### 1. Start Local API
```bash
cd backend
sam local start-api
```

### 2. Update .env for local testing
```env
VITE_API_URL=http://localhost:3000
```

### 3. Start Frontend
```bash
npm run dev
```

## Migration from Static Data
Initial load falls back to static data from `src/data/` if database is empty.
First save will persist to database.

## Security Notes
- Add authentication middleware to Lambda function
- Implement API key or JWT validation
- Add rate limiting
- Enable CloudWatch logging for monitoring

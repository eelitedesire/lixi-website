# LIXI Energy Systems - Deployment Guide

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## Production Deployment

### Step 1: Frontend Deployment (AWS Amplify)

1. **Push code to Git repository**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to AWS Amplify**
- Go to AWS Amplify Console
- Click "New app" → "Host web app"
- Connect your Git repository
- Amplify will auto-detect Vite configuration

3. **Configure environment variables in Amplify**
```
VITE_API_URL=<will-be-set-after-backend-deployment>
VITE_AWS_REGION=eu-central-1
VITE_PINPOINT_APP_ID=<optional>
```

4. **Deploy**
- Amplify will automatically build and deploy
- Note the Amplify URL (e.g., https://main.xxxxx.amplifyapp.com)

### Step 2: Backend Deployment (AWS SAM)

1. **Install AWS SAM CLI**
```bash
# macOS
brew install aws-sam-cli

# Verify installation
sam --version
```

2. **Configure AWS credentials**
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: eu-central-1
# Default output format: json
```

3. **Verify SES email**
```bash
aws ses verify-email-identity --email-address info@lixi.de --region eu-central-1
```
Check your email and click the verification link.

4. **Deploy backend**
```bash
cd backend

# Install dependencies for each function
cd functions/quote && npm install && cd ../..
cd functions/contact && npm install && cd ../..
cd functions/newsletter && npm install && cd ../..

# Build SAM application
sam build

# Deploy (first time - guided)
sam deploy --guided

# Follow prompts:
# Stack Name: lixi-backend
# AWS Region: eu-central-1
# Confirm changes before deploy: Y
# Allow SAM CLI IAM role creation: Y
# Disable rollback: N
# Save arguments to configuration file: Y
# SAM configuration file: samconfig.toml
# SAM configuration environment: default
```

5. **Note the API Gateway URL from outputs**
```
Outputs:
ApiUrl: https://xxxxxxxxxx.execute-api.eu-central-1.amazonaws.com/prod
```

6. **Update frontend environment variable**
- Go back to Amplify Console
- Update `VITE_API_URL` with the API Gateway URL
- Redeploy frontend

### Step 3: SES Production Access (Optional)

By default, SES is in sandbox mode (can only send to verified emails).

To send to any email:
1. Go to AWS SES Console
2. Click "Account dashboard"
3. Click "Request production access"
4. Fill out the form explaining your use case
5. Wait for approval (usually 24 hours)

### Step 4: Custom Domain (Optional)

**Frontend (Amplify):**
1. Go to Amplify Console → Domain management
2. Add custom domain (e.g., lixi.de)
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

**Backend (API Gateway):**
1. Go to API Gateway Console
2. Custom domain names → Create
3. Enter domain (e.g., api.lixi.de)
4. Request ACM certificate
5. Configure DNS CNAME record
6. Map to API stage

## Monitoring & Maintenance

### CloudWatch Logs
```bash
# View Lambda logs
aws logs tail /aws/lambda/lixi-backend-QuoteFunction --follow

# View API Gateway logs
aws logs tail API-Gateway-Execution-Logs_<api-id>/prod --follow
```

### DynamoDB Tables
```bash
# List items in leads table
aws dynamodb scan --table-name lixi-leads --region eu-central-1

# Query recent leads
aws dynamodb query \
  --table-name lixi-leads \
  --index-name createdAt-index \
  --key-condition-expression "createdAt > :timestamp" \
  --expression-attribute-values '{":timestamp":{"N":"1704067200000"}}'
```

### Update Backend
```bash
cd backend
sam build
sam deploy  # Uses saved config from samconfig.toml
```

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Amplify auto-deploys
```

## Troubleshooting

### Frontend not loading
- Check Amplify build logs
- Verify environment variables are set
- Check browser console for errors

### API calls failing
- Verify API Gateway URL is correct in frontend
- Check CORS configuration in SAM template
- View Lambda CloudWatch logs for errors
- Verify SES email is verified

### Emails not sending
- Check SES is out of sandbox mode
- Verify sender email is verified
- Check Lambda CloudWatch logs
- Verify IAM permissions for Lambda to use SES

### DynamoDB errors
- Check table names match environment variables
- Verify Lambda has DynamoDB permissions
- Check CloudWatch logs for specific errors

## Cost Estimation

**Monthly costs for moderate traffic (1000 visitors/month):**

- **Amplify Hosting**: ~$0.15 (build minutes) + $0.15 (storage) = $0.30
- **API Gateway**: ~$3.50 (1M requests free tier)
- **Lambda**: Free tier (1M requests/month)
- **DynamoDB**: Free tier (25GB storage, 25 RCU/WCU)
- **SES**: $0.10 per 1000 emails
- **CloudWatch**: ~$0.50 (logs)

**Total: ~$5-10/month** (within free tier for first year)

## Security Checklist

- [x] HTTPS enforced via CloudFront/Amplify
- [x] CORS properly configured
- [x] Input validation with Zod
- [x] Rate limiting via DynamoDB TTL
- [x] Environment variables for secrets
- [x] IAM least privilege permissions
- [x] DynamoDB encryption at rest (default)
- [x] API Gateway throttling enabled

## Backup & Recovery

### Database Backup
```bash
# Enable point-in-time recovery
aws dynamodb update-continuous-backups \
  --table-name lixi-leads \
  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true
```

### Code Backup
- Git repository serves as code backup
- Enable branch protection on main branch
- Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`

## Support

For deployment issues:
- Email: info@helioaegis.com
- Check AWS documentation: https://docs.aws.amazon.com/
- SAM documentation: https://docs.aws.amazon.com/serverless-application-model/

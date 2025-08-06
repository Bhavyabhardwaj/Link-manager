# 🚀 Production Deployment Checklist

## Before Deployment

### 1. Code Preparation
- [ ] All environment variables configured in `.env.production`
- [ ] CORS origins updated for production domains
- [ ] OAuth callback URLs updated
- [ ] Database migrations tested
- [ ] Build process working (`npm run build`)
- [ ] All dependencies installed

### 2. Oracle Cloud Setup
- [ ] Ubuntu instance created and running
- [ ] Security list configured (ports 22, 80, 443, 3000)
- [ ] SSH key pair configured
- [ ] Instance IP noted down
- [ ] Domain DNS pointed to instance IP

### 3. Database Setup
- [ ] PostgreSQL database created
- [ ] Database URL obtained
- [ ] Database accessible from Oracle Cloud instance
- [ ] Database credentials secured

## During Deployment

### 1. Server Setup
- [ ] Connected to Oracle Cloud instance via SSH
- [ ] Deployment script uploaded and made executable
- [ ] Deployment script executed successfully
- [ ] Node.js, PM2, Nginx installed

### 2. Application Setup
- [ ] Code cloned/uploaded to server
- [ ] Environment file configured with production values
- [ ] Dependencies installed (`npm ci --only=production`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Application built (`npm run build`)
- [ ] Database migrations executed (`npx prisma migrate deploy`)

### 3. Process Management
- [ ] PM2 ecosystem file configured
- [ ] Application started with PM2
- [ ] PM2 startup script configured
- [ ] Application logs showing no errors

### 4. Web Server Setup
- [ ] Nginx installed and running
- [ ] Nginx configuration file created
- [ ] Site enabled in Nginx
- [ ] Nginx configuration tested (`sudo nginx -t`)
- [ ] Nginx reloaded

### 5. Security Configuration
- [ ] UFW firewall configured and enabled
- [ ] Security headers configured in Nginx
- [ ] SSL certificate installed (if using domain)
- [ ] HTTPS redirect configured

## After Deployment

### 1. Functionality Testing
- [ ] API health check endpoint responding (`/`)
- [ ] API documentation accessible (`/api-docs`)
- [ ] Authentication endpoints working
- [ ] Link creation/management working
- [ ] OAuth providers working (GitHub/Google)
- [ ] Database operations working

### 2. Performance Testing
- [ ] Application responding within reasonable time
- [ ] Memory usage acceptable
- [ ] CPU usage acceptable
- [ ] No memory leaks detected

### 3. Monitoring Setup
- [ ] PM2 monitoring dashboard accessible
- [ ] Log rotation configured
- [ ] Backup script configured
- [ ] Cron jobs for backups scheduled

### 4. Security Verification
- [ ] SSL certificate valid and working
- [ ] Security headers present in responses
- [ ] CORS working correctly
- [ ] Rate limiting working
- [ ] No sensitive data exposed in logs

## Environment Variables to Update

```bash
# Required for production
NODE_ENV=production
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secure-secret"
BASE_URL="https://your-domain.com"
FRONTEND_URL="https://your-frontend-domain.com"

# OAuth providers
GITHUB_CLIENT_ID="your-github-id"
GITHUB_CLIENT_SECRET="your-github-secret"
GITHUB_CALLBACK_URL="https://your-domain.com/api/auth/github/callback"

GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
GOOGLE_CALLBACK_URL="https://your-domain.com/api/auth/google/callback"

# Email configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@your-domain.com"
```

## Quick Deployment Commands

```bash
# 1. Upload and run deployment script
chmod +x deploy.sh
./deploy.sh

# 2. Configure environment
nano .env

# 3. Run database migrations
npx prisma migrate deploy

# 4. Start application
pm2 start ecosystem.config.js

# 5. Setup SSL (optional)
chmod +x setup-ssl.sh
./setup-ssl.sh
```

## Verification Commands

```bash
# Check application status
pm2 status
pm2 logs linkmanager-api

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check database connection
npx prisma db pull

# Test API endpoint
curl https://your-domain.com/
curl https://your-domain.com/api-docs
```

## Rollback Plan

If deployment fails:

```bash
# Stop PM2 application
pm2 stop linkmanager-api

# Restore previous version (if applicable)
git checkout previous-working-commit
npm run build
pm2 restart linkmanager-api

# Or start in development mode for debugging
npm run dev
```

## Post-Deployment Tasks

- [ ] Update frontend API URL to production domain
- [ ] Update OAuth applications with production URLs
- [ ] Test all functionality end-to-end
- [ ] Monitor logs for first 24 hours
- [ ] Set up monitoring alerts
- [ ] Document any custom configurations
- [ ] Share production URLs with team

## Support Information

- **Server logs:** `pm2 logs linkmanager-api`
- **Nginx logs:** `/var/log/nginx/error.log`
- **Application directory:** `/home/ubuntu/linkmanager`
- **Nginx config:** `/etc/nginx/sites-available/linkmanager`
- **PM2 config:** `/home/ubuntu/linkmanager/ecosystem.config.js`

---

📞 **Need Help?** Check the `DEPLOYMENT.md` file for detailed instructions and troubleshooting.

# 🚀 Production Deployment Guide for Oracle Cloud

This guide will help you deploy your Link Manager backend to Oracle Cloud Ubuntu instance.

## 📋 Prerequisites

1. Oracle Cloud Ubuntu instance (20.04 LTS or later)
2. Domain name pointed to your Oracle Cloud instance IP
3. SSH access to your instance
4. Database setup (PostgreSQL recommended)

## 🔧 Oracle Cloud Setup

### 1. Security List Configuration
In Oracle Cloud Console, configure your instance's security list:

**Ingress Rules:**
- SSH: Port 22 (Source: Your IP)
- HTTP: Port 80 (Source: 0.0.0.0/0)
- HTTPS: Port 443 (Source: 0.0.0.0/0)
- Custom: Port 3000 (Source: 0.0.0.0/0) - for testing

### 2. Instance Configuration
```bash
# Connect to your instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

## 🚀 Deployment Steps

### Step 1: Upload Files
Upload your server code to the instance:
```bash
# Option 1: Using Git (recommended)
git clone https://github.com/your-username/your-repo.git
cd your-repo/server

# Option 2: Using SCP
scp -i your-key.pem -r ./server ubuntu@your-instance-ip:~/linkmanager
```

### Step 2: Run Deployment Script
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

### Step 3: Configure Environment
```bash
# Edit environment file
nano .env

# Update these values:
NODE_ENV=production
DATABASE_URL="your-actual-database-url"
BASE_URL="https://your-domain.com"
FRONTEND_URL="https://your-frontend-domain.com"
JWT_SECRET="your-super-secure-jwt-secret"
COOKIE_KEY_1="your-production-cookie-key-1"
COOKIE_KEY_2="your-production-cookie-key-2"
```

### Step 4: Database Setup
```bash
# Run database migrations
npx prisma migrate deploy

# Optional: Seed database
npx prisma db seed
```

### Step 5: Setup SSL (Optional but Recommended)
```bash
# Make SSL script executable
chmod +x setup-ssl.sh

# Run SSL setup
./setup-ssl.sh
```

## 📊 Monitoring & Management

### PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs linkmanager-api

# Restart application
pm2 restart linkmanager-api

# Stop application
pm2 stop linkmanager-api

# Monitor resources
pm2 monit
```

### Nginx Commands
```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Test configuration
sudo nginx -t

# View access logs
sudo tail -f /var/log/nginx/access.log

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### System Monitoring
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check running processes
htop

# Check network connections
netstat -tulpn
```

## 🔒 Security Considerations

### 1. Firewall Configuration
```bash
# Check UFW status
sudo ufw status

# Allow specific ports only
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2. Regular Updates
```bash
# Update system packages weekly
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies monthly
npm audit fix
```

### 3. SSL Certificate Auto-Renewal
```bash
# Test renewal process
sudo certbot renew --dry-run

# Manual renewal if needed
sudo certbot renew
```

## 📁 File Structure on Server
```
/home/ubuntu/linkmanager/
├── dist/                 # Compiled JavaScript
├── logs/                 # Application logs
├── node_modules/         # Dependencies
├── prisma/              # Database schema
├── .env                 # Environment variables
├── ecosystem.config.js  # PM2 configuration
├── backup.sh           # Backup script
└── package.json        # Project configuration
```

## 🔄 Deployment Updates

### Quick Update Process
```bash
# Navigate to project directory
cd /home/ubuntu/linkmanager

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm ci --only=production

# Run database migrations (if any)
npx prisma migrate deploy

# Rebuild application
npm run build

# Restart application
pm2 restart linkmanager-api
```

## 📈 Performance Optimization

### 1. PM2 Configuration
The ecosystem.config.js includes:
- Cluster mode for multiple CPU cores
- Auto-restart on crashes
- Memory limit monitoring
- Log rotation

### 2. Nginx Optimization
The Nginx config includes:
- Gzip compression
- Rate limiting
- Caching headers
- Security headers

## 🆘 Troubleshooting

### Common Issues

#### 1. Application Not Starting
```bash
# Check PM2 logs
pm2 logs linkmanager-api

# Check if port is in use
sudo netstat -tulpn | grep :3000

# Check environment variables
pm2 env 0
```

#### 2. Database Connection Issues
```bash
# Test database connection
npx prisma db pull

# Check database URL
echo $DATABASE_URL
```

#### 3. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal
```

#### 4. High Memory Usage
```bash
# Check memory usage
free -h

# Restart application
pm2 restart linkmanager-api

# Adjust PM2 memory limit in ecosystem.config.js
```

## 📞 Support Commands

### System Information
```bash
# Get system info
uname -a
cat /etc/os-release

# Check Node.js version
node --version
npm --version

# Check PM2 version
pm2 --version

# Check Nginx version
nginx -v
```

### Backup & Restore
```bash
# Manual backup
./backup.sh

# List backups
ls -la ~/backups/

# Restore database (example)
psql $DATABASE_URL < ~/backups/db_backup_YYYYMMDD_HHMMSS.sql
```

## 🌐 OAuth Configuration

After deployment, update your OAuth application settings:

### GitHub OAuth App
- Homepage URL: `https://your-domain.com`
- Callback URL: `https://your-domain.com/api/auth/github/callback`

### Google OAuth App
- Authorized JavaScript origins: `https://your-domain.com`
- Authorized redirect URIs: `https://your-domain.com/api/auth/google/callback`

## ✅ Final Checklist

- [ ] Oracle Cloud security list configured
- [ ] Domain DNS pointed to instance IP
- [ ] SSL certificate installed and working
- [ ] Environment variables set correctly
- [ ] Database migrations completed
- [ ] OAuth applications configured
- [ ] Application logs showing no errors
- [ ] Health check endpoint responding
- [ ] Backups scheduled and working
- [ ] Monitoring alerts configured

Your Link Manager API should now be live at `https://your-domain.com`! 🎉

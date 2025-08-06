#!/bin/bash

# Production deployment script for Oracle Cloud Ubuntu instance
# Make this file executable: chmod +x deploy.sh

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Don't run this script as root!"
    exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 LTS if not installed
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js 18 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    print_status "Node.js is already installed: $(node --version)"
fi

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2 process manager..."
    sudo npm install -g pm2
else
    print_status "PM2 is already installed: $(pm2 --version)"
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    print_status "Installing Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
else
    print_status "Nginx is already installed"
fi

# Install PostgreSQL client if not installed
if ! command -v psql &> /dev/null; then
    print_status "Installing PostgreSQL client..."
    sudo apt install -y postgresql-client
else
    print_status "PostgreSQL client is already installed"
fi

# Create application directory
APP_DIR="/home/$(whoami)/linkmanager"
print_status "Setting up application directory: $APP_DIR"
mkdir -p $APP_DIR

# Navigate to app directory
cd $APP_DIR

# Clone or pull latest code (update this with your repository)
if [ -d ".git" ]; then
    print_status "Pulling latest changes..."
    git pull origin main
else
    print_status "Cloning repository..."
    # Replace with your actual repository URL
    git clone https://github.com/Bhavyabhardwaj/Link-manager-server.git .
fi

# Copy environment file
if [ ! -f ".env" ]; then
    print_status "Setting up environment file..."
    cp .env.production .env
    print_warning "Please edit .env file with your actual production values!"
    print_warning "Run: nano .env"
    read -p "Press Enter after you've updated the .env file..."
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate

# Build the application
print_status "Building application..."
npm run build

# Run database migrations
print_status "Running database migrations..."
npx prisma migrate deploy

# Set up PM2 ecosystem file
print_status "Setting up PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'linkmanager-api',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Start/restart application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Set up Nginx configuration
print_status "Setting up Nginx reverse proxy..."
sudo tee /etc/nginx/sites-available/linkmanager << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain

    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Handle static files (if any)
    location /static/ {
        alias /home/$(whoami)/linkmanager/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        access_log off;
        proxy_pass http://localhost:3000/;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/linkmanager /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
print_status "Testing Nginx configuration..."
sudo nginx -t
sudo systemctl reload nginx

# Set up UFW firewall
print_status "Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Set up log rotation
print_status "Setting up log rotation..."
sudo tee /etc/logrotate.d/linkmanager << EOF
/home/$(whoami)/linkmanager/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    create 0644 $(whoami) $(whoami)
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Create backup script
print_status "Creating backup script..."
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$(whoami)/backups"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)

# Backup database (adjust connection details)
pg_dump $DATABASE_URL > "$BACKUP_DIR/db_backup_$DATE.sql"

# Backup application files
tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" /home/$(whoami)/linkmanager

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Set up daily backup cron job
print_status "Setting up daily backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$(whoami)/linkmanager/backup.sh") | crontab -

print_status "✅ Deployment completed successfully!"
print_warning "Next steps:"
echo "1. Update your domain in /etc/nginx/sites-available/linkmanager"
echo "2. Set up SSL certificate with Let's Encrypt:"
echo "   sudo apt install certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d your-domain.com"
echo "3. Update your .env file with production values"
echo "4. Update OAuth callback URLs in GitHub/Google console"
echo ""
print_status "Application is running on: http://$(curl -s ifconfig.me)"
print_status "PM2 status: pm2 status"
print_status "Logs: pm2 logs linkmanager-api"
print_status "Nginx status: sudo systemctl status nginx"

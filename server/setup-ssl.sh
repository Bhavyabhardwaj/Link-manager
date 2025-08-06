#!/bin/bash

# SSL Setup Script for Oracle Cloud Ubuntu Instance
# Run this after the main deployment script

set -e

echo "🔒 Setting up SSL with Let's Encrypt..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "Don't run this script as root!"
    exit 1
fi

# Get domain name from user
read -p "Enter your domain name (e.g., api.yourdomain.com): " DOMAIN_NAME

if [ -z "$DOMAIN_NAME" ]; then
    echo "Domain name is required!"
    exit 1
fi

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
    print_status "Installing Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Update Nginx configuration with the actual domain
print_status "Updating Nginx configuration with domain: $DOMAIN_NAME"
sudo sed -i "s/your-domain.com www.your-domain.com/$DOMAIN_NAME/g" /etc/nginx/sites-available/linkmanager

# Test Nginx configuration
print_status "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Obtain SSL certificate
print_status "Obtaining SSL certificate for $DOMAIN_NAME..."
sudo certbot --nginx -d $DOMAIN_NAME --non-interactive --agree-tos --email admin@$DOMAIN_NAME

# Set up auto-renewal
print_status "Setting up automatic SSL renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Test auto-renewal
print_status "Testing SSL auto-renewal..."
sudo certbot renew --dry-run

print_status "✅ SSL setup completed!"
print_status "Your API is now available at: https://$DOMAIN_NAME"
print_warning "Don't forget to update:"
echo "1. CORS origins in your environment file"
echo "2. OAuth callback URLs in GitHub/Google console"
echo "3. Update BASE_URL in .env to https://$DOMAIN_NAME"

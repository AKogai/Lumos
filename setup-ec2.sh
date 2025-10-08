#!/bin/bash

# EC2 Initial Setup Script
set -e

echo "🔧 Setting up EC2 instance..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Docker
echo "🐳 Installing Docker..."
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
echo "📚 Installing Git..."
sudo yum install git -y

# Enable Docker to start on boot
echo "⚙️  Enabling Docker service..."
sudo systemctl enable docker

echo "✅ EC2 setup complete!"
echo "⚠️  IMPORTANT: Log out and log back in for Docker group changes to take effect"
echo "   Run: exit"
echo "   Then reconnect via SSH"

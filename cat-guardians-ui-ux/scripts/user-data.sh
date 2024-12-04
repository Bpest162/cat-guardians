#!/bin/bash
# user data for Amazon Ubuntu EC2 instance

echo '-----------------------------starting user data-----------------------------'

# Update and upgrade the system
sudo apt update
sudo apt upgrade -y
sudo apt install unzip -y

# Docker  installation
# Remove old versions of Docker
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Install required packages
echo '-----------------------------Installing Docker-----------------------------'
sudo curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose installation
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo chmod 777 /var/run/docker.sock

# Install AWS Cli
echo '-----------------------------Installing AWS Cli-----------------------------'
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo '-----------------------------user data completed----------------------------'

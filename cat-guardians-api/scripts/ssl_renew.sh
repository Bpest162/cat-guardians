#!/bin/bash
# Renew SSL certificates with certbot

LOG_FILE="/var/log/cron.log"
APP_DIR="/home/ubuntu/app"

# Log function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Change to application directory
log "Changing directory to $APP_DIR"
cd $APP_DIR || { log "Failed to change directory to $APP_DIR"; exit 1; }

log "Starting SSL renewal script"
# Use --dry-run mode for testing
#output_certbot=$(docker-compose -f docker-compose.prod.yml run certbot renew --dry-run)
output_certbot=$(docker-compose -f docker-compose.prod.yml run certbot renew)
log "$output_certbot"

log "Reloading nginx"
docker-compose exec -T nginx nginx -s reload

log "Pruning docker system"
docker system prune -af

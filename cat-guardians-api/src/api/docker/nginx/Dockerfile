FROM nginx:latest

# Copy the nginx configuration files for dev environment
COPY nginx-conf-dev/nginx.conf.template /etc/nginx/conf.d/dev/nginx.conf.template

# Copy the nginx configuration files for prod environment
COPY nginx-conf-prod/nginx.conf.template /etc/nginx/conf.d/prod/nginx.conf.template

COPY proxy_params /etc/nginx

# Note: the ENVIRON variable must be set to either 'dev' or 'prod' in the docker-compose file
CMD /bin/bash -c "envsubst '\$PROJECT_DIR \$API_HOST \$DOMAIN' < /etc/nginx/conf.d/$ENVIRON/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"

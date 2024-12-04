# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

## Build the application
RUN yarn run build

# Stage 2: Serve the built app with Nginx
FROM nginx:latest AS prod

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx/dev/nginx.conf.template /etc/nginx/conf.d/dev/nginx.conf.template
COPY nginx/prod/nginx.conf.template /etc/nginx/conf.d/prod/nginx.conf.template

COPY nginx/proxy_params /etc/nginx

# Expose port 80
EXPOSE 80

# Note: the ENVIRON variable must be set to either 'dev' or 'prod' in the docker-compose file
CMD /bin/bash -c "envsubst '\$PROJECT_DIR \$API_HOST \$DOMAIN' < /etc/nginx/conf.d/$ENVIRON/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"


# Use an official NGINX image as a parent image
FROM nginx:latest

# Install git and node.js
RUN apt-get update && \
    apt-get install -y git && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Create a directory to hold the app
WORKDIR /usr/share/nginx/html/QikGro

# Clone your Node.js code from git
COPY . .

# Install dependencies and build React app
RUN npm install && npm run build

# Copy the build files to the NGINX document root
RUN cp -r build/* /usr/share/nginx/html/QikGro

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
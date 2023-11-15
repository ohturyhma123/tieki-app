# Use the official Node.js image as the base image
FROM node:iron-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies, omit devDependencies
RUN npm ci --omit-dev --ignore-scripts

# Copy the rest of the application code to the container
COPY . .

# Build app for production
RUN npm run build

# Permissions for OpenShift
RUN chgrp -R 0 /app && chmod -R g+rwX /app

# Expose a port (you can choose the port number)
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "prod"]

# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Change the working directory to the src folder
WORKDIR /app/frontend

# Build your React app inside the src folder
RUN npm run build

# Expose a port (you can choose the port number)
EXPOSE 5173

# Permissions for OpenShift
RUN chgrp -R 0 /app && chmod -R g+rwX /app

# Start the application
CMD ["npm", "run", "dev"]

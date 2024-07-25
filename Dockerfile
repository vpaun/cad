# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application files
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Command to run the application in development mode
CMD ["npm", "run", "dev"]

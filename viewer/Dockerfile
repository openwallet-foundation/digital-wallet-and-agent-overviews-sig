# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build:ssr

# Stage 2: Serve the application using Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/dist /app/dist

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "serve:ssr:viewer"]

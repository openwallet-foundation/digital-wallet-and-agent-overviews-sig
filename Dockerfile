# Stage 1: Build the Angular application
FROM node:slim AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY viewer/package*.json ./viewer/

# Install dependencies
RUN cd viewer && npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN cd viewer && npm run build:ssr

# Stage 2: Serve the application using Node.js
FROM node:slim

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/viewer/dist /app/dist

# Copy package.json and package-lock.json for production dependencies
COPY viewer/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "serve:ssr:viewer"]
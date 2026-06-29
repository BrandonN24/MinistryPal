# Uses node version 25.6 as our base image
FROM node:25.6

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Set the working directory to /frontend
WORKDIR /frontend

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set port environment variable
ENV PORT=3000

# Expose port 3000 for the application
EXPOSE 3000

# Run the frontend
CMD ["npm", "run", "dev"]

FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json AND package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:migrate:dev" ]

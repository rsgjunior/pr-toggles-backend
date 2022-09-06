FROM node:alpine
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

# Bundle app source / copy all other files
COPY . .

#RUN npx prisma migrate dev

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
# for best practice read this
#https://github.com/ThomasOliver545/nestjs-local-development-docker-compose-hot-reload/blob/master/docker-compose.yml
CMD npm run build
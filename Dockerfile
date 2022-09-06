FROM node:alpine
WORKDIR /app
# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install
#RUN npx prisma migrate dev --name init

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
# for best practice read this
# https://notiz.dev/blog/prisma-migrate-deploy-with-docker
CMD npm run start:migrate:dev
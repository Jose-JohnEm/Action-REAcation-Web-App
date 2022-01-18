FROM node:16

# Create app directory
WORKDIR /server

COPY package.json ./

RUN yarn

COPY . .

# EXPOSE 8080

# CMD ["yarn", "start"]
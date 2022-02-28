FROM node:16

# Create app directory
WORKDIR /server

COPY . .

RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start" ]
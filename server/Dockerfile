FROM node:16

# Create app directory
WORKDIR /server

COPY . .

RUN yarn install

RUN curl -LO https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz
RUN tar -C . -xvf ngrok-stable-linux-amd64.tgz
ADD ./ngrok /server
# RUN nohup ./ngrok http 8080 &

EXPOSE 8080

# CMD ["./ngrok", "http", "8080"]
# &; yarn start"
#["./start.sh", "&&", "yarn", "start"]
CMD [ "yarn", "start" ]
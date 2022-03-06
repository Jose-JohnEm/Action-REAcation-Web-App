FROM node:16

# Create app directory
COPY . /app
WORKDIR /app

RUN mkdir -p /mobile_app/
RUN mkdir apk
RUN ln -s /mobile_app/app-release.apk apk/app-release.apk

RUN yarn install

EXPOSE 8080
CMD ["yarn", "start"]
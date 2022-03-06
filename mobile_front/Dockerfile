FROM node:16

WORKDIR /mobile

COPY . .

RUN yarn

CMD ["./android/gradlew", "assembleDebug"]
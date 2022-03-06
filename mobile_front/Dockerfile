FROM reactnativecommunity/react-native-android

COPY . /app
WORKDIR /app

USER root

RUN npm install
RUN cd android && ./gradlew assembleRelease

RUN mkdir /mobile_app/
# ./android/app/build/outputs/apk/release/app-release.apk
RUN cp android/app/build/outputs/apk/release/app-release.apk /mobile_app/app-release.apk




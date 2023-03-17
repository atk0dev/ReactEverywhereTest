# ReactEverywhereTest

## Test project for React Native Web

# ------- COMMON -------

1. Build Common library
cd SalutRNW/common
yarn

2. Build Common library 
cd SalutRNW/common
yarn build 

3. Distribute Common 
cd SalutRNW/common
yarn run publish-all (publish-web or publish-app)

# ------- WEB -------

4. Build web
cd SalutRNW/web
yarn

5. Run web
cd SalutRNW/web
yarn start

# ------- APP -------

6. Build app
cd SalutRNW/app
yarn

7. Build app ios
cd SalutRNW/app/ios
pod install

8. Run app
cd SalutRNW/app
run-i (npx react-native run-ios)


------------------------
APK for Android

keytool -genkey -v -keystore atk0_key_name.keystore -alias atk0_key_alias -keyalg RSA -keysize 2048 -validity 10000

pass: atk-4Dev


Build release apk
cd /app
cd android
./gradlew assembleRelease

as a result, the APK creation process is done. You can find the generated APK at android/app/build/outputs/apk/release/app-release.apk


-------------------------
Build for web

cd /web

yarn build
build output will be in /web/build folder

  serve -s build
  browse: http://localhost:3000/


---------
Docker with devatk11
docker image build -t devatk11/reacteverywheretest:v1 .
docker image ls
docker login
docker image push devatk11/reacteverywheretest:v1
docker run --publish 8080:80 devatk11/reacteverywheretest:v1

go to: http://localhost:8080
image here: https://hub.docker.com/repository/docker/devatk11/reacteverywheretest/general

------------
FlyIO
atk0@outlook.com

cd /web
flyctl deploy

// fly deploy --dockerfile Dockerfile

open: https://reacteverywheretest.fly.dev

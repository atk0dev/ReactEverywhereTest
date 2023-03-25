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


# ------- DEV -------

1. Build dev
cd SalutRNW/dev
yarn

2. Run dev
cd SalutRNW/dev
yarn start


# ------- API -------
API deployment instruction in the api readme

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

-------------------------
Build for dev

cd /dev

yarn build
build output will be in /dev/build folder

  serve -s build
  browse: http://localhost:3000/


---------
Docker with devatk11
docker image build -t devatk11/reacteverywheredev:v1 .
docker image ls
docker login
docker image push devatk11/reacteverywheredev:v1
docker run --publish 8080:80 devatk11/reacteverywheredev:v1

go to: http://localhost:8080
image here: https://hub.docker.com/repository/docker/devatk11/reacteverywheredev/general

------------
FlyIO
atk0@outlook.com

cd /dev
flyctl deploy

// fly deploy --dockerfile Dockerfile

open: https://reacteverywheredev.fly.dev


--------------
Update published website with latest version of Android APK:
1. Copy /app/android/app/build/outputs/apk/release/app-release.apk to /web/build/ 

------------------------------------
Make new version:

1. build library
cd /common
yarn build
yarn publish-all

2. build web
cd /web
yarn build

3. build android app
cd /app
cd android
./gradlew assembleRelease

4. add apk to web 
copy 
/app/android/app/build/outputs/apk/release/app-release.apk
to
/web/build

5. build web container
cd /web
docker image build -t devatk11/reacteverywheretest:v1 .
docker image push devatk11/reacteverywheretest:v1

6. publish web to fly
flyctl deploy
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
<h1>The Shop App React Native</h1>
Shopping app using react native
</br><br>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/1.png" width="200"/> 
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/2.png" width="200"/>   
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/3.png" width="200"/>   
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/4.png" width="200"/>   
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/5.png" width="200"/>   
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/6.png" width="200"/>   
<img align="left" src="https://github.com/tejasgawali4/TheShopAppReactNative/blob/master/ss/7.png" width="200"/>   

</br><br>

<h2>Debugging With React Native</h2>

</br><br>

You can debug Redux in React Native apps with help of the React Native Debugger tool: https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md

1) Make sure you got the React Native Debugger installed 
(https://github.com/jhen0409/react-native-debugger)

2) Enable JS Debugging in the running app 
(open development overlay via CTRL + M / CMD + M on Android devices, CMD + D on iOS devices)

3) Install the redux-devtools-extension package via 
npm install --save-dev redux-devtools-extension 
(https://www.npmjs.com/package/redux-devtools-extension)

4) Enable Redux debugging in your code:

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
 
const store = createStore(reducer, composeWithDevTools());
Important: Make sure you remove this code when building your app for production!

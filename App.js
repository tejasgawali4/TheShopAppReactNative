import React, {useState} from 'react';
import { createStore, combineReducers , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import NavigationContainer from './navigation/NavigationContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import odersReducer from './store/reducers/oders';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  product : productsReducer,
  cart : cartReducer,
  order : odersReducer,
  auth : authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk), composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );

};


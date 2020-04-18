import React from 'react';
import { Platform } from 'react-native';

import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';

import Colors from '../constants/Colors';
 
const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductNavigator = createStackNavigator({
    ProductsOverview : ProductOverviewScreen ,
    ProductDetails : ProductDetailScreen,
    Cart : CartScreen
},{
defaultNavigationOptions : defaultNavOptions
});


const OrderNavigator = createStackNavigator({
    Order : OrderScreen ,
},{
defaultNavigationOptions : defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products : {
      screen : ProductNavigator,
      navigationOptions : {
        drawerLabel : "Home"
      }
    },
    Orders : {
      screen : OrderNavigator,
      navigationOptions : {
        drawerLabel : "Orders"
      }
    }
},{
  contentOptions: {
    activeTintColor: Colors.primary,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});

export default createAppContainer(ShopNavigator);
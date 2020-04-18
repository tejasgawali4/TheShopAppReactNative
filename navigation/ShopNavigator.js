import React from 'react';
import { Platform } from 'react-native';

import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';


import { Ionicons } from '@expo/vector-icons';

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

const AdminNavigator = createStackNavigator({
  Admin : UserProductScreen ,
},{
defaultNavigationOptions : defaultNavOptions
});


const ShopNavigator = createDrawerNavigator({
    Products : {
      screen : ProductNavigator,
      navigationOptions : {
        drawerLabel : "Home",
        drawerIcon : drawerConfig => <Ionicons 
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}/>
      }
    },
    Orders : {
      screen : OrderNavigator,
      navigationOptions : {
        drawerLabel : "Orders",
        drawerIcon : drawerConfig => <Ionicons 
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}/>
      }
    },
    Admin : {
      screen : AdminNavigator,
      navigationOptions : {
        drawerLabel : "Admin",
        drawerIcon : drawerConfig => <Ionicons 
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}/>
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
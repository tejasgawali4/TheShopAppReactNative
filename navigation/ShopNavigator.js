import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import {  createAppContainer , createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator , DrawerItems } from 'react-navigation-drawer';

import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import * as authActions from '../store/actions/auth';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
 
const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
      alignSelf: 'center'
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
  UserProduct : UserProductScreen ,
  EditProduct : EditProductScreen
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
  },
  contentComponent: props => {
    const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
  }
});

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup : StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
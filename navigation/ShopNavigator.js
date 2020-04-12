import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
 
const ProductNavigator = createStackNavigator({
    productsOverview : { screen : ProductOverviewScreen },
    productDetails : ProductDetailScreen,
    cart : CartScreen
},{
    defaultNavigationOptions : {
        headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.primary : Colors.white
        },
        headerTitleStyle : {
            fontFamily : 'open-sans-bold'
        },
        headerBackTitleStyle : {
            fontFamily : 'open-sans'
        },
        headerTintColor : Platform.OS === 'android' ? Colors.white : Colors.primary 
    }
});

export default createAppContainer(ProductNavigator);
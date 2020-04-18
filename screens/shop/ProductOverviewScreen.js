import React from 'react';
import { FlatList, StyleSheet, View ,Platform } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductOverviewScreen = props => {

    const products = useSelector(state => state.product.availableProducts);

    const dispatch = useDispatch();

    return (<FlatList
        data={products}
        renderItem={itemData => 
            <ProductItem 
                imageUrl={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price}
                onViewDetails = {() => {
                    props.navigation.navigate('ProductDetails' ,  { 
                        productId : itemData.item.id ,
                        productTitle : itemData.item.title
                    });
                }}
                onAddToCart = {() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />
        }
        keyExtractor={item => item.id}
    />);
};

ProductOverviewScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Products',
      headerLeft : () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart');
                }}
            />
        </HeaderButtons>
      )
    };
  };


const styles = StyleSheet.create({

});

export default ProductOverviewScreen;
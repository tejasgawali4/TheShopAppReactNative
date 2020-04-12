import React from 'react';
import { FlatList,StyleSheet ,Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = props => {

    const products = useSelector(state => state.product.availableProducts);

    return <FlatList
        data={products}
        renderItem={itemData => 
            <ProductItem 
                imageUrl={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price}
                onViewDetails = {() => {
                    props.navigation.navigate('productDetails' ,  { 
                        productId : itemData.item.id ,
                        productTitle : itemData.item.title
                    });
                }}
                onAddToCart = {() => {
                    console.log("add to cart clicked..");
                }}
            />
        }
        keyExtractor={item => item.id}
    />;
};

ProductOverviewScreen.navigationOptions = {
    headerTitle : 'All Products'
};

const styles = StyleSheet.create({

});

export default ProductOverviewScreen;
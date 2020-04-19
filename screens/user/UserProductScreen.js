import React from 'react';
import { View , FlatList , Button, StyleSheet } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector , useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';


const UserProductScreen = props => {

    const userProducts = useSelector(state => state.product.userProducts);

    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct',{productId : id});
    };

    return (
        <View>
            <FlatList
                data={userProducts}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{
                        editProductHandler(itemData.item.id);
                    }}
                    onAddToCart={()=>{}}
                    >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={()=>{
                            editProductHandler(itemData.item.id);
                        }}/>
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={()=>{
                            dispatch(productActions.deleteProduct(itemData.item.id));
                        }}/>
                </ProductItem>}
            /> 
        </View>
    );
};

UserProductScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Your Products',
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
      headerRight : () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }}
            />
        </HeaderButtons>
      )
    };
};


const styles = StyleSheet.create({
    container : {

    }
});


export default UserProductScreen;

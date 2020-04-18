import React from 'react';
import { View , FlatList , Button, StyleSheet } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.product.userProducts);

    return (
        <View>
            <FlatList
                data={userProducts}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                <ProductItem
                    keyExtractor={itemData => itemData.item.id}
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{}}
                    onAddToCart={()=>{}}
                    >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={()=>{}}/>
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={()=>{}}/>
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
      )
    };
};


const styles = StyleSheet.create({
    container : {

    }
});


export default UserProductScreen;

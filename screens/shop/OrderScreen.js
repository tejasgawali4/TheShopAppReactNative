import React from 'react';
import { FlatList , StyleSheet , Text } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = props => {

    const orders = useSelector(state => state.order.orders);

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amt={itemData.item.totalAmount}
                date={itemData.item.date}
                items={itemData.item.items}
            />}        
        />
    );
};

OrderScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Your Orders',
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
        flex : 1
    }
});

export default OrderScreen;

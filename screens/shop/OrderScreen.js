import React from 'react';
import { FlatList , StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const OrderScreen = props => {

    const orders = useSelector(state => state.order.orders);

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemDate => <Text>{itemDate.item.totalAmount}</Text>}        
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

import React,{useState,useEffect } from 'react';
import { 
    FlatList, 
    StyleSheet,     
    View, 
    Text,
    ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem'; 
import Colors from '../../constants/Colors';
import * as orderActions from '../../store/actions/oders';

const OrderScreen = props => {

    const [error,setError] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const orders = useSelector(state => state.order.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false);
        }).catch(error => {
            setError(error.message);
        });
      }, [dispatch]);

    if(isLoading){
        return <View style={styles.loading}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>;
    }

    if(!isLoading && orders.length === 0){
        return <View style={styles.loading}>
            <Text>No Orders Found.</Text>
        </View>;
    }

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
    },
    loading : {flex : 1 , justifyContent : 'center', alignItems : 'center'}
});

export default OrderScreen;

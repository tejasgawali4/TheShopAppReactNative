import React from 'react';
import { Text , View,  FlatList , Button , StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => state.cart.items);

    return (
        <View style={styles.screen}>
            <View style={styles.screen}>
                <Text style={styles.screen}>Total : 
                    <Text style={styles.screen}>${cartTotalAmount}</Text>
                    <Button title={'Order Now'}/>
                </Text>
            </View>
            <View>
                <Text>Cart Items</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
      },
      summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
      },
      summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
      },
      amount: {
        color: Colors.primary
      }
});

export default CartScreen

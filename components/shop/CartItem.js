import React from 'react';
import { 
    View , 
    Text , 
    StyleSheet, 
    TouchableOpacity , 
    Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemDate}>
            <Text style={styles.qty}>{props.qty} </Text><Text style={styles.mainText}> {props.title} </Text>
            </Text>
            <View style={styles.itemDate}>
                <Text style={styles.mainText}> ${props.sum.toFixed(2)} </Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove}
                    style={styles.deleteButton}>
                        <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        Size={30}
                        color={Colors.red}/>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem : {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    itemDate : {
        flexDirection: 'row',
        alignItems: 'center'
    },
    qty : {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText : {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton :{
        marginLeft: 20
    }
});

export default CartItem;
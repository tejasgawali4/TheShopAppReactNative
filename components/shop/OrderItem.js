import React,{useState} from 'react';
import { View , StyleSheet , Text , Button } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';
import Moment from 'moment';

const OrderItem = props => {

    const [showDetails, setshowDetails ] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summery}>
                <Text style={styles.totalamt}> ${props.amt.toFixed(2)} </Text>
                <Text style={styles.date}> {Moment(props.date).format('MMMM Do YYYY, hh:mm')}</Text>
            </View>
            <Button  
                color={Colors.primary} 
                title={showDetails ? "Hide Details" : "Show Details" }
                onPress={()=>{
                    setshowDetails(prevState => !prevState);
                }}/>
            {showDetails && 
                <View style={styles.detailsItem}>
                    {props.items.map(cartItem => 
                        <CartItem 
                            key={CartItem.productId}
                            title={cartItem.productTitle} 
                            sum={cartItem.sum} 
                            qty={cartItem.quantity}/>)}
                </View>
            } 
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem : {
        shadowColor : 'black',
        shadowOpacity : 0.26,
        shadowOffset : { width : 0 , height : 2 },
        shadowRadius : 8 , 
        elevation : 5,
        borderRadius : 10 ,
        backgroundColor : Colors.white,
        margin : 20,
        padding :  10,
        alignItems : 'center'
    },
    totalamt : {
        fontSize : 16,
        fontFamily : 'open-sans-bold',
    },
    date : {
        fontSize : 16,
        fontFamily : 'open-sans',
        color: '#888'
    },
    summery : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    detailsItem : {
        width : '100%'
    }
});

export default OrderItem;

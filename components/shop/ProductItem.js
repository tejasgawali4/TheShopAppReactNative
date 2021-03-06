import React from 'react';
import { 
    View , 
    Text , 
    Image , 
    Button ,
    StyleSheet, 
    TouchableOpacity , 
    TouchableNativeFeedback, 
    Platform } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
        <View style={styles.touchable}> 
            <TouchableCmp onSelect={props.onViewDetails} useForeground>
                <View>
                    <View style={styles.image}>
                        <Image
                            style={styles.imageContainer} 
                            source={{ uri: props.imageUrl.toString()}}/>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}t>${props.price.toFixed(2)}</Text>
                    </View>    
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </View>
    </Card>);
    
};

const styles = StyleSheet.create({
    product : {
        shadowColor : 'black',
        shadowOpacity : 0.26,
        shadowOffset : { width : 0 , height : 2 },
        shadowRadius : 8 , 
        elevation : 5,
        borderRadius : 10 ,
        backgroundColor : Colors.white,
        height : 300,
        margin : 20
    },
    touchable : {
        borderRadius : 10 ,
        overflow : 'hidden'
    },
    image : {
        width : '100%',
        height : '60%',
        borderTopLeftRadius : 10 ,
        borderTopRightRadius : 10 ,
        overflow : 'hidden'
    },
    imageContainer : {
        width : '100%',
        height : '100%',
    },
    details : {
        alignItems : 'center',
        height : '15%',
        fontFamily : 'open-sans',
        padding : 10
    },
    title : {
        fontSize : 18,
        fontFamily : 'open-sans-bold',
        marginVertical : 2,
    },
    price : {
        fontSize : 14,
        fontFamily : 'open-sans-bold',
        color : Colors.gray
    },
    actions : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : '25%',
        paddingHorizontal : 20
    }
});
    
export default ProductItem

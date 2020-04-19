import React from 'react';
import { 
    View , 
    Text , 
    Image , 
    Button ,
    ScrollView,
    StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');

    const dispatch = useDispatch();

    const selectedProduct = useSelector(state => 
        state.product.availableProducts.find(prod => prod.id === productId)
    );

    return (
        <ScrollView>
            <View>
                <Image 
                    style={styles.image}
                    source={{ uri : selectedProduct.imageUrl }}/>
                <View style={styles.actions}>
                    <Button color={Colors.primary} title={'Add to Cart'} onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}/>
                </View>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle : navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 300
    },
    description : {
        fontSize : 14 ,
        textAlign : 'center',
    },
    actions : {
        marginVertical : 10,
        alignItems : 'center',
        margin : 20
    },  
    price : {
        fontSize : 20,
        color : Colors.gray,
        textAlign : 'center',
        marginVertical : 20
    }
});

export default ProductDetailScreen;

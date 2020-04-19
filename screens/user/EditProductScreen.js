import React, {useState } from 'react';
import { View , ScrollView , TextInput , Text , StyleSheet , Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');

    const editedProduct = useSelector(state =>
        state.product.userProducts.find(prod => prod.id === prodId)
    );
      
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ''
    );

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title </Text>
                    <TextInput style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL </Text>
                    <TextInput style={styles.input}
                        value={imageUrl} 
                        onChangeText={text => setTitle(setImageUrl)} />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                    <Text style={styles.label}>Price </Text>
                    <TextInput style={styles.input} 
                        value={price} 
                        onChangeText={text => setPrice(text)}/>
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descriptions </Text>
                    <TextInput style={styles.input} 
                         value={description} 
                         onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: navData.navigation.getParam('productId')
        ? 'Edit Product'
        : 'Add Product',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitFn}
          />
        </HeaderButtons>
      )
    };
};

styles = StyleSheet.create({
    form : {
        margin: 20
    },
    formControl :{
        width: '100%'
    },
    label : {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input : {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});
 
export default EditProductScreen;

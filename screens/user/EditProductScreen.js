import React, { useState, useEffect, useCallback , useReducer } from 'react';
import { View , ScrollView , TextInput , Text , StyleSheet , Platform , Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as productsActions from '../../store/actions/products';

const FORM_UPDATE = 'FORM_UPDATE'

const formReducer = (state,action) => {
    if(action.type === FORM_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input] : action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input] : action.isValid
        };

        let updatedformIsValid = true;
        for (const key in updatedValidities){
          updatedformIsValid = updatedformIsValid && updatedValidities[key];
        }

        return {
          updatedformIsValid,
          inputValues : updatedValues,
          inputValidities : updatedValidities
        };
    } 
}
const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.product.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState,dispatchFormState] = useReducer(formReducer,{
      inputValues : {
        title : editedProduct ? editedProduct.title : '',
        imageUrl : editedProduct ? editedProduct.imageUrl : '',
        description : editedProduct ? editedProduct.description : '',
        price : ''
      } , 
      inputValidities : {
        title : editedProduct ? true : false,
        imageUrl : editedProduct ? true : false,
        description : editedProduct ? true : false,
        price : editedProduct ? true : false,
      },
      formIsValid : editedProduct ? true : false
    })

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input !','Please check inputs',[{
              text : 'Okay'
            }]);
            return;
        }
        if (editedProduct) {
            dispatch(
              productsActions.updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl)
            );
        } else {
            dispatch(
              productsActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price)
            );
        }
        props.navigation.goBack();
    }, [dispatch,prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);


    const inputChangeHandler = useCallback((inputIdentifier, inputValue , inputValidity) => {
        dispatchFormState({
          type : FORM_UPDATE, 
          value : inputValue,
          isValid : inputValidity,
          input : inputIdentifier
        });
    },[dispatchFormState]);


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Input
                      label='Title'
                      errorText='Please Enter Valid Title'
                      keyboardType={'default'}
                      autoCorrect
                      autoCapitalize={'sentences'}
                      returnKeyType={'next'}
                      onInputChange={inputChangeHandler.bind(this,'title')}
                      initalValue={editedProduct ? editedProduct.title : ''}
                      initiallyValid={!!editedProduct}
                    />
                </View>
                <View style={styles.formControl}>
                    <Input
                        label='ImageUrl'
                        errorText='Please Enter Valid ImageUrl'
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        initalValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                      />
                </View>
                {editedProduct ? null : (
                  <View style={styles.formControl}>
                      <Input
                          label='Price'
                          errorText='Please Enter Valid Price'
                          keyboardType={'decimal-pad'}
                          returnKeyType={'next'}
                          initalValue={editedProduct ? editedProduct.price : ''}
                          initiallyValid={!!editedProduct}
                        />
                  </View>
                )}
                <View style={styles.formControl}>
                    <Input
                        label='Description'
                        errorText='Please Enter Valid Title'
                        keyboardType={'default'}
                        autoCorrect
                        autoCapitalize={'sentences'}
                        numberOfLines={3}
                        initalValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                      />
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

const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }
  });
export default EditProductScreen;

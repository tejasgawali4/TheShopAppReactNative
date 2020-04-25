import React,{useState, useEffect , useCallback} from 'react';
import { 
    View , 
    Text, 
    FlatList, 
    StyleSheet, 
    Platform, 
    ActivityIndicator , 
    Button } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {
    const [error,setError] = useState('');
    const [IsRefreshing,setIsRefreshing] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const products = useSelector(state => state.product.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        setError(null);
        try{
            await dispatch(productActions.fetchProducts());
        }catch(err){
            setError(err.message);
        }
        setIsRefreshing(false);
    },[dispatch,setIsLoading,setError]);


    useEffect(()=> {
        props.navigation.addListener('willFocus', ()=> loadProducts);
    },[loadProducts]);

    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false);
        });
    },[dispatch,loadProducts]);

    if(error){
        return <View style={styles.loading}>
             <Text>{error}</Text>
             <Button color={Colors.primary} text={'try agin'} onPress={loadProducts}/>
        </View>;
    }

    if(isLoading){
        return <View style={styles.loading}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>;
    }

    if(!isLoading && products.length === 0){
        return <View style={styles.loading}>
            <Text>No Products Found.</Text>
        </View>;
    }

    const selectItemHandler = (id,title) => {
        props.navigation.navigate('ProductDetails' ,  { 
            productId : id ,
            productTitle : title
        });
    };

    return (<FlatList
        onRefresh={loadProducts}
        refreshing={IsRefreshing}
        data={products}
        renderItem={itemData => 
            <ProductItem 
                imageUrl={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price}
                onSelect = {() => {
                    selectItemHandler(itemData.item.id,itemData.item.title);
                }}
            >
                <Button 
                    color={Colors.primary} 
                    title="View Details" 
                    onPress={()=>{
                        selectItemHandler(itemData.item.id,itemData.item.title);
                    }}/>
                <Button 
                    color={Colors.primary} 
                    title="To Cart" 
                    onPress={()=>{
                        dispatch(cartActions.addToCart(itemData.item));
                    }}/>
            </ProductItem>
        }
        keyExtractor={item => item.id}
    />);
};
               
ProductOverviewScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Products',
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
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart');
                }}
            />
        </HeaderButtons>
      )
    };
  };


const styles = StyleSheet.create({
    loading : {flex : 1 , justifyContent : 'center', alignItems : 'center'}
});

export default ProductOverviewScreen;
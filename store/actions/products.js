import Product from "../../models/product";
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
import Config from '../../constants/Config';

export const fetchProducts = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        console.log(userId);
        try {
            const response = await fetch(`${Config.API_BASE_URL}/products.json?auth=${token}`);

            if(!response.ok){
                throw new Error('Something went wrong..');
            }

            const resData = await response.json();
    
            const loadedProducts = [];
    
            for(const key in resData){
                loadedProducts.push(new Product(
                    key, 
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price));
            }
    
            dispatch({
                type : SET_PRODUCT , 
                products : loadedProducts,
                userProducts : loadedProducts.filter(product => product.ownerId === userId) 
            });
        }catch(err){
            console.log(err);
            throw err;
        };
       
    };
};

export const deleteProduct = ( productId ) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${Config.API_BASE_URL}/products/${productId}.json?auth=${token}`,{
            method : 'DELETE'
        });

        if(!response.ok){
            throw new Error('Something went wrong..');
        }

        dispatch({ 
            type : DELETE_PRODUCT , 
            pid : productId
        });
    };
};

export const createProduct = (title, description , imageUrl , price ) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`${Config.API_BASE_URL}/products.json?auth=${token}`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId : userId})
        });
        
        const resData = await response.json();

        if(!response.ok){
            throw new Error('Something went wrong..');
        }

        dispatch ({
            type : CREATE_PRODUCT,
            productData : {
                id : resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId : userId
            }
        });
    };
};

export const updateProduct = (id , title, description , imageUrl ) => {

    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${Config.API_BASE_URL}/products/${id}.json?auth=${token}`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title,
                imageUrl,
                description})
        });

        if(!response.ok){
            throw new Error('Something went wrong..');
        }

        dispatch({
            type : UPDATE_PRODUCT,
            pid : id,
            productData : {
                title,
                description,
                imageUrl        
            }
        });
    };
};
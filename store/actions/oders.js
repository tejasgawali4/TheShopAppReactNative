import Order from "../../models/order";
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import Config from '../../constants/Config';

export const fetchOrders = () => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
            `${Config.API_BASE_URL}/orders/${userId}.json?auth=${token}`
            );
    
            if (!response.ok) {
            throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const loadedOrders = [];
    
            for (const key in resData) {
            loadedOrders.push(
                new Order(
                key,
                resData[key].cartItem,
                resData[key].totalAmount,
                new Date(resData[key].date)
                )
            );
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }
    };
};

export const addOrder = ( cartItem , totalAmount ) => {

    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`${Config.API_BASE_URL}/orders/${userId}.json?auth=${token}`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                cartItem,
                totalAmount,
                date : date.toISOString()
            })
        });

        
        if(!response.ok){
            throw new Error('Something went wrong..');
        }

        const resData = await response.json();

        dispatch({ 
            type : ADD_ORDER , 
            orderData : { 
                id : resData.name,
                items : cartItem , 
                amount : totalAmount,
                date : date
            }
        });
    };
};
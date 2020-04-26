import { ADD_ORDER, SET_ORDERS } from '../actions/oders';
import Order from '../../models/order';

const initialState = {
    orders : []
};

export default (state = initialState, actions) => {

    switch(actions.type){
        case SET_ORDERS : 
            return {
                orders: actions.orders
            };
        case ADD_ORDER :
            const newOrder = new Order(
                actions.orderData.id,
                actions.orderData.items,
                actions.orderData.amount,
                actions.orderData.date
            )
               
            return { ...state ,
                    orders : state.orders.concat(newOrder)
            };
    };

    return state;
}
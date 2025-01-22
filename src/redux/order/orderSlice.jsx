import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';


const initialState = {
    cart: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddToCartAction: (state, action) => {
            const { id, quantity, color, size, detail } = action.payload
            let newCart = state.cart
            const index = newCart.findIndex((item) => item.id === id && item.color == color && item.size === size)
            if (index > -1) {
                newCart[index].quantity = +newCart[index].quantity + quantity
            } else {
                newCart = [action.payload, ...newCart]
            }
            state.cart = newCart
        },
        doUpdateQuantityAction: (state, action) => {
            const { id, quantity, color, size, detail } = action.payload
            const newCart = state.cart
            const index = newCart.findIndex(item => item.id === id && item.color == color && item.size === size)
            if (index > -1) {
                newCart[index] = action.payload
            }
        }
    },
});

export const { doAddToCartAction, doUpdateQuantityAction } = orderSlice.actions;

export default orderSlice.reducer;

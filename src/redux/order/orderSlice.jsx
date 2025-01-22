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
        },
        doDeleteProductInCartAction: (state, action) => {
            const { id, color, size } = action.payload
            console.log(id, color, size)
            let newCart = state.cart
            newCart = newCart.filter(item => item.id != id || item.color != color || item.size != size)
            state.cart = newCart
        },
        doClearCartAction: (state) => {
            state.cart = []
        }
    },
});

export const { doAddToCartAction, doUpdateQuantityAction, doClearCartAction, doDeleteProductInCartAction } = orderSlice.actions;

export default orderSlice.reducer;

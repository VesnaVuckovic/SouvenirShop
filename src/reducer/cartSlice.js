import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    isOpen: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const id = action.payload.id;
            const item = state.cartItems.find(elem => elem.id === id);

            if (item) {
                item.quantity++;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        toggleCartOpen(state, action) { 
            state.isOpen = action.payload;
        },
        increment(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.map(elem => {
                if (elem.id === id) {
                    elem.quantity++;
                }
                return elem;
            });
        },
        decrement(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.map(elem => {
                if (elem.id === id && elem.quantity > 1) {
                    elem.quantity--;
                }
                return elem;
            });
        },
        deleteItem(state, action) {
            const id = action.payload;
            const index = state.cartItems.findIndex(elem => parseInt(elem.id) === parseInt(id));
            state.cartItems.splice(index, 1);
        },
        deleteAll(state, action) {
            state.cartItems = [];
        }
    }
});

export const { addItem, toggleCartOpen, increment, decrement, deleteItem, deleteAll } = cartSlice.actions; 

export default cartSlice.reducer;
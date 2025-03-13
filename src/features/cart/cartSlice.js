import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const getCartItems =createAsyncThunk('cart/getCartItems',
    ()=>{
        return fetch(url).then((res)=>res.json()).catch((err)=>console.log(err))
    }
)

const initialState = {
    cartItems : cartItems,
    amount : 0,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart(state){
            state.cartItems =[]
        },
        removeItem(state,action){
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=> item.id !== itemId)
        },
        increase(state,action){
            const cartItem = state.cartItems.find((item)=>item.id === action.payload);
            cartItem.amount +=1;
        }
        ,
        decrease(state,action){
            const cartItem = state.cartItems.find((item)=>item.id === action.payload);
            cartItem.amount -=1;
        },
        calculateTotal(state){
            let amount =0;
            let total =0;
            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
                // console.log(item.amount)
                // console.log(item.price)
            })
            state.amount = amount;
            state.total = total
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
                state.isLoading = true;
               }).addCase(getCartItems.fulfilled,
                (state,action)=>{
                        state.isLoading = false;
                        state.cartItems = action.payload
                       }
               ).addCase(getCartItems.rejected,(state)=>{
                    state.isLoading = false;
                   },)
    }

    // extraReducers:{
    //    [ getCartItems.pending] :(state)=>{
    //     state.isLoading = true;
    //    },
    //    [ getCartItems.fulfilled] :(state,action)=>{
    //     state.isLoading = false;
    //     state.cartItems = action.payload
    //    },
    //    [ getCartItems.rejected] :(state)=>{
    //     state.isLoading = false;
    //    },
    // }

})
// console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotal} = cartSlice.actions;

export default cartSlice.reducer;
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { openModal } from '../features/modal/ModalSlice'
import { getCartItems } from '../features/cart/cartSlice'


const CartContainer = () => {
    const dispatch = useDispatch()
    const {cartItems,amount,total} = useSelector((store)=>store.cart)
    if(amount < 1){
        return(
            <section className='cart'>

            <header>
                <h2>Your Cart</h2>
                <h4 className='empty-cart'>is Currently Empty</h4>
            <button className='btn refresh'onClick={()=>dispatch(getCartItems())}>Refresh Items</button>
            </header>
            </section>
        )
    }
  return (
    <section className='cart'>

            <header>
                <h2>Your Cart</h2>
            </header>
            <div>
                {cartItems.map((item)=>{
                    return <CartItem key={item.id} {...item} />
                })}
            </div>

            <footer>
                <hr />
                <div className="cart-total">
                    <h4>total <span>{total.toFixed(2)}</span></h4>
                </div>
                <button className='btn clear-btn' onClick={()=>dispatch(openModal())}>Clear Cart</button>
            </footer>
            </section>
  )
}

export default CartContainer

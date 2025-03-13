import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch,useSelector } from "react-redux";
import { calculateTotal } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const {cartItems} = useSelector((store)=>store.cart);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(calculateTotal())
  },[cartItems,dispatch])
  return <main>
    <Modal />
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;

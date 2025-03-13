import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

import React from 'react'

function Navbar() {
  const {amount} = useSelector((store)=>store.cart);
  return (
    <nav>
        <div className="nav-center">
            <h2>Redux Cart App</h2>
            <div className="nav-container">
                <CartIcon />
                <div className="amount-container">
                    <p className="total-amount">{amount}</p>
                </div>
                
            </div>
        </div>
      
    </nav>
  )
}

export default Navbar

import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { addItem, toggleCartOpen, increment, decrement, deleteItem, deleteAll } from '../reducer/cartSlice';
import { calculatePromoPrice } from "../store/utils/calculatePrice";

const Cart = () => {
  const { isOpen, cartItems } = useSelector(state => state.cart);
  const numberOfItems = cartItems.length;
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth) || {};       
  
  const handleAddToCart = () => {
      if (!isLoggedIn) {
          dispatch({ type: OPEN_POPUP });
          return;
      }
      dispatch(addItem({ id: itemId, quantity: 1, ...otherItemData }));
  };      
    
  const handleOpenCart = () => {
      dispatch(toggleCartOpen(false));
  }

  const handleIncerement = (id) => {
      dispatch(increment(id));
  }


  const handleDeleteAll=()=>{
      dispatch(deleteAll());
  }

  const handleDecrement = (id) => {
      dispatch(decrement(id));
  }

  const handleDeleteItem=(id)=>{
      dispatch(deleteItem(id));
  }

  const total = cartItems.reduce(function(acc, item) {
      const displayPrice = calculatePromoPrice(item.regularPrice, item.promoDiscount);
      const subtotal = displayPrice * item.quantity;
      return acc + subtotal;
  }, 0);

  return (
      <>                            
          {isOpen && (
              <div id="cart">                    
                  <div className="cart_head">
                      <h2>Cart</h2>
                      <div className="close_btn" onClick={handleOpenCart}><span>&times;</span></div>
                  </div>
                  <div className="cart_body">
                      {numberOfItems === 0 ? (<h2>Empty cart</h2>) :
                          (
                              <div>
                                  {cartItems.map(item => {
                                      const { id, image, typeName, colorName, regularPrice, quantity, } = item;                                        
                                      const displayPrice = calculatePromoPrice(item.regularPrice, item.promoDiscount);
                                      console.log(`Item: ${typeName} ${colorName}, Quantity: ${quantity}, Display Price: ${displayPrice}`);
                                      console.log("Subtotal: ", quantity * displayPrice);                                                                        
                                      return (
                                          <div className="cart-items" key={id}>
                                              <figure className="cart_img">
                                                  <img src={image.src} alt={image.alt} />
                                              </figure>
                                              <div className="cart_item_type">{typeName} {colorName}</div>
                                              <div className="cart_item_price">{displayPrice} EUR</div>                                               
                                              <div className="quantity">
                                                  <span className="qty" onClick={() => handleDecrement(id)}>-</span>
                                                  {quantity} 
                                                  <span className="qty" onClick={() => handleIncerement(id)}>+</span>
                                              </div>
                                              <div className="danger" onClick={()=>handleDeleteItem(id)}>
                                                  &times;
                                              </div></div>
                                      )
                                  })}   
                                  <div className='cart-bottom'>                                 
                                      <p className="total">Total: {total} EUR</p>                                    
                                      <p className="linkD" onClick={()=>handleDeleteAll()}>Delete all</p>                                       
                                  </div>                            
                              </div>
                          )}              
                  </div>
              </div>
          )}                     
      </>
  )
}

export default Cart;
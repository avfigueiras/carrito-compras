import { useState, useEffect, useMemo } from "react";
import db from "../data/db";
import {Guitar, CartItem } from "../types/types";

export const useCart = () => {

//LOGICA DEL COMPONENTE APP
const initialCart = (): CartItem[]=> {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
 }
 
   const [data] = useState(db);
   const [cart, setCart] = useState(initialCart);
   const MAX_ITEMS = 5;
   const MIN_ITEMS = 1;
 
    useEffect(() =>{
      localStorage.setItem('cart', JSON.stringify(cart))
     }, [cart])
 

   const addToCart = (item: Guitar) => {
     const itemExist = cart.findIndex((element) => element.id === item.id);
     if (itemExist >= 0) {
       const updatedCart = [...cart];
       updatedCart[itemExist].quantity++;
       setCart(updatedCart);
     } else { 
      const newItem: CartItem = { ...item, quantity: 1}
       setCart([...cart, newItem]);
     }
   };
 
   const deleteFromCart = (id:Guitar ['id']) => {
     setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
   };
 
   const increaseQuantity = (id:Guitar ['id']) => {
     const updateQuantity = cart.map((item) => {
       if (item.id === id && item.quantity < MAX_ITEMS) {
         return {
           ...item,
           quantity: item.quantity + 1,
         };
       }
       return item;
     });
     setCart(updateQuantity);
   };
 
   const decreaseQuantity = (id:Guitar ['id']) => {
     const decreased = cart.map((item) => {
       if (item.id === id && item.quantity > MIN_ITEMS) {
         return {
           ...item,
           quantity: item.quantity - 1,
         };
       }
       return item;
     });
 
     setCart(decreased);
   };
 
   const cleanCart = () => setCart([]);

//LOGICA DEL COMPONENTE HEADER
const isEmptyCart = useMemo(() => cart.length === 0, [cart])
const totals = useMemo(() =>cart.reduce((totalValue,currentValue) => totalValue + (currentValue.quantity * currentValue.price),0),[cart] )

return {
   data,
   cart,
   addToCart,
   deleteFromCart,
   increaseQuantity,
   decreaseQuantity,
   cleanCart,
   isEmptyCart,
   totals
  };

}
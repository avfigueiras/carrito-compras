import { useState, useEffect, useMemo } from "react";
import db from "../data/db";
import {Guitar, CartItem } from "../types/types";

//Aca ponemos toda la logica de lo que está en App,Header

export const useCart = () => {
// Traemos la logica que tenia el APP.jsx y el Header.jsx para este hook


//LOGICA DEL COMPONENTE APP
const initialCart = (): CartItem[]=> {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
 }
 
 //como no se usa setData lo podemos borrar
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
      /* al tipar  item: Guitar, se modifica creando una constante del tipo cartItem que tiene la prop cantidad
      de esta forma tiene la copia del item y le pasas la propiedad cantidad con el valor 1*/
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

//usando useMemo y se llama en el template como variable ya no como funcion quedando totals en vez de totals()
const totals = useMemo(() =>cart.reduce((totalValue,currentValue) => totalValue + (currentValue.quantity * currentValue.price),0),[cart] )


/*se recomienda que se retorne un objeto pero puede devolver un array, etc.Si no se pone 
dentro del return no podemos usarlo en el componente. Tenemos que devolver todo lo que usa el
componente app y que declaramos aca en el hook, data que tiene las guitarras, el carrito y las funciones*/
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
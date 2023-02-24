import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const incrementItemCount = (item) => {
    const target = cartItems.find((el) => el.id === item.id);
    setCartItems([...cartItems], target.quantity++);
  };

  const decrementItemCount = (item) => {
    const target = cartItems.find((el) => el.id === item.id);
    if(target.quantity === 1) return;
    setCartItems([...cartItems], target.quantity--);
  };

  const removeItem = (item) => {
    const res = cartItems.filter(el => el.id !== item.id);
    setCartItems([...res]);
  }

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    setCartItems,
    incrementItemCount,
    decrementItemCount,
    removeItem,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

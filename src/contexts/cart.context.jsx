import { createContext, useState, useEffect, useReducer } from "react";

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

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
};

export const CartProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount } = state;

  const setCartItems = (items) => {
    dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: items})
  };

  const setCartCount = (count) => {
    dispatch({type: CART_ACTION_TYPES.SET_CART_COUNT, payload: count})
  };

  const setIsCartOpen = (bool) => {
    dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
  }


  const incrementItemCount = (item) => {
    const target = cartItems.find((el) => el.id === item.id);
    setCartItems([...cartItems], target.quantity++);
  };

  const decrementItemCount = (item) => {
    const target = cartItems.find((el) => el.id === item.id);
    if (target.quantity === 1) return;
    setCartItems([...cartItems], target.quantity--);
  };

  const removeItem = (item) => {
    const res = cartItems.filter((el) => el.id !== item.id);
    setCartItems([...res]);
  };

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
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
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

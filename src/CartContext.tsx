import React, { createContext, useEffect, useState } from 'react';

export type CartItem = {
  name: string;
  img: string;
  price: number;
  number: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  subtractFromCart: () => void;
  removeFromCart: (name: CartItem['name']) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

type Props = {
  children?: React.ReactNode;
};
export default function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
  );

  function addToCart(payload: CartItem) {
    // if same name, add number to existing object
    const sameItemIndex = cartItems.findIndex(
      (item) => item.name === payload.name,
    );
    if (sameItemIndex !== -1) {
      const sameItem = cartItems[sameItemIndex];
      setCartItems((prev) => {
        // item with modified number
        const modifiedItem = {
          ...sameItem,
          number: sameItem.number + payload.number,
        };

        // duplicate and splice
        const updatedCartItems = [...prev];
        updatedCartItems.splice(sameItemIndex, 1, modifiedItem);
        return updatedCartItems;
      });
    } else {
      // else add new object to array
      setCartItems((prev) => [...prev, payload]);
    }
  }

  function subtractFromCart() {}

  function removeFromCart(name: CartItem['name']) {
    const itemIndex = cartItems.findIndex((item) => item.name === name);
    setCartItems((prev) => {
      // duplicate, remove from array
      const updatedCartItems = [...prev];
      updatedCartItems.splice(itemIndex, 1);
      return updatedCartItems;
    });
  }

  // sync state to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, subtractFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

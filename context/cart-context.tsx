"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

/* -----------------------------
   Types
------------------------------ */

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;

  addToCart: (
    product: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    id: string | number
  ) => void;

  updateQuantity: (
    id: string | number,
    quantity: number
  ) => void;

  increaseQuantity: (
    id: string | number
  ) => void;

  decreaseQuantity: (
    id: string | number
  ) => void;

  clearCart: () => void;
}

/* -----------------------------
   Context
------------------------------ */

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

/* -----------------------------
   Provider
------------------------------ */

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  /* -----------------------------
     Load cart from localStorage
  ------------------------------ */

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* -----------------------------
     Save cart to localStorage
  ------------------------------ */

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, isLoaded]);

  /* -----------------------------
     Add to cart
  ------------------------------ */

  const addToCart = (
    product: Omit<CartItem, "quantity">
  ) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /* -----------------------------
     Remove from cart
  ------------------------------ */

  const removeFromCart = (
    id: string | number
  ) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  /* -----------------------------
     Update quantity
  ------------------------------ */

  const updateQuantity = (
    id: string | number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  /* -----------------------------
     Increase quantity
  ------------------------------ */

  const increaseQuantity = (
    id: string | number
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /* -----------------------------
     Decrease quantity
  ------------------------------ */

  const decreaseQuantity = (
    id: string | number
  ) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* -----------------------------
     Clear cart
  ------------------------------ */

  const clearCart = () => {
    setCartItems([]);
  };

  /* -----------------------------
     Cart count
  ------------------------------ */

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  /* -----------------------------
     Cart total
  ------------------------------ */

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  /* -----------------------------
     Context value
  ------------------------------ */

  const value: CartContextType = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* -----------------------------
   Hook
------------------------------ */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

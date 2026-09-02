'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '@/data/mock-data';
import { ReceiptData } from '@/components/receipt-modal';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface UserOrder {
  id: string;
  receipt: ReceiptData;
}

interface CartContextType {
  cart: CartItem[];
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQty: number) => void;
  increaseQuantity: (productId: string, selectedColor?: string) => void;
  decreaseQuantity: (productId: string, selectedColor?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  totalPrice: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  activeReceipt: ReceiptData | null;
  setActiveReceipt: (receipt: ReceiptData | null) => void;
  userOrders: UserOrder[];
  addUserOrder: (receipt: ReceiptData) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>(['p1']);
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    const initialProduct = PRODUCTS[0];
    if (initialProduct) {
      setCart([
        {
          product: initialProduct,
          quantity: 1,
          selectedColor: initialProduct.colors[0]?.name || 'Standard',
        },
      ]);
    }

    const sampleReceipt: ReceiptData = {
      receiptId: 'REC-98214',
      transactionId: 'TXN-8849204912',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName: 'Alex Rivera',
      customerEmail: 'alex@example.com',
      customerPhone: '+1 (555) 234-5678',
      shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
      paymentMethod: 'Credit Card (ending in 4242)',
      items: [
        {
          name: 'Ergonomic Executive Chair Pro',
          quantity: 1,
          price: 249,
          variant: 'Matte Black',
        },
        {
          name: 'Acoustic Desk Divider & Shelf',
          quantity: 1,
          price: 129,
          variant: 'Charcoal Grey',
        },
      ],
      subtotal: 378,
      discount: 0,
      shippingFee: 0,
      tax: 30.24,
      total: 408.24,
      type: 'order',
    };

    setUserOrders([{ id: 'REC-98214', receipt: sampleReceipt }]);
  }, []);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
  };

  const updateQuantity = (productId: string, selectedColor: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const increaseQuantity = (productId: string, selectedColor?: string) => {
    const target = cart.find((i) => i.product.id === productId);
    if (target) {
      updateQuantity(productId, selectedColor || target.selectedColor, target.quantity + 1);
    }
  };

  const decreaseQuantity = (productId: string, selectedColor?: string) => {
    const target = cart.find((i) => i.product.id === productId);
    if (target) {
      updateQuantity(productId, selectedColor || target.selectedColor, target.quantity - 1);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setPromoCode(clean);
      setDiscountPercent(0.1);
      return true;
    } else if (clean === 'SAVE20') {
      setPromoCode(clean);
      setDiscountPercent(0.2);
      return true;
    }
    return false;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const addUserOrder = (receipt: ReceiptData) => {
    setUserOrders((prev) => [{ id: receipt.receiptId, receipt }, ...prev]);
    setActiveReceipt(receipt);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const totalPrice = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart,
        cartCount: totalItems,
        cartTotal: totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        promoCode,
        applyPromoCode,
        totalPrice,
        wishlist,
        toggleWishlist,
        activeReceipt,
        setActiveReceipt,
        userOrders,
        addUserOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

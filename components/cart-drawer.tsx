'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, Check } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    totalPrice,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) {
      setPromoMessage({ type: 'success', text: 'Promo code applied successfully!' });
      setInputCode('');
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try WELCOME10 or SAVE20' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white text-slate-900 border-l-2 border-slate-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b-2 border-slate-900">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-black text-slate-900">
                Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-black hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Looks like you haven't added any products to your workspace catalog yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="flex gap-4 p-3.5 rounded-xl border-2 border-slate-200 bg-white"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Color: <span className="font-semibold text-slate-800">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-lg border-2 border-slate-300 bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                          }
                          className="p-1 text-slate-700 hover:bg-slate-100 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                          }
                          className="p-1 text-slate-700 hover:bg-slate-100 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black font-mono text-slate-900">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Order Summary & Promo Code */}
          {cart.length > 0 && (
            <div className="p-5 border-t-2 border-slate-900 bg-slate-50 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo code (WELCOME10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white text-slate-900 focus:border-slate-900 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <div
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {promoMessage.type === 'success' && <Check className="w-3.5 h-3.5" />}
                  <span>{promoMessage.text}</span>
                </div>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold font-mono text-slate-900">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="font-mono">${totalPrice}</span>
                </div>
              </div>

              {/* CTA Checkout Link */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;

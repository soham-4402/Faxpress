'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  Check,
  ShieldCheck,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    totalItems,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    if (applyPromoCode(inputCode)) {
      setPromoMessage({ type: 'success', text: `Applied ${inputCode.toUpperCase()}` });
      setInputCode('');
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid code. Try WELCOME10 or SAVE20' });
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-md">
              <ShoppingBag size={28} />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Your cart is empty
            </h1>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't added any ergonomic chairs, standing desks, or workspace accessories to your cart yet.
            </p>

            <Link
              href="/catalog"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-slate-900 px-7 text-xs font-bold text-white transition hover:bg-slate-800 shadow-md"
            >
              <span>Explore Workspace Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-6">
          <Link
            href="/catalog"
            className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Workspace Catalog
          </Link>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Shopping Bag Summary
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                Your Shopping Cart
              </h1>
            </div>

            <p className="text-xs font-bold text-slate-500">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Cart Items List */}
          <section className="lg:col-span-2 space-y-4">
            <div className="divide-y divide-slate-200">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="flex gap-5 py-6 items-start justify-between"
                >
                  {/* Image */}
                  <Link
                    href={`/catalog/${item.product.id}`}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/catalog/${item.product.id}`}
                          className="font-bold text-sm text-slate-900 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-slate-500">
                          Color Variant: <span className="font-semibold text-slate-800">{item.selectedColor}</span>
                        </p>
                        <p className="mt-1 text-xs font-bold font-mono text-slate-900">
                          ${item.product.price}.00 each
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex h-9 items-center rounded-lg border-2 border-slate-300 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                          }
                          className="flex h-full w-8 items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                          }
                          className="flex h-full w-8 items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <p className="font-black text-base font-mono text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-bold text-slate-500 underline underline-offset-4 hover:text-slate-900"
            >
              Clear all items
            </button>
          </section>

          {/* Order Summary Sidebar */}
          <aside className="space-y-4">
            <div className="border-2 border-slate-900 rounded-2xl p-6 bg-white space-y-6 shadow-md">
              <h2 className="text-lg font-black text-slate-900 border-b-2 border-slate-900 pb-3">
                Order Summary
              </h2>

              {/* Promo Code */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo (WELCOME10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white text-slate-900 focus:border-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
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
                  {promoMessage.type === 'success' && <Check size={14} />}
                  <span>{promoMessage.text}</span>
                </div>
              )}

              <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-bold font-mono text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Freight</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                  <span>Total Amount</span>
                  <span className="font-mono">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-extrabold text-white transition hover:bg-slate-800 shadow-md"
              >
                <span>Proceed to Checkout & Pay</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Booking Callout Card */}
            <div className="border-2 border-slate-900 rounded-2xl p-5 bg-slate-50 space-y-2">
              <p className="text-xs font-extrabold text-slate-900">
                Need an Ergonomic Consultation?
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Schedule a 3D layout planning or virtual posture audit with an expert.
              </p>
              <Link
                href="/bookings"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900 underline underline-offset-4 pt-1 hover:text-indigo-600"
              >
                <span>Book Consultation Session</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import {
  CheckCircle2,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, discount, totalPrice, clearCart } = useCart();

  // Accordion Step State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'whiteglove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex@example.com',
    phone: '(555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvc: '123',
  });

  const getShippingPrice = () => {
    if (shippingMethod === 'express') return 15;
    if (shippingMethod === 'whiteglove') return 49;
    return 0;
  };

  const finalTotal = totalPrice + getShippingPrice();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrd = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(newOrd);
    setIsCompleted(true);
    clearCart();
  };

  if (isCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Order <strong className="text-slate-900 dark:text-white">{orderNumber}</strong> has been received and is being prepared for express delivery.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-4 max-w-lg mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
            Delivery Summary
          </h3>
          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <p>
              <strong>Recipient:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Shipping Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zip}
            </p>
            <p>
              <strong>Estimated Arrival:</strong> 2-3 Business Days
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/dashboard?tab=orders"
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md"
          >
            Track Order in Dashboard
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/cart" className="hover:text-slate-900 dark:hover:text-white">
          Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 dark:text-white">Secure Checkout</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Checkout
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Accordion Checkout Steps matching Figma wireframe */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div
              onClick={() => setActiveStep(1)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 1
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Shipping Address
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {activeStep === 1 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 1 && (
              <div className="p-6 space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl mt-2"
                >
                  Continue to Delivery Method
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Options */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div
              onClick={() => setActiveStep(2)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 2
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Delivery Method
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {activeStep === 2 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 2 && (
              <div className="p-6 space-y-3 animate-in fade-in">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-slate-900 dark:border-white bg-slate-50/80 dark:bg-slate-800/60 ring-1 ring-slate-900'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Standard Ground Freight (2-4 Days)
                      </h4>
                      <p className="text-[11px] text-slate-500">Free delivery nationwide</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-slate-900 dark:border-white bg-slate-50/80 dark:bg-slate-800/60 ring-1 ring-slate-900'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Express 2-Day Air
                      </h4>
                      <p className="text-[11px] text-slate-500">Guaranteed priority dispatch</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">$15.00</span>
                </label>

                <label
                  onClick={() => setShippingMethod('whiteglove')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'whiteglove'
                      ? 'border-slate-900 dark:border-white bg-slate-50/80 dark:bg-slate-800/60 ring-1 ring-slate-900'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-amber-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        White-Glove In-Room Assembly
                      </h4>
                      <p className="text-[11px] text-slate-500">Full setup & packaging removal</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">$49.00</span>
                </label>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl mt-2"
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Payment Options */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div
              onClick={() => setActiveStep(3)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 3
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Payment Method
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {activeStep === 3 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 3 && (
              <div className="p-6 space-y-4 animate-in fade-in">
                {/* Payment Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'paypal'
                        ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'applepay'
                        ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.expDate}
                          onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          CVC Code
                        </label>
                        <input
                          type="password"
                          required
                          value={formData.cvc}
                          onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <p className="text-xs text-slate-500 py-3">
                    You will be redirected to complete payment securely with {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              Items in Order ({cart.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Qty: {item.quantity} • {item.selectedColor}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Selected Delivery</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${getShippingPrice()}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Final Total</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-xl hover:opacity-95 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Place Order (${finalTotal})</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>30-Day Money-Back Guarantee Included</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

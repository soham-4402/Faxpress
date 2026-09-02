'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { ReceiptData } from '@/components/receipt-modal';
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
  Printer,
  FileText,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, discount, totalPrice, clearCart, addUserOrder, setActiveReceipt } = useCart();

  // Accordion Step State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'whiteglove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal' | 'applepay'>('card');
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<ReceiptData | null>(null);

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
    upiId: 'alexrivera@upi',
  });

  const getShippingPrice = () => {
    if (shippingMethod === 'express') return 15;
    if (shippingMethod === 'whiteglove') return 49;
    return 0;
  };

  const shippingFee = getShippingPrice();
  const tax = Math.round((totalPrice + shippingFee) * 0.08 * 100) / 100;
  const finalTotal = totalPrice + shippingFee + tax;

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptId = 'REC-' + Math.floor(10000 + Math.random() * 90000);
    const txnId = 'TXN-' + Date.now().toString().slice(-10);
    const nowStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const paymentLabel =
      paymentMethod === 'card'
        ? `Credit Card (${formData.cardNumber.slice(-4)})`
        : paymentMethod === 'upi'
        ? `UPI / QR (${formData.upiId})`
        : paymentMethod === 'paypal'
        ? 'PayPal Express'
        : 'Apple Pay';

    const newReceipt: ReceiptData = {
      receiptId,
      transactionId: txnId,
      date: nowStr,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      paymentMethod: paymentLabel,
      items: cart.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        variant: i.selectedColor,
      })),
      subtotal,
      discount,
      shippingFee,
      tax,
      total: finalTotal,
      type: 'order',
    };

    setLastReceipt(newReceipt);
    addUserOrder(newReceipt);
    setIsCompleted(true);
    clearCart();
  };

  if (isCompleted && lastReceipt) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Payment Completed • Receipt Generated
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Payment Successful!
          </h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Receipt <strong className="text-slate-900">{lastReceipt.receiptId}</strong> has been generated and sent to {formData.email}.
          </p>
        </div>

        {/* Quick Receipt Summary Card */}
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 text-left space-y-4 max-w-lg mx-auto shadow-lg">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official Receipt</span>
              <span className="text-base font-black text-slate-900">{lastReceipt.receiptId}</span>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              PAID ${lastReceipt.total.toFixed(2)}
            </span>
          </div>

          <div className="text-xs space-y-1.5 text-slate-700">
            <p><strong>Customer:</strong> {lastReceipt.customerName}</p>
            <p><strong>Address:</strong> {lastReceipt.shippingAddress}</p>
            <p><strong>Payment Method:</strong> {lastReceipt.paymentMethod}</p>
            <p><strong>Total Paid:</strong> ${lastReceipt.total.toFixed(2)}</p>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveReceipt(lastReceipt)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Receipt</span>
            </button>
            <button
              onClick={() => {
                setActiveReceipt(lastReceipt);
                setTimeout(() => window.print(), 300);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-100"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/dashboard?tab=orders"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800"
          >
            Track Order in Dashboard
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl border-2 border-slate-900 text-xs font-bold text-slate-900 hover:bg-slate-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-slate-900">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/cart" className="hover:text-slate-900">
          Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900">Checkout & Payment</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Payment & Checkout
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Complete your order payment below to generate an official transaction receipt.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-bit Encrypted Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePayNow} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Accordion Checkout Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="rounded-2xl border-2 border-slate-900 bg-white overflow-hidden shadow-sm">
            <div
              onClick={() => setActiveStep(1)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-200 bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 1
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Customer & Shipping Address
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {activeStep === 1 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 1 && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Email Address (For Receipt)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                >
                  Continue to Delivery Method
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Options */}
          <div className="rounded-2xl border-2 border-slate-900 bg-white overflow-hidden shadow-sm">
            <div
              onClick={() => setActiveStep(2)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-200 bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 2
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Delivery & Shipping Option
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {activeStep === 2 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 2 && (
              <div className="p-6 space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-slate-900 bg-slate-50 font-bold'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-slate-900" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Standard Ground Freight (2-4 Days)
                      </h4>
                      <p className="text-[11px] text-slate-600">Free express delivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-slate-900 bg-slate-50 font-bold'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Express 2-Day Air Priority
                      </h4>
                      <p className="text-[11px] text-slate-600">Guaranteed expedited dispatch</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">$15.00</span>
                </label>

                <label
                  onClick={() => setShippingMethod('whiteglove')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'whiteglove'
                      ? 'border-slate-900 bg-slate-50 font-bold'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-amber-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        White-Glove In-Room Assembly
                      </h4>
                      <p className="text-[11px] text-slate-600">Full unboxing, assembly & cleanup</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">$49.00</span>
                </label>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl mt-2 hover:bg-slate-800"
                >
                  Continue to Payment Selection
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Payment Options & Pay Now Action */}
          <div className="rounded-2xl border-2 border-slate-900 bg-white overflow-hidden shadow-sm">
            <div
              onClick={() => setActiveStep(3)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-200 bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    activeStep === 3
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Payment Method Details
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {activeStep === 3 ? 'Editing' : 'Change'}
              </span>
            </div>

            {activeStep === 3 && (
              <div className="p-6 space-y-4">
                {/* Payment Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'upi'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'paypal'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'applepay'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.expDate}
                          onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          CVC Code
                        </label>
                        <input
                          type="password"
                          required
                          value={formData.cvc}
                          onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-900">
                      Enter UPI Virtual Payment Address (VPA)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900 font-mono"
                    />
                    <p className="text-[11px] text-slate-500">Scan QR or enter UPI ID (Google Pay, PhonePe, Paytm)</p>
                  </div>
                )}

                {(paymentMethod === 'paypal' || paymentMethod === 'applepay') && (
                  <p className="text-xs text-slate-600 py-3 font-medium">
                    Payment will be processed instantly via {paymentMethod === 'paypal' ? 'PayPal Express' : 'Apple Pay'} upon clicking Pay Now below.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Instant "Pay Now" Button */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-6 shadow-md">
            <h2 className="text-base font-black text-slate-900 pb-3 border-b-2 border-slate-900">
              Payment Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Qty: {item.quantity} • {item.selectedColor}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-3 border-t-2 border-slate-900">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold font-mono">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold font-mono">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-bold font-mono">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                <span>Total Amount Due</span>
                <span className="font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-slate-900 text-white font-black text-sm shadow-xl hover:bg-slate-800 transition-all active:scale-[0.99]"
            >
              <Lock className="w-4 h-4" />
              <span>Pay Now (${finalTotal.toFixed(2)}) & Generate Receipt</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Downloadable & Printable Receipt</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BOOKING_PACKAGES, BookingPackage } from '@/data/mock-data';
import { useCart } from '@/context/cart-context';
import { ReceiptData } from '@/components/receipt-modal';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Printer,
  FileText,
  CreditCard,
} from 'lucide-react';

export default function BookingsPage() {
  const { addUserOrder, setActiveReceipt } = useCart();

  const [selectedPackage, setSelectedPackage] = useState<BookingPackage>(BOOKING_PACKAGES[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-10');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState('Alex Rivera');
  const [clientEmail, setClientEmail] = useState('alex@example.com');
  const [clientPhone, setClientPhone] = useState('(555) 234-5678');
  const [notes, setNotes] = useState('Focusing on ergonomic posture alignment for 8+ hour remote desk sessions.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');
  const [isBooked, setIsBooked] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<ReceiptData | null>(null);

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
  ];

  const calendarDays = [
    { day: 7, dateStr: '2026-09-07', available: true },
    { day: 8, dateStr: '2026-09-08', available: true },
    { day: 9, dateStr: '2026-09-09', available: false },
    { day: 10, dateStr: '2026-09-10', available: true },
    { day: 11, dateStr: '2026-09-11', available: true },
    { day: 12, dateStr: '2026-09-12', available: true },
    { day: 14, dateStr: '2026-09-14', available: true },
    { day: 15, dateStr: '2026-09-15', available: true },
  ];

  const handleConfirmAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptId = 'BKG-REC-' + Math.floor(1000 + Math.random() * 9000);
    const txnId = 'TXN-' + Date.now().toString().slice(-10);
    const nowStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const tax = Math.round(selectedPackage.price * 0.08 * 100) / 100;
    const finalTotal = selectedPackage.price + tax;

    const bookingReceipt: ReceiptData = {
      receiptId,
      transactionId: txnId,
      date: nowStr,
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      paymentMethod: paymentMethod === 'card' ? 'Credit Card (ending in 4242)' : paymentMethod === 'upi' ? 'UPI / QR Payment' : 'PayPal',
      items: [
        {
          name: `${selectedPackage.name} (${selectedPackage.duration})`,
          quantity: 1,
          price: selectedPackage.price,
          variant: `Scheduled for ${selectedDate} at ${selectedTimeSlot}`,
        },
      ],
      subtotal: selectedPackage.price,
      discount: 0,
      shippingFee: 0,
      tax,
      total: finalTotal,
      type: 'booking',
    };

    setLastReceipt(bookingReceipt);
    addUserOrder(bookingReceipt);
    setIsBooked(true);
  };

  if (isBooked && lastReceipt) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in-95 duration-300 bg-white text-slate-900">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Booking & Payment Completed
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Consultation Booking Confirmed!
          </h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Receipt <strong className="text-slate-900">{lastReceipt.receiptId}</strong> generated. Confirmation email sent to {clientEmail}.
          </p>
        </div>

        {/* Receipt Card */}
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
            <p><strong>Package:</strong> {selectedPackage.name}</p>
            <p><strong>Date & Time:</strong> {selectedDate} at {selectedTimeSlot}</p>
            <p><strong>Client:</strong> {clientName}</p>
            <p><strong>Payment Method:</strong> {lastReceipt.paymentMethod}</p>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveReceipt(lastReceipt)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md"
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
            href="/dashboard?tab=bookings"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800"
          >
            Manage Bookings in Dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border-2 border-slate-900 text-xs font-bold text-slate-900 hover:bg-slate-100"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white text-slate-900">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-slate-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Ergonomic Workspace Consultations
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Book & Pay for Your Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Select a package below, pick an available date & time slot, enter payment details, and get an instant official receipt.
        </p>
      </div>

      {/* Step 1: Package Selection Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-slate-900">
          1. Choose Your Consultation Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOOKING_PACKAGES.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 shadow-xl scale-[1.02]'
                    : 'border-slate-300 bg-white hover:border-slate-900'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 bg-slate-900 text-white p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}

                <div>
                  <span className="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider">
                    {pkg.duration}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
                    ${pkg.price}.00
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <ul className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2 & 3: Calendar, Details & Instant Pay Now */}
      <form onSubmit={handleConfirmAndPay} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-base font-black text-slate-900">
            2. Select Date & Available Time Slot
          </h2>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 shadow-sm space-y-6">
            {/* Month Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-slate-900" />
                <span className="text-sm font-black text-slate-900">
                  September 2026
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" className="p-1 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button type="button" className="p-1 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day} className="font-bold text-slate-500 text-[11px] uppercase pb-2">
                  {day}
                </span>
              ))}
              {calendarDays.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    disabled={!d.available}
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md scale-105'
                        : d.available
                        ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        : 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
                    }`}
                  >
                    {d.day}
                  </button>
                );
              })}
            </div>

            {/* Time Slot Picker Grid */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-900" />
                <span>Available Time Slots for {selectedDate}:</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Client Details & Payment Action */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-base font-black text-slate-900">
            3. Client Details & Payment
          </h2>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-4 shadow-md">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Email Address (For Receipt)
              </label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
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
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 rounded-xl text-xs font-bold border-2 ${
                    paymentMethod === 'card' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 rounded-xl text-xs font-bold border-2 ${
                    paymentMethod === 'upi' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  UPI/QR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 rounded-xl text-xs font-bold border-2 ${
                    paymentMethod === 'paypal' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  PayPal
                </button>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-900 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Selected Package:</span>
                <span className="font-bold text-slate-900">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax (8%):</span>
                <span className="font-mono font-bold">${(selectedPackage.price * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Fee:</span>
                <span className="font-mono">${(selectedPackage.price * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-slate-900 text-white font-black text-sm shadow-lg hover:bg-slate-800 transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Pay Now (${(selectedPackage.price * 1.08).toFixed(2)}) & Generate Receipt</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

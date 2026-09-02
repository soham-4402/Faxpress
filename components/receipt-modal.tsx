'use client';

import React from 'react';
import { X, Printer, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

export interface ReceiptData {
  receiptId: string;
  transactionId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  paymentMethod: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  type: 'order' | 'booking';
}

interface ReceiptModalProps {
  receipt: ReceiptData | null;
  onClose: () => void;
}

export function ReceiptModal({ receipt, onClose }: ReceiptModalProps) {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl border-2 border-slate-900 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 print:max-w-none print:shadow-none print:border-none print:p-0">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-black rounded-lg hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Receipt Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mb-1">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Payment Successful • Official Receipt
          </span>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            STRATAVAULT
          </h2>
          <p className="text-xs text-slate-600">
            Workspace Design & Ergonomic Equipment • Transaction Receipt
          </p>
        </div>

        {/* Receipt Info Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 font-medium block">Receipt ID</span>
            <span className="font-bold text-slate-900">{receipt.receiptId}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Transaction Ref</span>
            <span className="font-mono font-bold text-slate-900">{receipt.transactionId}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Date & Time</span>
            <span className="font-bold text-slate-900">{receipt.date}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Payment Status</span>
            <span className="font-bold text-emerald-600 uppercase">PAID</span>
          </div>
        </div>

        {/* Billed To Details */}
        <div className="py-4 border-b border-slate-200 text-xs space-y-1">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Customer Details
          </span>
          <p className="font-bold text-slate-900 text-sm">{receipt.customerName}</p>
          <p className="text-slate-600">{receipt.customerEmail} {receipt.customerPhone ? `• ${receipt.customerPhone}` : ''}</p>
          {receipt.shippingAddress && (
            <p className="text-slate-600">
              <strong>Address:</strong> {receipt.shippingAddress}
            </p>
          )}
          <p className="text-slate-600">
            <strong>Method Paid:</strong> {receipt.paymentMethod}
          </p>
        </div>

        {/* Itemized Table */}
        <div className="py-4 space-y-3">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Itemized Order Breakdown
          </span>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-bold text-[10px]">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receipt.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-medium text-slate-900">
                    {item.name}
                    {item.variant && (
                      <span className="block text-[10px] text-slate-500">
                        Variant: {item.variant}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-center font-bold">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono">${item.price.toFixed(2)}</td>
                  <td className="py-2.5 text-right font-bold font-mono">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Calculation */}
        <div className="pt-4 border-t-2 border-slate-900 space-y-1.5 text-xs text-slate-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono font-bold">${receipt.subtotal.toFixed(2)}</span>
          </div>
          {receipt.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Discount / Promo</span>
              <span className="font-mono">-${receipt.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping / Delivery</span>
            <span className="font-mono">{receipt.shippingFee === 0 ? 'FREE' : `$${receipt.shippingFee.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Sales Tax (8%)</span>
            <span className="font-mono">${receipt.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
            <span>Total Amount Paid</span>
            <span className="font-mono">${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer Actions (Hidden on Print) */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Transaction • 100% Tax Compliant</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

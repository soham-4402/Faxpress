'use client';

import React from 'react';
import { useCart } from '@/context/cart-context';
import { ReceiptModal } from '@/components/receipt-modal';

export function GlobalReceiptModal() {
  const { activeReceipt, setActiveReceipt } = useCart();
  return (
    <ReceiptModal
      receipt={activeReceipt}
      onClose={() => setActiveReceipt(null)}
    />
  );
}

export default GlobalReceiptModal;

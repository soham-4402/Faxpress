"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

const demoItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Package",
    price: 2499,
    quantity: 1,
    image: "/images/product1.jpg",
    variant: "Premium",
  },
  {
    id: "2",
    name: "Standard Package",
    price: 1499,
    quantity: 1,
    image: "/images/product2.jpg",
    variant: "Standard",
  },
];

export default function CartDrawer({
  isOpen,
  onClose,
  items = demoItems,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      onRemove?.(item.id);
      return;
    }

    onUpdateQuantity?.(item.id, item.quantity - 1);
  };

  const handleIncrease = (item: CartItem) => {
    onUpdateQuantity?.(item.id, item.quantity + 1);
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-[420px] flex-col bg-white text-black shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={21} strokeWidth={1.8} />

            <div>
              <h2 className="text-lg font-semibold">
                Shopping Bag
              </h2>

              <p className="text-xs text-gray-500">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={26} strokeWidth={1.5} />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Your cart is empty
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              Add some products to your cart and they will appear here.
            </p>

            <Link
              href="/products"
              onClick={onClose}
              className="mt-6 flex h-11 items-center gap-2 rounded-lg bg-black px-6 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Browse Products
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-100 pb-6"
                  >
                    {/* Image */}
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag
                            size={20}
                            className="text-gray-400"
                          />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-medium">
                            {item.name}
                          </h3>

                          {item.variant && (
                            <p className="mt-1 text-xs text-gray-500">
                              {item.variant}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove?.(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-gray-400 transition hover:text-black"
                        >
                          <Trash2 size={16} strokeWidth={1.7} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        {/* Quantity */}
                        <div className="flex h-8 items-center rounded-md border border-gray-200">
                          <button
                            type="button"
                            onClick={() => handleDecrease(item)}
                            aria-label="Decrease quantity"
                            className="flex h-full w-8 items-center justify-center transition hover:bg-gray-50"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="w-7 text-center text-xs font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleIncrease(item)}
                            aria-label="Increase quantity"
                            className="flex h-full w-8 items-center justify-center transition hover:bg-gray-50"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-sm font-semibold">
                          ₹
                          {(item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-base font-semibold">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Taxes and shipping calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={onClose}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Checkout
                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full py-2 text-xs font-medium text-gray-500 underline underline-offset-4 transition hover:text-black"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

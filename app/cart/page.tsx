"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* -----------------------------
     Empty Cart
  ------------------------------ */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <ShoppingBag size={26} />
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
              Your cart is empty
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              You haven't added anything to your cart yet.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex h-12 items-center gap-2 bg-black px-7 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      </main>
    );
  }

  /* -----------------------------
     Cart
  ------------------------------ */

  return (
    <main className="min-h-screen bg-white text-black">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Header */}
        <div className="border-b border-gray-200 pb-8">

          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex items-end justify-between">

            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                Shopping Bag
              </p>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                Your Cart
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              {cartCount}{" "}
              {cartCount === 1 ? "item" : "items"}
            </p>

          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* Cart Items */}
          <section className="lg:col-span-2">

            <div className="border-t border-gray-200">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 border-b border-gray-200 py-6"
                >

                  {/* Product Image */}
                  <Link
                    href={`/products/${item.id}`}
                    className="h-32 w-32 shrink-0 overflow-hidden bg-gray-100 sm:h-40 sm:w-40"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </Link>

                        {item.description && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}

                        <p className="mt-2 text-sm text-gray-500">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                        className="text-gray-400 transition hover:text-black"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    {/* Bottom Row */}
                    <div className="mt-5 flex items-center justify-between">

                      {/* Quantity */}
                      <div className="flex h-10 items-center border border-gray-200">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label="Decrease quantity"
                          className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="flex h-full w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label="Increase quantity"
                          className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      {/* Item Total */}
                      <p className="font-medium">
                        ₹
                        {(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Clear Cart */}
            <button
              type="button"
              onClick={clearCart}
              className="mt-5 text-sm text-gray-500 underline underline-offset-4 transition hover:text-black"
            >
              Clear cart
            </button>

          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="border border-gray-200 p-6">

              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-gray-200 pb-6">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Items
                  </span>

                  <span>
                    {cartCount}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>
                </div>

              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-6">

                <span className="font-medium">
                  Total
                </span>

                <span className="text-xl font-semibold">
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* Checkout */}
              <Link
                href="/checkout"
                className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
                <ArrowRight size={17} />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Taxes and final payment details will be
                calculated at checkout.
              </p>

            </div>

            {/* Booking */}
            <div className="mt-4 border border-gray-200 p-5">

              <p className="text-sm font-medium">
                Need a booking?
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Select your preferred date and time before
                completing your order.
              </p>

              <Link
                href="/booking"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
              >
                Make a Booking
                <ArrowRight size={15} />
              </Link>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}

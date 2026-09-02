"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Package,
  ShoppingBag,
  User,
  LogOut,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function DashboardPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Account
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Cart */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Cart Items
              </p>

              <ShoppingBag size={20} />
            </div>

            <p className="mt-5 text-3xl font-semibold">
              {cartCount}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Items currently in your cart
            </p>
          </div>

          {/* Cart Value */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Cart Value
              </p>

              <Package size={20} />
            </div>

            <p className="mt-5 text-3xl font-semibold">
              ₹{cartTotal.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Current cart subtotal
            </p>
          </div>

          {/* Bookings */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Bookings
              </p>

              <CalendarDays size={20} />
            </div>

            <p className="mt-5 text-3xl font-semibold">
              0
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Upcoming bookings
            </p>
          </div>

        </section>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart */}
          <section className="lg:col-span-2">

            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500">
                  Shopping
                </p>

                <h2 className="mt-1 text-2xl font-semibold">
                  Your cart
                </h2>
              </div>

              <Link
                href="/cart"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                View cart
                <ArrowRight size={15} />
              </Link>
            </div>

            {cartItems.length === 0 ? (
              /* Empty cart */
              <div className="border border-dashed border-gray-300 p-12 text-center">

                <ShoppingBag
                  size={28}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 text-lg font-medium">
                  Your cart is empty
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Add products to your cart and they will appear here.
                </p>

                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Start Shopping
                  <ArrowRight size={16} />
                </Link>

              </div>
            ) : (
              /* Cart Items */
              <div className="border-t border-gray-200">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-200 py-5"
                  >

                    {/* Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden bg-gray-100 sm:h-28 sm:w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                      <div className="flex justify-between gap-4">

                        <div>
                          <Link
                            href={`/products/${item.id}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {item.name}
                          </Link>

                          {item.description && (
                            <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                              {item.description}
                            </p>
                          )}

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{item.price.toLocaleString("en-IN")}
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
                          <Trash2 size={17} />
                        </button>

                      </div>

                      {/* Quantity + Total */}
                      <div className="mt-3 flex items-center justify-between">

                        <div className="flex h-8 items-center border border-gray-200">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-full w-8 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="flex h-full w-8 items-center justify-center border-x border-gray-200 text-xs font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-full w-8 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>

                        </div>

                        <p className="text-sm font-medium">
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
            )}

          </section>

          {/* Profile */}
          <section>

            <div className="mb-5">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Account
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Profile
              </h2>
            </div>

            <div className="border border-gray-200 p-6">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                <User size={24} />
              </div>

              <h3 className="mt-5 font-medium">
                Your Account
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Sign in to view your profile details.
              </p>

              <Link
                href="/signin"
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 border border-gray-300 text-sm font-medium transition hover:border-black"
              >
                Sign in
                <ArrowRight size={15} />
              </Link>

            </div>

          </section>
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <section className="mt-10 border border-gray-200 p-6">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Cart subtotal
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/cart"
                  className="flex h-11 items-center justify-center border border-gray-300 px-6 text-sm font-medium transition hover:border-black"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  className="flex h-11 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

          </section>
        )}

        {/* Quick Actions */}
        <section className="mt-12 border-t border-gray-200 pt-10">

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Quick Actions
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <Link
              href="/products"
              className="flex items-center justify-between border border-gray-200 p-5 transition hover:border-black"
            >
              <span className="text-sm font-medium">
                Continue Shopping
              </span>

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/booking"
              className="flex items-center justify-between border border-gray-200 p-5 transition hover:border-black"
            >
              <span className="text-sm font-medium">
                Make a Booking
              </span>

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-between border border-gray-200 p-5 transition hover:border-black"
            >
              <span className="text-sm font-medium">
                Open Cart
              </span>

              <ArrowRight size={17} />
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}

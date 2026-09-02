"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-[-0.04em] text-black"
        >
          YOURBRAND
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Shop
          </Link>

          <Link
            href="/booking"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Booking
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            About
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <button
            type="button"
            aria-label="Search"
            className="text-black transition-opacity hover:opacity-60"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <Link
            href="/signin"
            aria-label="Account"
            className="text-black transition-opacity hover:opacity-60"
          >
            <User size={20} strokeWidth={1.8} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative text-black transition-opacity hover:opacity-60"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {/* Cart count */}
            <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-black md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={24} strokeWidth={1.8} />
          ) : (
            <Menu size={24} strokeWidth={1.8} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-gray-100 py-4 text-sm font-medium text-black"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-gray-100 py-4 text-sm font-medium text-black"
            >
              Shop
            </Link>

            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-gray-100 py-4 text-sm font-medium text-black"
            >
              Booking
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-gray-100 py-4 text-sm font-medium text-black"
            >
              About
            </Link>

            <div className="flex items-center gap-6 py-5">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User size={18} />
                Account
              </Link>

              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <ShoppingBag size={18} />
                Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


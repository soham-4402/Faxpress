'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { UserMenuDropdown } from './user-menu-dropdown';
import { PRODUCTS } from '@/data/mock-data';
import {
  Search,
  ShoppingBag,
  Heart,
  Calendar,
  Layers,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Book Consultation', href: '/bookings' },
    { name: 'Dashboard & Receipts', href: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-900 bg-white text-slate-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                STRATAVAULT
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Workspace & Design
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar Input */}
        <div className="hidden lg:block relative flex-1 max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search chairs, standing desks, lighting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:border-slate-900 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Popover */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-slate-900 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No products found for "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={`/catalog/${product.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover bg-slate-100 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{product.category}</p>
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-900">
                        ${product.price}
                      </span>
                    </Link>
                  ))}
                  {searchResults.length > 4 && (
                    <Link
                      href={`/catalog?search=${encodeURIComponent(searchQuery)}`}
                      className="flex items-center justify-center gap-1.5 p-2 text-xs font-bold text-slate-900 hover:bg-slate-100 rounded-lg transition-colors mt-1"
                    >
                      <span>View all {searchResults.length} items</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls & Profile Menu */}
        <div className="flex items-center gap-3">
          {/* Wishlist Link */}
          <Link
            href="/dashboard?tab=wishlist"
            className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="bg-slate-900 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Menu Dropdown */}
          <UserMenuDropdown />

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-slate-900 bg-white p-4 space-y-3">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white text-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  pathname === link.href
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

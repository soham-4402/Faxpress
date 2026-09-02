'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import {
  User as UserIcon,
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export function UserMenuDropdown() {
  const { user, logout, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => openAuthModal('signin')}
        className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <UserIcon className="w-4 h-4" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 transition-all shadow-xs focus:outline-hidden"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center">
            {user.name.charAt(0)}
          </div>
        )}
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate hidden sm:inline-block">
          {user.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu matching Figma Header Spec */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200/80 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Profile Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard?tab=orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-slate-500" />
              <span>Orders</span>
            </Link>

            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Bookings</span>
            </Link>

            <Link
              href="/dashboard?tab=settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Account Settings</span>
            </Link>

            <Link
              href="/admin/products"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Product Admin</span>
            </Link>
          </div>

          {/* Footer Action */}
          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

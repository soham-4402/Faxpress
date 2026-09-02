'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, Award, ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-white pt-16 pb-12 border-t-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-white shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Free Express Delivery
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                On all orders over $99 nationwide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-white shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                30-Day Risk Free Trial
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Full refunds with free return pickup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-white shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                5-Year Warranty
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Commercial grade durability guarantee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-white shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                24/7 Expert Support
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ergonomic & setup advice anytime
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white text-slate-900 flex items-center justify-center font-black text-base">
                S
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                STRATAVAULT
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Crafting premium ergonomic seating, motorized standing desks, and architectural lighting designed to elevate productivity and long-term health.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                Subscribe for workspace design insights & exclusive drops:
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>You're subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Workspace Shop
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/catalog?category=chairs" className="hover:text-white transition-colors">
                  Ergonomic Chairs
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=desks" className="hover:text-white transition-colors">
                  Standing Desks
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=lighting" className="hover:text-white transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=decor" className="hover:text-white transition-colors">
                  Acoustics & Storage
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=accessories" className="hover:text-white transition-colors">
                  Monitor Arms & Pads
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Consultations
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/bookings" className="hover:text-white transition-colors">
                  Virtual Ergonomic Audit
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-white transition-colors">
                  3D Space Planning
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-white transition-colors">
                  Corporate Floor Setup
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Manage My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Account & Admin
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=orders" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-white transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="hover:text-white transition-colors">
                  Product Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 STRATAVAULT Inc. Built pixel-accurate from Figma wireframe specs.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

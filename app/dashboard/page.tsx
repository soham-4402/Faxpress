'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { INITIAL_ORDERS, INITIAL_BOOKINGS, PRODUCTS } from '@/data/mock-data';
import { ProductCard } from '@/components/product-card';
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  Settings,
  Heart,
  ShieldAlert,
  PackageCheck,
  Clock,
  ChevronRight,
  User,
  Mail,
  Lock,
  Save,
  CheckCircle2,
  FileText,
  Printer,
} from 'lucide-react';

export default function DashboardPage({ searchParams }: { searchParams?: Promise<{ tab?: string }> }) {
  const resolvedSearchParams = searchParams ? use(searchParams) : {};
  const initialTab = resolvedSearchParams?.tab || 'overview';

  const { user } = useAuth();
  const { wishlist, userOrders, setActiveReceipt } = useCart();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [orders] = useState(INITIAL_ORDERS);
  const [bookings] = useState(INITIAL_BOOKINGS);

  // Settings State
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-slate-900">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user?.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              User Dashboard
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome back, {user?.name || 'Alex Rivera'}
            </h1>
            <p className="text-xs text-slate-300">{user?.email || 'alex@example.com'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Product Admin Panel</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-3 rounded-2xl bg-white border-2 border-slate-900 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>My Orders & Receipts ({userOrders.length || orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Items ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-900 space-y-1 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
                    <ShoppingBag className="w-5 h-5 text-slate-900" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{userOrders.length || orders.length}</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Latest Order Completed</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border-2 border-slate-900 space-y-1 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Active Bookings</span>
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
                  <p className="text-[10px] text-slate-600 font-semibold">Virtual Audit Session</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border-2 border-slate-900 space-y-1 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Payments</span>
                    <PackageCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 font-mono">
                    ${userOrders.reduce((sum, o) => sum + o.receipt.total, 0) || orders.reduce((sum, o) => sum + o.total, 0)}
                  </p>
                  <p className="text-[10px] text-slate-600 font-semibold">Paid Receipts Available</p>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                  <h3 className="text-base font-black text-slate-900">
                    Recent Transactions & Receipts
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-slate-900 hover:underline"
                  >
                    View All Receipts
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Receipt / Order ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Total Paid</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {userOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{ord.id}</td>
                          <td className="p-3 text-slate-600">{ord.receipt.date}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              PAID
                            </span>
                          </td>
                          <td className="p-3 text-right font-black font-mono text-slate-900">
                            ${ord.receipt.total.toFixed(2)}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setActiveReceipt(ord.receipt)}
                              className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 ml-auto"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS & RECEIPT ARCHIVE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-slate-900">Official Payment Receipts Archive</h2>
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-black text-slate-900">
                            Receipt #{ord.receipt.receiptId}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            OFFICIAL RECEIPT • PAID
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Date: {ord.receipt.date} • Ref: {ord.receipt.transactionId}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black font-mono text-slate-900">
                          ${ord.receipt.total.toFixed(2)}
                        </span>
                        <button
                          onClick={() => setActiveReceipt(ord.receipt)}
                          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Receipt</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.receipt.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs py-1">
                          <span className="font-bold text-slate-900">
                            {item.name} {item.variant ? `(${item.variant})` : ''} x {item.quantity}
                          </span>
                          <span className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">
                  Consultation Appointments
                </h2>
                <Link
                  href="/bookings"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Book New Consultation
                </Link>
              </div>

              <div className="space-y-4">
                {bookings.map((bkg) => (
                  <div
                    key={bkg.id}
                    className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-900" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {bkg.packageName}
                        </h3>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {bkg.status} • Fee Paid (${bkg.price})
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-700">
                      <p>
                        <strong>Scheduled Date & Time:</strong> {bkg.date} at {bkg.timeSlot}
                      </p>
                      <p>
                        <strong>Client:</strong> {bkg.clientName}
                      </p>
                      <p>
                        <strong>Notes:</strong> {bkg.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED ITEMS / WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-slate-900">
                Saved Items ({wishlistedProducts.length})
              </h2>

              {wishlistedProducts.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-500 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                  No saved products yet. Click the heart icon on any product card to save it here!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">
                Account Settings
              </h2>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Account profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-slate-900 bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:bg-slate-800"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

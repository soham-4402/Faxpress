'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { X, Mail, Phone, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab, login } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginMethod === 'email' ? email : phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl mb-6">
          <button
            onClick={() => setAuthModalTab('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authModalTab === 'signin'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalTab('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authModalTab === 'signup'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {authModalTab === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {authModalTab === 'signin'
              ? 'Sign in via Email, Phone Number, or Google'
              : 'Join Stratavault to unlock workspace consultations & orders'}
          </p>
        </div>

        {/* Email vs Phone Toggle */}
        <div className="flex items-center justify-center gap-4 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              loginMethod === 'email'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Address</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
              loginMethod === 'phone'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Phone Number</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalTab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
            </div>
          )}

          {loginMethod === 'email' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
            </div>
          </div>

          {authModalTab === 'signin' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-md border-slate-300 dark:border-slate-700 text-slate-900 focus:ring-slate-900"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="font-medium text-slate-900 dark:text-white hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:opacity-95 transition-all mt-2"
          >
            <span>{authModalTab === 'signin' ? `Sign In with ${loginMethod === 'email' ? 'Email' : 'Phone'}` : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Google Only Option */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] text-center text-slate-400 uppercase font-semibold tracking-wider mb-3">
            Or Sign In With Google
          </p>
          <button
            type="button"
            onClick={() => login('google.user@example.com')}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

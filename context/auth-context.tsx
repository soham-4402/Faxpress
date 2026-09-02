'use client';

import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'signin' | 'signup';
  setAuthModalTab: (tab: 'signin' | 'signup') => void;
  openAuthModal: (tab?: 'signin' | 'signup') => void;
  login: (identifier: string) => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '+1 (555) 234-5678',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const login = (identifier: string) => {
    const isEmail = identifier.includes('@');
    const nameStr = isEmail ? identifier.split('@')[0] : 'User (' + identifier.slice(-4) + ')';
    const formattedName = nameStr.charAt(0).toUpperCase() + nameStr.slice(1);
    setUser({
      id: 'u_' + Date.now(),
      name: formattedName || 'Alex Rivera',
      email: isEmail ? identifier : 'user@example.com',
      phone: !isEmail ? identifier : '+1 (555) 234-5678',
      role: identifier.includes('admin') ? 'admin' : 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    });
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string) => {
    login(email);
  };

  const loginWithPhone = async (phone: string) => {
    login(phone);
  };

  const loginWithGoogle = async () => {
    login('google.user@example.com');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        login,
        loginWithEmail,
        loginWithPhone,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

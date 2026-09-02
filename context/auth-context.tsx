"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* --------------------------------
   Types
--------------------------------- */

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<void>;

  loginWithGoogle: () => Promise<void>;

  loginWithPhone: (
    phone: string
  ) => Promise<void>;

  logout: () => void;

  setUser: (user: User | null) => void;
}

/* --------------------------------
   Context
--------------------------------- */

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

/* --------------------------------
   Provider
--------------------------------- */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  /* --------------------------------
     Load saved user
  --------------------------------- */

  useEffect(() => {
    try {
      const savedUser =
        localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* --------------------------------
     Save user
  --------------------------------- */

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [user, isLoading]);

  /* --------------------------------
     Email Login
  --------------------------------- */

  const loginWithEmail = async (
    email: string,
    password: string
  ) => {
    if (!email || !password) {
      throw new Error(
        "Email and password are required"
      );
    }

    /*
      Backend will eventually be:

      POST /api/auth/login

      {
        email,
        password
      }
    */

    // Temporary demo authentication
    const demoUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
    };

    setUser(demoUser);
  };

  /* --------------------------------
     Google Login
  --------------------------------- */

  const loginWithGoogle = async () => {
    /*
      Connect Google OAuth/Auth.js here.

      Example:

      signIn("google", {
        callbackUrl: "/dashboard",
      });
    */

    console.log(
      "Google authentication requested"
    );
  };

  /* --------------------------------
     Phone Login
  --------------------------------- */

  const loginWithPhone = async (
    phone: string
  ) => {
    if (!phone) {
      throw new Error(
        "Phone number is required"
      );
    }

    /*
      Step 1:

      POST /api/auth/send-otp

      {
        phone
      }

      Step 2:

      User enters OTP

      Step 3:

      POST /api/auth/verify-otp

      {
        phone,
        otp
      }
    */

    console.log(
      "Phone authentication requested:",
      phone
    );
  };

  /* --------------------------------
     Logout
  --------------------------------- */

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");

    /*
      When Auth.js is connected:

      await signOut({
        callbackUrl: "/",
      });
    */
  };

  /* --------------------------------
     Context value
  --------------------------------- */

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,

    loginWithEmail,
    loginWithGoogle,
    loginWithPhone,

    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* --------------------------------
   Hook
--------------------------------- */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

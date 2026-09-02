"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect this to your authentication API later
    console.log({ email, password });
  };

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block text-2xl font-bold tracking-tight"
          >
            ZIGBEE
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 transition hover:text-black"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Sign in

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Phone Sign In */}
        <Link
          href="/signin/phone"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-black bg-white text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Continue with phone number
        </Link>

        {/* Sign Up */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-black underline underline-offset-4"
          >
            Create account
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-8 text-center text-xs leading-5 text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}

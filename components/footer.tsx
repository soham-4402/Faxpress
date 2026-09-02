import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              YOURBRAND
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              Simple. Premium. Designed for you.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <Link
              href="/products"
              className="transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              href="/about"
              className="transition hover:text-black"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-black"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-black"
            >
              Privacy
            </Link>
          </div>

          {/* Social / Contact Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              aria-label="Website"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-black hover:text-white"
            >
              <Globe size={16} />
            </Link>

            <Link
              href="mailto:hello@example.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-black hover:text-white"
            >
              <Mail size={16} />
            </Link>

            <Link
              href="#"
              aria-label="Contact"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-black hover:text-white"
            >
              <MessageCircle size={16} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} YOURBRAND. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

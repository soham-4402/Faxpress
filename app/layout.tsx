import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { AuthModal } from '@/components/auth-modal';
import { GlobalReceiptModal } from '@/components/global-receipt-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'STRATAVAULT | Modern Workspace & Ergonomic Design',
  description: 'Pixel-accurate Figma wireframe ecommerce platform with white background, booking calendar, cart drawer, payment checkout, and official receipt generator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-slate-900">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-slate-900 selection:text-white`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full bg-white">{children}</main>
            <CartDrawer />
            <AuthModal />
            <GlobalReceiptModal />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

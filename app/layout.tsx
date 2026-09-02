
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOURBRAND",
  description: "Simple. Premium. Designed for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}

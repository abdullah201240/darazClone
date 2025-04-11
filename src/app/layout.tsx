import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileFooterNav from '@/components/MobileFooterNav';
import Layout from '@/components/layout';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daraz Clone | Online Shopping",
  description: "A clone of Daraz e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <CartProvider>
          <Layout>
            <main className="min-h-screen pt-16 pb-20 md:pb-0">
              {children}
            </main>
            <MobileFooterNav />
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}
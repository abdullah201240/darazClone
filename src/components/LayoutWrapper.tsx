'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';
import MobileFooterNav from '@/components/MobileFooterNav';
import Layout from '@/components/layout';
import { CartProvider } from '@/context/CartContext';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const isAdminRoute = segment === 'admin';

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Layout>
        <main className="min-h-screen pt-16 pb-20 md:pb-0">
          {children}
        </main>
        <MobileFooterNav />
      </Layout>
    </CartProvider>
  );
}

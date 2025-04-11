'use client';

import { Home, Search, ShoppingCart, Grid, User } from 'lucide-react';
import Link from 'next/link';

export default function MobileFooterNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center text-xs">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Link href="/categories" className="flex flex-col items-center text-xs">
          <Grid className="h-5 w-5" />
          <span>Categories</span>
        </Link>
        
        <Link href="/search" className="flex flex-col items-center text-xs">
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Link>
        
        <Link href="/cart" className="flex flex-col items-center text-xs">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
        </Link>
        
        <Link href="/account" className="flex flex-col items-center text-xs">
          <User className="h-5 w-5" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}

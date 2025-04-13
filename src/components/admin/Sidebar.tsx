'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Package, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/admin') return pathname === path
    return pathname.startsWith(path)
  }

  const menuItems = [
    { 
      href: '/admin', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      href: '/admin/orders', 
      label: 'Orders', 
      icon: <ShoppingCart className="w-5 h-5" /> 
    },
    { 
      href: '/admin/products', 
      label: 'Products', 
      icon: <Package className="w-5 h-5" /> 
    },
    { 
      href: '/admin/users', 
      label: 'Users', 
      icon: <Users className="w-5 h-5" /> 
    },
  ]

  return (
    <div className="flex h-full">
      {/* Mobile Navbar */}
      <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 lg:hidden">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100"
            >
              {mobileSidebarOpen ? 
                <X className="w-6 h-6" /> : 
                <Menu className="w-6 h-6" />
              }
            </button>
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-semibold">Admin</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-16 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <div className="px-4 py-4 mb-2 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          </div>
          
          <ul className="space-y-1">
            {menuItems.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-colors ${isActive(href)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-3 text-current">
                    {icon}
                  </span>
                  <span>{label}</span>
                  {isActive(href) && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}

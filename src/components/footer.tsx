'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

type FooterLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export default function Footer() {
  const footerLinks = [
    {
      title: 'Customer Care',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'How to Buy', href: '/how-to-buy' },
        { name: 'Returns & Refunds', href: '/returns' },
        { name: 'Contact Us', href: '/contact' }
      ] as FooterLink[]
    },
    {
      title: 'Daraz',
      links: [
        { name: 'About Daraz', href: '/about' },
        { name: 'Daraz Cares', href: '/cares' },
        { name: 'Digital Payments', href: '/payments' },
        { name: 'Daraz Exclusives', href: '/exclusives' }
      ] as FooterLink[]
    },
    {
      title: 'Payment Methods',
      links: [
        { name: 'Cash on Delivery', href: '/payment/cod' },
        { name: 'Card Payment', href: '/payment/card' },
        { name: 'Mobile Banking', href: '/payment/mobile' },
        { name: 'Daraz Wallet', href: '/payment/wallet' }
      ] as FooterLink[]
    }
  ];

  const contactInfo = [
    { 
      name: '16458', 
      href: 'tel:16458',
      icon: <Phone className="h-4 w-4" />
    },
    { 
      name: 'support@daraz.com', 
      href: 'mailto:support@daraz.com',
      icon: <Mail className="h-4 w-4" />
    },
    { 
      name: 'Daraz HQ, Dhaka', 
      href: '#',
      icon: <MapPin className="h-4 w-4" />
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-4 w-4" />, label: "Facebook" },
    { icon: <Instagram className="h-4 w-4" />, label: "Instagram" },
    { icon: <Youtube className="h-4 w-4" />, label: "YouTube" }
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact & App Download */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Contact Us
              </h3>
              <ul className="space-y-2">
                {contactInfo.map((info, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-orange-500">{info.icon}</span>
                    <Link 
                      href={info.href} 
                      className="text-sm hover:text-orange-500 transition-colors"
                    >
                      {info.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <Link 
                    key={i} 
                    href="#" 
                    className="text-gray-500 hover:text-orange-500 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6 border-t border-gray-200 mb-6">
          <div className="text-sm font-medium">
            <p>Download App</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="block">
              <Image 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play" 
                width={135}
                height={40}
                className="h-auto"
              />
            </Link>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Daraz. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Terms & Conditions', 'Privacy Policy'].map((item, i) => (
              <Link 
                key={i}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-xs text-gray-500 hover:text-orange-500 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
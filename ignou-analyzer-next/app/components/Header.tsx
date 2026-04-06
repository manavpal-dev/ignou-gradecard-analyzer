'use client';

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/IGNOU.png"
            alt="IGNOU Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />

          <h1 className="font-bold text-lg text-indigo-600">
            IGNOU Grade Card Analyzer
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="text-sm text-gray-600 flex items-center gap-6">

          <Link 
            href="/" 
            className="hover:text-indigo-500 transition"
          >
            Home
          </Link>

          <Link 
            href="/about" 
            className="hover:text-indigo-500 transition"
          >
            About
          </Link>

          {/* CTA */}
          <Link href="/analyzer">
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium 
            bg-gradient-to-r from-indigo-500 to-purple-600 
            hover:scale-105 transition shadow">
              Check Now
            </button>
          </Link>

        </nav>

      </div>
    </header>
  );
}
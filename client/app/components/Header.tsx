"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full
      border-b border-gray-200
      bg-white/80 backdrop-blur-md"
    >
      <div
        className="max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        h-16 flex items-center justify-between"
      >
        {/* LEFT */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-xl
            bg-indigo-50 flex items-center justify-center
            border border-indigo-100"
          >
            <Image
              src="/IGNOU.png"
              alt="IGNOU Logo"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
          </div>

          <div className="hidden sm:block">
            <h1
              className="text-base md:text-lg
              font-bold text-gray-900
              group-hover:text-indigo-600 transition"
            >
              IGNOU Grade Card Analyzer
            </h1>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              About
            </Link>

            <Link
              href="/analyzer"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Analyzer
            </Link>
          </nav>

          {/* CTA */}
          <Link href="/analyzer">
            <button
              className="px-5 py-2.5 rounded-xl
              text-white text-sm font-semibold
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:scale-[1.03]
              transition-all duration-200
              shadow-lg cursor-pointer"
            >
              Check Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

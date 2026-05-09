import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div
        className="max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-12"
      >
        <div
          className="grid grid-cols-1
          md:grid-cols-3 gap-10"
        >
          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              IGNOU Grade Card Analyzer
            </h2>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              A modern student utility platform to check IGNOU grade cards,
              percentage, result status, and subject completion instantly.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
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
                Grade Card Analyzer
              </Link>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Disclaimer
            </h3>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              This platform is an independent student utility tool and is not
              affiliated with or officially connected to IGNOU.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="mt-10 pt-6 border-t border-gray-100
          flex flex-col md:flex-row
          items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-500">
            © {year} IGNOU Grade Card Analyzer. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">Built by Manav Pal</p>
        </div>
      </div>
    </footer>
  );
}

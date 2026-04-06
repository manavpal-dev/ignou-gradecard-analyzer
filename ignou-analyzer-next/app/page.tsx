import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center px-4 
    bg-gradient-to-br from-indigo-50 via-white to-purple-50 w-full">

      {/* HERO SECTION */}
      <section className="max-w-3xl py-20">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          IGNOU Grade Card Check 2026 – Result, Status & Percentage
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Check your IGNOU grade card, result status, and calculate your percentage instantly.
          Supports BCA, MCA and other programs. Fast, accurate and student-friendly tool.
        </p>

        <Link href="/analyzer">
          <button className="px-6 py-3 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-indigo-500 to-purple-600 
          hover:scale-105 transition shadow-lg">
            Check Your Grade Card Now
          </button>
        </Link>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-5xl grid md:grid-cols-3 gap-6 pb-20">

        <div className="p-6 rounded-xl bg-white shadow border">
          <h3 className="font-semibold text-lg mb-2 text-indigo-600">
            Instant Result Check
          </h3>
          <p className="text-sm text-gray-600">
            Get your IGNOU grade card and result status instantly without navigating multiple pages.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white shadow border">
          <h3 className="font-semibold text-lg mb-2 text-indigo-600">
            Percentage Calculator
          </h3>
          <p className="text-sm text-gray-600">
            Automatically calculate your percentage based on assignment, theory and practical marks.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white shadow border">
          <h3 className="font-semibold text-lg mb-2 text-indigo-600">
            All Programs Supported
          </h3>
          <p className="text-sm text-gray-600">
            Works for BCA, MCA and other IGNOU programs with accurate data extraction.
          </p>
        </div>

      </section>

      {/* SEO CONTENT SECTION */}
      <section className="max-w-3xl pb-20 text-left">

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Check IGNOU Grade Card?
        </h2>

        <p className="text-gray-600 mb-3">
          You can easily check your IGNOU grade card by entering your enrollment number
          and selecting your program. This tool fetches your latest academic performance
          including assignment marks, theory marks, practical marks and overall status.
        </p>

        <p className="text-gray-600">
          This IGNOU grade card checker helps students quickly analyze their results
          and track completion status without visiting multiple pages on the official website.
        </p>

      </section>

    </div>
  );
}
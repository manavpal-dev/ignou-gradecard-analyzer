import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="w-full overflow-hidden
      bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-24">

        <div className="text-center max-w-4xl mx-auto">

          <div
            className="inline-flex items-center px-4 py-1 rounded-full
            bg-indigo-100 text-indigo-700 text-sm font-medium mb-6"
          >
            IGNOU Student Utility Platform
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl
            font-extrabold text-gray-900 leading-tight"
          >
            IGNOU Grade Card Check 2026
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-gray-600
            leading-relaxed"
          >
            Check IGNOU results, grade card status, subject completion,
            assignment marks, practical marks, and percentage instantly for
            multiple IGNOU programs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/analyzer">
              <button
                className="px-7 py-3 rounded-xl text-white font-semibold
                bg-linear-to-r from-indigo-500 to-purple-600
                hover:scale-[1.03] transition-all duration-200
                shadow-xl cursor-pointer"
              >
                Check Your Grade Card
              </button>
            </Link>

            <Link href="/about">
              <button
                className="px-7 py-3 rounded-xl border border-gray-300
                bg-white text-gray-700 font-medium
                hover:bg-gray-50 transition cursor-pointer"
              >
                Learn More
              </button>
            </Link>

          </div>

          {/* MINI STATS */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4
            mt-16"
          >

            <div className="bg-white rounded-2xl p-5 border shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-600">
                Fast
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Instant Result Analysis
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-600">
                Secure
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Protected API Requests
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-600">
                All
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                IGNOU Programs Supported
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-600">
                Mobile
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Responsive Experience
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 pb-24">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need in One Place
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A modern platform designed to simplify IGNOU result checking and
            academic analysis for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1 */}
          <div
            className="bg-white border rounded-3xl p-8
            shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-5">📄</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Instant Grade Card Check
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Fetch IGNOU grade cards instantly with subject-wise marks,
              assignment scores, practical marks, and completion status.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="bg-white border rounded-3xl p-8
            shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-5">📊</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Percentage Calculation
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Automatically calculate academic percentage using theory,
              assignment, and practical marks without manual calculations.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="bg-white border rounded-3xl p-8
            shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-5">✅</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Completion Tracking
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Easily track completed and incomplete subjects through a clean,
              responsive, and student-friendly dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 pb-24">

        <div
          className="rounded-3xl bg-white border shadow-sm
          p-8 md:p-12"
        >

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-900">
              How It Works
            </h2>

            <p className="text-gray-600 mt-3">
              Check your IGNOU result in just a few simple steps.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full
                bg-indigo-100 text-indigo-600
                flex items-center justify-center
                mx-auto text-xl font-bold mb-4"
              >
                1
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Select Program
              </h3>

              <p className="text-gray-600 text-sm">
                Choose your IGNOU category and program from the available list.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full
                bg-indigo-100 text-indigo-600
                flex items-center justify-center
                mx-auto text-xl font-bold mb-4"
              >
                2
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Enter Enrollment Number
              </h3>

              <p className="text-gray-600 text-sm">
                Provide your valid enrollment number to fetch academic records.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full
                bg-indigo-100 text-indigo-600
                flex items-center justify-center
                mx-auto text-xl font-bold mb-4"
              >
                3
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Analyze Result
              </h3>

              <p className="text-gray-600 text-sm">
                Instantly view grade cards, marks, percentage, and completion
                status.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto px-4 pb-24">

        <div className="text-left">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            IGNOU Grade Card Checker & Percentage Calculator
          </h2>

          <div className="space-y-5 text-gray-600 leading-relaxed">

            <p>
              IGNOU Grade Card Analyzer is designed to help students quickly
              access academic performance details without navigating complicated
              university portals manually.
            </p>

            <p>
              Students can check assignment marks, theory marks, practical
              marks, percentage, subject completion status, and detailed grade
              card information through a modern and responsive interface.
            </p>

            <p>
              The platform supports multiple IGNOU programs and provides a fast,
              student-friendly experience optimized for both desktop and mobile
              devices.
            </p>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-24">

        <div
          className="rounded-3xl
          bg-linear-to-r from-indigo-500 to-purple-600
          p-10 md:p-14 text-center shadow-2xl"
        >

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Check Your IGNOU Result?
          </h2>

          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            Access your IGNOU grade card, marks, completion status, and
            percentage instantly with a clean and modern experience.
          </p>

          <Link href="/analyzer">
            <button
              className="mt-8 px-8 py-3 rounded-xl bg-white
              text-indigo-600 font-semibold
              hover:scale-[1.03] transition cursor-pointer"
            >
              Start Checking Now
            </button>
          </Link>

        </div>
      </section>
    </div>
  );
}
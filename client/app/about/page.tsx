import Link from "next/link";

export const metadata = {
  title: "About | IGNOU Grade Card Analyzer",
  description:
    "Learn about IGNOU Grade Card Analyzer — a modern platform to check IGNOU grade cards, percentage, subject status, and academic progress instantly.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-600 mb-5">
          IGNOU Student Utility Platform
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          About IGNOU Grade Card Analyzer
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          IGNOU Grade Card Analyzer is a modern web platform designed to help
          students instantly check grade cards, analyze academic performance,
          track completion status, and calculate percentage across multiple
          IGNOU programs.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/analyzer">
            <button
              className="px-6 py-3 rounded-xl text-white font-semibold
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:scale-[1.03] transition-all duration-200 shadow-lg cursor-pointer"
            >
              Check Your Grade Card
            </button>
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why This Platform Exists
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Many IGNOU students struggle with outdated portals, complicated
              navigation, and manually calculating academic progress. This
              platform simplifies the entire experience into a fast, clean, and
              student-friendly dashboard.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Instead of manually checking subject marks and calculating
              percentages, students can instantly view structured insights,
              completion status, and detailed grade information in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h3 className="text-3xl font-bold text-indigo-600">All</h3>
              <p className="text-sm text-gray-500 mt-2">
                IGNOU Programs Supported
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h3 className="text-3xl font-bold text-indigo-600">Fast</h3>
              <p className="text-sm text-gray-500 mt-2">
                Instant Grade Card Analysis
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h3 className="text-3xl font-bold text-indigo-600">Secure</h3>
              <p className="text-sm text-gray-500 mt-2">
                Processed Through Protected APIs
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h3 className="text-3xl font-bold text-indigo-600">Modern</h3>
              <p className="text-sm text-gray-500 mt-2">
                Optimized for Mobile & Desktop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What You Can Do</h2>

          <p className="text-gray-600 mt-3">
            Everything students need to track academic progress efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-3xl mb-4">📄</div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Check Grade Cards
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Instantly fetch detailed IGNOU grade cards with subject-wise marks
              and completion status.
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-3xl mb-4">📊</div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analyze Performance
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Automatically calculate percentages and monitor academic
              performance visually.
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-3xl mb-4">✅</div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Track Completion Status
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              View completed and incomplete subjects with a clean and
              easy-to-understand interface.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div
          className="rounded-3xl p-10 text-center
          bg-linear-to-r from-indigo-500 to-purple-600 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white">
            Ready to Check Your IGNOU Result?
          </h2>

          <p className="text-indigo-100 mt-4 max-w-2xl mx-auto">
            Analyze your grade card, percentage, and academic progress in
            seconds with a modern and student-friendly experience.
          </p>

          <Link href="/analyzer">
            <button
              className="mt-8 bg-white text-indigo-600 px-6 py-3 rounded-xl
              font-semibold hover:scale-[1.03] transition cursor-pointer"
            >
              Start Checking
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

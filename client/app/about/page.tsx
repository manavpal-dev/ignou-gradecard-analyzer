export const metadata = {
  title: "About IGNOU Grade Card Analyzer",
  description:
    "Learn about IGNOU Grade Card Analyzer, a fast and reliable tool to check IGNOU results, grade card status, and percentage instantly.",
};

export default function AboutPage() {
  return (
    <div className="px-4 py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center">
      <div className="max-w-3xl text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          About IGNOU Grade Card Analyzer
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 text-lg mb-8">
          A simple, fast, and reliable tool designed to help IGNOU students
          check their results and analyze their performance instantly.
        </p>

        {/* Section */}
        <div className="text-left space-y-5">
          <p className="text-gray-600">
            IGNOU Grade Card Checker was created to simplify the process of
            checking academic results. Many students find it difficult to
            navigate official portals and calculate their percentage manually.
            This tool solves that problem by providing everything in one place.
          </p>

          <p className="text-gray-600">
            With just your enrollment number and program selection, you can
            instantly view your grade card, subject-wise marks, completion
            status, and overall percentage.
          </p>

          <p className="text-gray-600">
            This platform supports multiple IGNOU programs like BCA, MCA, and
            more, ensuring accurate and easy-to-understand results for students.
          </p>
        </div>

        <a href="/analyzer">
          <button className="mt-6 px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer">
            Check Your Grade Card
          </button>
        </a>

        {/* Highlight Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-10 text-left">
          <div className="p-4 bg-white rounded-xl shadow border">
            <h3 className="font-semibold text-indigo-600 mb-1">
              Instant Results
            </h3>
            <p className="text-sm text-gray-600">
              Check your grade card and result status instantly.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow border">
            <h3 className="font-semibold text-indigo-600 mb-1">
              Accurate Calculation
            </h3>
            <p className="text-sm text-gray-600">
              Get precise percentage based on your marks.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow border">
            <h3 className="font-semibold text-indigo-600 mb-1">
              Student Friendly
            </h3>
            <p className="text-sm text-gray-600">
              Designed for simplicity and ease of use.
            </p>
          </div>
        </div>

        {/* Closing */}
        <p className="text-gray-500 text-sm mt-10">
          Built to make result checking easier for IGNOU students.
        </p>
      </div>
    </div>
  );
}

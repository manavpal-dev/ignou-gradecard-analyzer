export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4
    bg-gradient-to-br from-indigo-50 via-white to-purple-50 w-full">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        IGNOU Grade Card Checker
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 max-w-xl mb-8">
        Check your IGNOU result, grade card status, and percentage instantly.
        Fast, accurate, and easy to use.
      </p>

      {/* CTA Button */}
      <a href="/analyzer">
        <button className="px-6 py-3 rounded-lg text-white font-semibold 
        bg-gradient-to-r from-indigo-500 to-purple-600 
        hover:scale-105 transition shadow-lg">
          Check Your Grade Card
        </button>
      </a>

    </div>
  );
}
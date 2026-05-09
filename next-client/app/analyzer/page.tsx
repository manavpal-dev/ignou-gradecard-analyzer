"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Option = {
  value: string;
  label: string;
};

export default function AnalyzerPage() {
  const router = useRouter();

  const [enrollment, setEnrollment] = useState("");

  const [categories, setCategories] = useState<Option[]>([]);
  const [categoryType, setCategoryType] = useState("");

  const [programs, setPrograms] = useState<Option[]>([]);
  const [program, setProgram] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
      });

      const data = await response.json();

      if (data.success) {
        setCategories(data.categoryOptions);
      }
    } catch (error) {
      setError("Failed to load categories");
    }
  };
  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };
    loadCategories();
  }, []);

  const fetchPrograms = async (value: string) => {
    setCategoryType(value);
    setPrograms([]);
    setProgram("");

    try {
      const response = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryType: value }),
      });

      const data = await response.json();
      if (data.success) {
        setPrograms(data.programOptions);
      }
    } catch {
      setError("Failed to load program");
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryType, program, enrollment }),
      });

      const data = await response.json();

      setLoading(false);

      if (data?.wrong_input || !data.student) {
        setError(data?.wrong_input || "Invalid Enrollment or Program");
        return;
      }

      sessionStorage.setItem(
        "gradeData",
        JSON.stringify({
          data,
          timestamp: Date.now(),
        }),
      );

      router.push(
        `/result/${enrollment}?program=${program}&categoryType=${categoryType}`,
      );
    } catch {
      setLoading(false);
      setError("Server Connection Failed.");
    }
  };

  return (
    <div
      className="h-[90vh] flex flex-col items-center justify-center px-4 
    bg-gradient-to-br from-indigo-100 via-white to-purple-100"
    >
      {/* SEO Heading (hidden visually but useful) */}
      <h1 className="sr-only">
        IGNOU Grade Card Checker – Check Result and Percentage
      </h1>

      <div
        className="w-full max-w-md p-8 py-12 rounded-2xl 
      bg-white/80 backdrop-blur-md shadow-xl border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-1">
          Check IGNOU Grade Card
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your enrollment number to check result, status and percentage
        </p>

        {/* Error */}
        {error && (
          <div
            className="bg-red-100 border border-red-300 text-red-600 
          p-3 rounded-md mb-5 text-sm flex items-center gap-2 animate-pulse"
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          {/* Select Category Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Grade Card Status For
            </label>

            <select
              required
              value={categoryType}
              onChange={(e) => fetchPrograms(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border bg-gray-50 text-gray-900 text-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:border-indigo-400 transition"
            >
              <option value="">Choose Category</option>

              {categories.map((item, indx) => (
                <option key={`${item.value}-${indx}`} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Select Program Code
            </label>

            <select
              required
              disabled={!categoryType}
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border bg-gray-50 text-gray-900 text-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:border-indigo-400 transition"
            >
              <option value="">Choose Program</option>
              {programs.map((item, indx) => (
                <option key={`${item.value}-${indx}`} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Enrollment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Enrollment Number
            </label>

            <input
              type="text"
              required
              placeholder="Enter 9–10 digit enrollment number"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border bg-gray-50 text-gray-900 text-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:border-indigo-400 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`h-12 rounded-lg text-white font-semibold transition-all duration-200
            ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
            }`}
          >
            {loading ? "Checking..." : "Check Grade Card"}
          </button>
        </form>

        {/* Extra info (SEO + UX) */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          This tool helps IGNOU students check their grade card, result status,
          and calculate percentage instantly.
        </p>
      </div>
    </div>
  );
}

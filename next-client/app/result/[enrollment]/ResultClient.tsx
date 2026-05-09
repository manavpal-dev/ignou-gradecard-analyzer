"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const categoryType = searchParams.get("categoryType");
  const enrollment = params.enrollment as string;
  const program = searchParams.get("program");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type ProgrmaType = "BCA" | "BCA_NEW" | "MCA";

  const totalProgramSubjects: Record<ProgrmaType, number> = {
    BCA: 39,
    BCA_NEW: 32,
    MCA: 22,
  };

  const totalSubjects =
    data?.student?.program &&
    totalProgramSubjects[
      data.student.program as keyof typeof totalProgramSubjects
    ];

  const fetchData = async () => {
    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ program, enrollment, categoryType }),
      });

      const result = await res.json();

      if (result.wrong_input) {
        setError(result.wrong_input);
      } else {
        setData(result);
      }
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("gradeData");

    if (stored) {
      const parsed = JSON.parse(stored);
      const isFresh = Date.now() - parsed.timestamp < 10 * 60 * 1000; // 10 min
      if (isFresh) {
        setData(parsed.data);
        setLoading(false);
        return;
      }
    }
    fetchData();
  }, []);

  // 🔥 Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-500">Fetching Grade Card...</p>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded-md max-w-md mx-auto mt-10">
        ⚠️ {error}
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="flex flex-col items-center px-4 py-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      {/* Back */}
      <div
        onClick={() => window.history.back()}
        className="w-full max-w-6xl mb-3 text-sm text-indigo-500 cursor-pointer hover:-translate-x-1 transition"
      >
        ← Back to Search
      </div>

      <div className="w-full max-w-6xl bg-white rounded-2xl p-8 border shadow-xl">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {data?.student?.name}
          </h2>
          <p className="text-sm text-gray-500">{data?.student?.program}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {/* Enrollment */}
          <div className="relative p-4 border rounded-xl bg-white shadow-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-l-xl"></div>
            <p className="text-xs text-gray-500">Enrollment</p>
            <p className="text-lg font-bold text-[#0f172a]">
              {data?.student?.enrollment}
            </p>
          </div>

          {/* Total Subjects + Progress */}
          <div className="relative p-4 border rounded-xl bg-white shadow-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-l-xl"></div>

            <p className="text-xs text-gray-500">Total Subjects</p>

            <p className="text-sm font-semibold text-[#0f172a]">
              {data?.subjectDetails?.total_subject} / {totalSubjects}
            </p>

            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{
                  width: `${(data?.subjectDetails?.total_subject / totalSubjects) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="relative p-4 border rounded-xl bg-white shadow-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-l-xl"></div>

            <p className="text-xs text-gray-500 mb-2">Subjects Status</p>

            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <p className="text-green-600 text-xl font-bold">
                  {data?.subjectDetails?.statusComplete}
                </p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>

              <div className="w-px h-6 bg-gray-200"></div>

              <div className="text-center flex-1">
                <p className="text-red-600 text-xl font-bold">
                  {data?.subjectDetails?.statusIncomplete}
                </p>
                <p className="text-xs text-gray-500">Incomplete</p>
              </div>
            </div>
          </div>

          {/* Percentage (Highlight) */}
          <div className="relative p-4 border rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-xl"></div>

            <p className="text-xs text-gray-500">Percentage</p>

            <p className="text-lg font-bold text-indigo-600">
              {data?.subjectDetails?.percentage}%
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-50 text-sm text-gray-500 ">
                  <tr>
                    <th className="p-3 text-left">Course</th>
                    <th className="p-3 text-center">Assignment</th>
                    <th className="p-3 text-center">Lab1</th>
                    <th className="p-3 text-center">Lab2</th>
                    <th className="p-3 text-center">Lab3</th>
                    <th className="p-3 text-center">Lab4</th>
                    <th className="p-3 text-center">Theory</th>
                    <th className="p-3 text-center">Practical</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.grades?.map((subject: any, index: number) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900 text-left">
                        {subject.Course}
                      </td>

                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Assignment ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Lab1 ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Lab2 ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Lab3 ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Lab4 ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Theory ?? "-"}
                      </td>
                      <td className="p-3 text-[#0f172a] text-center">
                        {subject.Practical ?? "-"}
                      </td>

                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            subject.Status === "COMPLETED"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {subject.Status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* TOTAL */}
                  <tr className="bg-gray-50 font-semibold ">
                    <td className="p-3 text-[#0f172a] text-left">
                      Total Marks
                    </td>

                    <td className="p-3 text-[#0f172a] text-center">
                      {data?.raw_total?.totalAssignmentMarks || 0}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="p-3 text-[#0f172a] text-center">
                      {data?.raw_total?.totalTheoryMarks}
                    </td>

                    <td className="p-3 text-[#0f172a] text-center">
                      {data?.raw_total?.totalPracticalMarks}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

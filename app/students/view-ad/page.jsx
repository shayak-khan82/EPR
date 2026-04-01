
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

/* ================= MAIN PAGE ================= */
export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      <ViewAttendance />
    </Suspense>
  );
}

/* ================= ACTUAL COMPONENT ================= */
function ViewAttendance() {
  const searchParams = useSearchParams();
  const rollNo = searchParams.get("roll");

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  // Default last 7 days
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  }, []);

  // Fetch student ID
  const fetchStudentId = async () => {
    if (!rollNo) return;

    try {
      const res = await api.get("/institutes/getId", {
        params: { rollNo }
      });

      const id = res.data?.data?._id;

      if (!id) {
        console.error("Student ID not found");
        return;
      }

      setStudentId(id);
      setStudentName(res.data.data.stdName);

    } catch (err) {
      console.error("Error fetching student:", err.response?.data || err);
    }
  };

  // Fetch attendance
  const fetchAttendance = async () => {
    if (!studentId || !startDate || !endDate) return;

    setLoading(true);

    try {
      const res = await api.get(
        `/institutes/getStdntAttd/${studentId}`,
        {
          params: { startDate, endDate }
        }
      );

      setAttendance(res.data?.attendance || []);
      setSummary(res.data?.summary || null);

    } catch (err) {

      if (err.response?.status === 404) {
        setAttendance([]);
        setSummary(null);
      } else {
        console.error("Attendance Error:", err);
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentId();
  }, [rollNo]);

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Attendance Report
          </h1>
          <p className="text-sm text-gray-500">
            Roll No: {rollNo}
          </p>
        </div>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-wrap gap-3 items-center">

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          />

          <button
            onClick={fetchAttendance}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Apply
          </button>

          <button
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setDate(end.getDate() - 6);

              setStartDate(start.toISOString().split("T")[0]);
              setEndDate(end.toISOString().split("T")[0]);
            }}
            className="text-sm text-indigo-600 hover:underline ml-auto"
          >
            Last 7 Days
          </button>
        </div>

        {/* STUDENT NAME */}
        {studentName && (
          <div className="mb-4 text-lg font-medium">
            {studentName}
          </div>
        )}

        {/* SUMMARY */}
        {summary && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.totalLectures}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.attended}</p>
              <p className="text-sm text-gray-600">Attended</p>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.percentage}</p>
              <p className="text-sm text-gray-600">Percentage</p>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Date</th>
                <th className="text-center">Subject</th>
                <th className="text-center">Faculty</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              ) : attendance.length > 0 ? (
                attendance.map((a, i) => (
                  <tr key={i} className="border-t">

                    <td className="p-4">
                      {new Date(a.date).toLocaleDateString()}
                    </td>

                    <td className="text-center">{a.subject}</td>
                    <td className="text-center">{a.faculty}</td>

                    {/* ✅ STATUS COLOR FIX */}
                    <td className="text-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          a.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {a.status ? "Present" : "Absent"}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">
                    Click "Apply" to view attendance
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
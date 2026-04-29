
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function AttendanceByClass() {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lectureDate, setLectureDate] = useState(""); 
  const [faculty, setFaculty] = useState({});

  // Fetch all lectures for the day
  // useEffect(() => {
  //   async function fetchLectures() {
  //     try {
  //       setLoading(true);
  //       const res = await api.get(ENDPOINT.getAllLect); // adapt endpoint
  //       setLectures(res.data.lectures || []);
  //       setLectureDate(res.data.data || "");
  //     } catch (err) {
  //       console.error(err);
  //       alert("Failed to fetch lectures");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchLectures();
  // }, []);

  useEffect(() => {
  async function fetchLectures() {
    try {
      setLoading(true);

      // 🔹 Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];
       //const fixedDate = "2026-02-22";

      const res = await api.get(ENDPOINT.getAllLect, {
        params: { date: today },
      });

      setLectures(res.data.lectures || []);
      setLectureDate(today);

    } catch (err) {
      console.error(err);
      alert("Failed to fetch lectures");
    } finally {
      setLoading(false);
    }
  }

  fetchLectures();
}, []);
  // Fetch attendance for selected lecture
  const fetchAttendance = async (lectureId) => {
    if (!lectureId) return alert("Select a lecture first!");
    try {
      setLoading(true);
      const res = await api.get(ENDPOINT.LecturesAttd(lectureId));
      setFaculty(res.data.faculty || {});
      const mapped = (res.data.attendance || []).map((att) => ({
        studentName: att.name,
        studentRollno: att.rollNo,
        date: res.data.date,
        status: att.status ? "present" : "absent",
      }));
      setAttendance(mapped);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Attendance for {lectureDate}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Lecture Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Lecture</label>
            <select
              value={selectedLecture}
              onChange={(e) => setSelectedLecture(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Lecture</option>
              {lectures.map((lecture) => (
                <option key={lecture.lectureId} value={lecture.lectureId}>
                  {lecture.subject.subName} ({lecture.subject.subCode}) - Year {lecture.year} Section {lecture.section} - {lecture.faculty.facName}
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchAttendance(selectedLecture)}
              disabled={!selectedLecture || loading}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Get Attendance"}
            </button>
          </div>

          {/* Info Panel */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">Lecture Info</h3>
            <p><span className="font-medium">Lecture Date:</span> {lectureDate || "N/A"}</p>
            <p><span className="font-medium">Faculty:</span> {faculty.facName || "N/A"} ({faculty.facEmail || "-"})</p>
            <p><span className="font-medium">Total Records:</span> {attendance.length}</p>
            {attendance.length > 0 && (
              <>
                <p><span className="font-medium">Present:</span> {attendance.filter(a => a.status === "present").length}</p>
                <p><span className="font-medium">Absent:</span> {attendance.filter(a => a.status === "absent").length}</p>
                <p><span className="font-medium">Percentage:</span> {((attendance.filter(a => a.status === "present").length / attendance.length) * 100).toFixed(1)}%</p>
              </>
            )}
          </div>
        </div>

        {/* Attendance Table */}
        {attendance.length > 0 && (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                   <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Roll-No</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((att, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{att.studentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{att.studentRollno}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(att.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${att.status === "present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {att.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && selectedLecture && attendance.length === 0 && <p className="mt-6 text-center text-gray-500">No attendance records found.</p>}
      </div>
    </div>
  );
}

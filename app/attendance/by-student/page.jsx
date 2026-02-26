
// // "use client";

// // import { useState, useEffect } from "react";
// // import api from "@/lib/api";

// // export default function AttendanceByStudent() {
// //   const [students, setStudents] = useState([]);
// //   const [selectedStudent, setSelectedStudent] = useState("");
// //   const [selectedStudentName, setSelectedStudentName] = useState("");
// //   const [attendance, setAttendance] = useState([]);
// //   const [summary, setSummary] = useState(null);
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // ✅ Helper to set last 7 days by default
// //   const setLast7Days = () => {
// //     const end = new Date();
// //     const start = new Date();
// //     start.setDate(end.getDate() - 6);

// //     setStartDate(start.toISOString().split("T")[0]);
// //     setEndDate(end.toISOString().split("T")[0]);
// //   };

// //   // ✅ Fetch students list on mount
// //   useEffect(() => {
// //     async function fetchStudents() {
// //       try {
// //         const res = await api.get("/students"); // expecting [{ id, rollNo, name }]
// //         setStudents(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch students", err);
// //       }
// //     }
// //     fetchStudents();
// //     setLast7Days(); // set default date range when page loads
// //   }, []);

// //   // ✅ Fetch attendance when student OR dates change
// //   useEffect(() => {
// //     async function fetchAttendance() {
// //       if (!selectedStudent || !startDate || !endDate) return;

// //       const stu = students.find((s) => s.id === selectedStudent);
// //       setSelectedStudentName(stu ? stu.name : "");

// //       try {
// //         const res = await api.get(
// //           `/attendance/student/${selectedStudent}?startDate=${startDate}&endDate=${endDate}`
// //         );

// //         setAttendance(res.data.attandance || []);
// //         setSummary(res.data.summary || null);
// //       } catch (err) {
// //         console.error("Failed to fetch attendance", err);
// //         setAttendance([]);
// //         setSummary(null);
// //       }
// //     }

// //     fetchAttendance();
// //   }, [selectedStudent, startDate, endDate, students]);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 text-black">
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
// //         <h1 className="text-2xl font-bold mb-6 text-black text-center">
// //           Attendance by Student
// //         </h1>

// //         {/* Step 1: Select Student */}
// //         <div className="flex flex-col sm:flex-row gap-4 mb-4">
// //           <select
// //             value={selectedStudent}
// //             onChange={(e) => setSelectedStudent(e.target.value)}
// //             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           >
// //             <option value="">Select Roll Number</option>
// //             {students.map((stu) => (
// //               <option key={stu.id} value={stu.id}>
// //                 {stu.rollNo}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Step 2: Date Range Picker */}
// //         <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
// //           <div className="flex gap-2">
// //             <input
// //               type="date"
// //               value={startDate}
// //               onChange={(e) => setStartDate(e.target.value)}
// //               className="border border-gray-300 rounded-lg px-3 py-2"
// //             />
// //             <input
// //               type="date"
// //               value={endDate}
// //               onChange={(e) => setEndDate(e.target.value)}
// //               className="border border-gray-300 rounded-lg px-3 py-2"
// //             />
// //           </div>
// //           <button
// //             onClick={setLast7Days}
// //             className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
// //           >
// //             Last 7 Days
// //           </button>
// //         </div>

// //         {/* Step 3: Show Student Name */}
// //         {selectedStudentName && (
// //           <p className="text-lg font-semibold text-gray-700 mb-4">
// //             Student Name: <span className="text-black">{selectedStudentName}</span>
// //           </p>
// //         )}

// //         {/* Step 4: Show Summary */}
// //         {summary && (
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// //             <div className="bg-blue-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.totalLectures}</p>
// //               <p className="text-gray-600 text-sm">Total Lectures</p>
// //             </div>
// //             <div className="bg-green-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.attended}</p>
// //               <p className="text-gray-600 text-sm">Attended</p>
// //             </div>
// //             <div className="bg-purple-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.percentage}</p>
// //               <p className="text-gray-600 text-sm">Percentage</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Step 5: Attendance Table */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full table-auto border-collapse border">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="border px-4 py-2 text-left">Date</th>
// //                 <th className="border px-4 py-2 text-left">Subject</th>
// //                 <th className="border px-4 py-2 text-left">Faculty</th>
// //                 <th className="border px-4 py-2 text-left">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {attendance.map((att, index) => (
// //                 <tr key={index} className="hover:bg-gray-50">
// //                   <td className="border px-4 py-2">
// //                     {new Date(att.date).toLocaleDateString()}
// //                   </td>
// //                   <td className="border px-4 py-2">{att.subject}</td>
// //                   <td className="border px-4 py-2">{att.faculty}</td>
// //                   <td
// //                     className={`border px-4 py-2 font-semibold ${
// //                       att.status ? "text-green-600" : "text-red-600"
// //                     }`}
// //                   >
// //                     {att.status ? "Present" : "Absent"}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {attendance.length === 0 && (
// //             <p className="text-center text-gray-500 mt-4">
// //               No attendance records found for this date range.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import api from "@/lib/api";

// export default function AttendanceByStudent() {
//   const [rollNo, setRollNo] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [studentName, setStudentName] = useState("");
//   const [attendance, setAttendance] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Set last 7 days
//   const setLast7Days = () => {
//     const end = new Date();
//     const start = new Date();
//     start.setDate(end.getDate() - 6);

//     setStartDate(start.toISOString().split("T")[0]);
//     setEndDate(end.toISOString().split("T")[0]);
//   };

//   // On page load → set last 7 days
//   useEffect(() => {
//     setLast7Days();
//   }, []);

//   // Fetch Student ID by Roll Number
//   const fetchStudentId = async () => {
//     if (!rollNo) {
//       alert("Please enter Roll Number");
//       return;
//     }

//     try {
//       const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);

//       setStudentId(res.data.data._id);
//       setStudentName(res.data.data.stdName);

//       fetchAttendance(res.data.data._id);
//     } catch (err) {
//       console.error(err);
//       alert("Roll Number not found!");
//       setStudentId("");
//       setStudentName("");
//       setAttendance([]);
//       setSummary(null);
//     }
//   };

//   // Fetch attendance for student
//   const fetchAttendance = async (stuId) => {
//     if (!stuId) return;

//     try {
//       const res = await api.get(
//         `/institutes/getStdntAttd/${stuId}?startDate=${startDate}&endDate=${endDate}`
//       );

//       setAttendance(res.data.attandance || []);
//       setSummary(res.data.summary || null);
//     } catch (err) {
//       console.error("Failed to fetch attendance", err);
//       setAttendance([]);
//       setSummary(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 text-black">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Student Attendance Report
//         </h1>

//         {/* ENTER ROLL NUMBER */}
//         <div className="flex gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Enter Roll Number"
//             value={rollNo}
//             onChange={(e) => setRollNo(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
//           />

//           <button
//             onClick={fetchStudentId}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
//           >
//             Search
//           </button>
//         </div>

//         {/* DATE RANGE */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
//           <div className="flex gap-2">
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2"
//             />
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2"
//             />
//           </div>

//           <button
//             onClick={() => fetchAttendance(studentId)}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
//           >
//             Apply
//           </button>

//           <button
//             onClick={setLast7Days}
//             className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//           >
//             Last 7 Days
//           </button>
//         </div>

//         {/* Student Name */}
//         {studentName && (
//           <p className="text-lg font-semibold mb-4">
//             Student: <span className="text-black">{studentName}</span>
//           </p>
//         )}

//         {/* ATTENDANCE DETAILS (NEW SECTION) */}
//         {attendance.length > 0 && (
//           <div className="bg-gray-50 p-4 rounded-lg border mb-6">
//             <h3 className="text-lg font-semibold mb-3">📌 Attendance Details</h3>

//             <div className="grid sm:grid-cols-2 gap-4">
//               <p className="text-gray-700">
//                 <strong>From:</strong>{" "}
//                 {new Date(attendance[0].date).toLocaleDateString()}
//               </p>

//               <p className="text-gray-700">
//                 <strong>To:</strong>{" "}
//                 {new Date(attendance[attendance.length - 1].date).toLocaleDateString()}
//               </p>

//               <p className="text-gray-700">
//                 <strong>Subjects:</strong>{" "}
//                 {[...new Set(attendance.map((a) => a.subject))].join(", ")}
//               </p>

//               <p className="text-gray-700">
//                 <strong>Faculties:</strong>{" "}
//                 {[...new Set(attendance.map((a) => a.faculty))].join(", ")}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* SUMMARY */}
//         {summary && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//             <div className="bg-blue-100 p-4 rounded-lg text-center">
//               <p className="text-xl font-bold">{summary.totalLectures}</p>
//               <p className="text-gray-600 text-sm">Total Lectures</p>
//             </div>
//             <div className="bg-green-100 p-4 rounded-lg text-center">
//               <p className="text-xl font-bold">{summary.attended}</p>
//               <p className="text-gray-600 text-sm">Attended</p>
//             </div>
//             <div className="bg-purple-100 p-4 rounded-lg text-center">
//               <p className="text-xl font-bold">{summary.percentage}%</p>
//               <p className="text-gray-600 text-sm">Percentage</p>
//             </div>
//           </div>
//         )}

//         {/* ATTENDANCE TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2 text-left">Date</th>
//                 <th className="border px-4 py-2 text-left">Subject</th>
//                 <th className="border px-4 py-2 text-left">Faculty</th>
//                 <th className="border px-4 py-2 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {attendance.map((att, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">
//                     {new Date(att.date).toLocaleDateString()}
//                   </td>
//                   <td className="border px-4 py-2">{att.subject}</td>
//                   <td className="border px-4 py-2">{att.faculty}</td>
//                   <td
//                     className={`border px-4 py-2 font-semibold ${
//                       att.status ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {att.status ? "Present" : "Absent"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {attendance.length === 0 && (
//             <p className="text-center text-gray-500 mt-4">
//               No attendance records found for this date range.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function AttendanceByStudent() {
  const [rollNo, setRollNo] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Set last 7 days
  const setLast7Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  useEffect(() => {
    setLast7Days();
  }, []);

  // GET student ID from roll no
  const fetchStudentId = async () => {
    if (!rollNo) return alert("Enter Roll Number");

    try {
      const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);

      setStudentId(res.data.data._id);
      setStudentName(res.data.data.stdName);

      fetchAttendance(res.data.data._id);
    } catch (err) {
      console.error(err);
      alert("Roll Number not found!");
      setStudentName("");
      setAttendance([]);
      setSummary(null);
    }
  };

  // GET attendance of student
  const fetchAttendance = async (stuId) => {
    if (!stuId) return;

    try {
      const res = await api.get(
        `/institutes/getStdntAttd/${stuId}?startDate=${startDate}&endDate=${endDate}`
      );

      // API returns:
      // attendance: []
      // summary: {}
      setAttendance(res.data.attendance || []);
      setSummary(res.data.summary || null);
    } catch (err) {
      console.error(err);
      setAttendance([]);
      setSummary(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Student Attendance Report
        </h1>

        {/* Roll No Input */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={fetchStudentId}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Search
          </button>
        </div>

        {/* Date Range */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={() => fetchAttendance(studentId)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Apply
          </button>

          <button
            onClick={setLast7Days}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Last 7 Days
          </button>
        </div>

        {/* Student Name */}
        {studentName && (
          <p className="text-lg font-semibold mb-4">
            Student: <span className="text-black">{studentName}</span>
          </p>
        )}

        {/* Attendance Details */}
        {attendance.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="text-lg font-semibold mb-3">📌 Attendance Details</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <p className="text-gray-700">
                <strong>From:</strong>{" "}
                {new Date(attendance[attendance.length - 1].date).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                <strong>To:</strong>{" "}
                {new Date(attendance[0].date).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                <strong>Subjects:</strong>{" "}
                {[...new Set(attendance.map((a) => a.subject))].join(", ")}
              </p>

              <p className="text-gray-700">
                <strong>Faculties:</strong>{" "}
                {[...new Set(attendance.map((a) => a.faculty))].join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.totalLectures}</p>
              <p className="text-gray-600">Total Lectures</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.attended}</p>
              <p className="text-gray-600">Attended</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">{summary.percentage}</p>
              <p className="text-gray-600">Percentage</p>
            </div>
          </div>
        )}

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Faculty</th>
                <th className="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((att, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {new Date(att.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{att.subject}</td>
                  <td className="border px-4 py-2">{att.faculty}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      att.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {att.status ? "Present" : "Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {attendance.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No attendance found for this date range.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


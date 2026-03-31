// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useSearchParams } from "next/navigation";
// // // import api from "@/lib/api";

// // // export default function ViewAttendance() {
// // //   const searchParams = useSearchParams();
// // //   const rollNo = searchParams.get("roll");

// // //   const [studentId, setStudentId] = useState("");
// // //   const [studentName, setStudentName] = useState("");

// // //   const [attendance, setAttendance] = useState([]);
// // //   const [summary, setSummary] = useState(null);

// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");

// // //   // 🔥 Default last 7 days
// // //   useEffect(() => {
// // //     const end = new Date();
// // //     const start = new Date();
// // //     start.setDate(end.getDate() - 6);

// // //     setStartDate(start.toISOString().split("T")[0]);
// // //     setEndDate(end.toISOString().split("T")[0]);
// // //   }, []);

// // //   // 🔥 Fetch student ID from roll
// // //   const fetchStudentId = async () => {
// // //     try {
// // //       const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);
// // //       const id = res.data.data._id;

// // //       setStudentId(id);
// // //       setStudentName(res.data.data.stdName);

// // //       fetchAttendance(id);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   // 🔥 Fetch attendance
// // //   const fetchAttendance = async (id) => {
// // //     try {
// // //       const res = await api.get(
// // //         `/institutes/getStdntAttd/${id}?startDate=${startDate}&endDate=${endDate}`
// // //       );

// // //       setAttendance(res.data.attendance || []);
// // //       setSummary(res.data.summary || null);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (rollNo && startDate && endDate) {
// // //       fetchStudentId();
// // //     }
// // //   }, [rollNo, startDate, endDate]);

// // //   return (
// // //     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

// // //       <div className="max-w-6xl mx-auto">

// // //         {/* 🔥 HEADER */}
// // //         <div className="mb-6">
// // //           <h1 className="text-2xl font-semibold">
// // //             Attendance Report
// // //           </h1>
// // //           <p className="text-sm text-gray-500">
// // //             Roll No: {rollNo}
// // //           </p>
// // //         </div>

// // //         {/* 🔹 FILTER CARD */}
// // //         <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-wrap gap-3 items-center">

// // //           <input
// // //             type="date"
// // //             value={startDate}
// // //             onChange={(e) => setStartDate(e.target.value)}
// // //             className="border px-3 py-2 rounded-md text-sm"
// // //           />

// // //           <input
// // //             type="date"
// // //             value={endDate}
// // //             onChange={(e) => setEndDate(e.target.value)}
// // //             className="border px-3 py-2 rounded-md text-sm"
// // //           />

// // //           <button
// // //             onClick={() => fetchAttendance(studentId)}
// // //             className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
// // //           >
// // //             Apply
// // //           </button>

// // //           <button
// // //             onClick={() => {
// // //               const end = new Date();
// // //               const start = new Date();
// // //               start.setDate(end.getDate() - 6);

// // //               setStartDate(start.toISOString().split("T")[0]);
// // //               setEndDate(end.toISOString().split("T")[0]);
// // //             }}
// // //             className="text-sm text-indigo-600 hover:underline ml-auto"
// // //           >
// // //             Last 7 Days
// // //           </button>
// // //         </div>

// // //         {/* 🔹 STUDENT NAME */}
// // //         {studentName && (
// // //           <div className="mb-4 text-lg font-medium">
// // //             {studentName}
// // //           </div>
// // //         )}

// // //         {/* 🔹 SUMMARY */}
// // //         {summary && (
// // //           <div className="grid grid-cols-3 gap-4 mb-6">
// // //             <div className="bg-blue-100 p-4 rounded-lg text-center">
// // //               <p className="text-xl font-bold">{summary.totalLectures}</p>
// // //               <p className="text-sm text-gray-600">Total</p>
// // //             </div>

// // //             <div className="bg-green-100 p-4 rounded-lg text-center">
// // //               <p className="text-xl font-bold">{summary.attended}</p>
// // //               <p className="text-sm text-gray-600">Attended</p>
// // //             </div>

// // //             <div className="bg-purple-100 p-4 rounded-lg text-center">
// // //               <p className="text-xl font-bold">{summary.percentage}</p>
// // //               <p className="text-sm text-gray-600">Percentage</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* 🔹 TABLE */}
// // //         <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
// // //           <table className="w-full text-sm">
// // //             <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
// // //               <tr>
// // //                 <th className="text-left p-4">Date</th>
// // //                 <th>Subject</th>
// // //                 <th>Faculty</th>
// // //                 <th>Status</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {attendance.length > 0 ? (
// // //                 attendance.map((a, i) => (
// // //                   <tr key={i} className="border-t hover:bg-indigo-50/40">
// // //                     <td className="p-4">
// // //                       {new Date(a.date).toLocaleDateString()}
// // //                     </td>
// // //                     <td className="text-center">{a.subject}</td>
// // //                     <td className="text-center">{a.faculty}</td>
// // //                     <td
// // //                       className={`text-center font-medium ${
// // //                         a.status
// // //                           ? "text-green-600"
// // //                           : "text-red-600"
// // //                       }`}
// // //                     >
// // //                       {a.status ? "Present" : "Absent"}
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td colSpan="4" className="text-center p-6 text-gray-400">
// // //                     No attendance found
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useSearchParams } from "next/navigation";
// // import api from "@/lib/api";

// // export default function ViewAttendance() {
// //   const searchParams = useSearchParams();
// //   const rollNo = searchParams.get("roll");

// //   const [studentId, setStudentId] = useState("");
// //   const [studentName, setStudentName] = useState("");

// //   const [attendance, setAttendance] = useState([]);
// //   const [summary, setSummary] = useState(null);

// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // ✅ Set default last 7 days
// //   useEffect(() => {
// //     const end = new Date();
// //     const start = new Date();
// //     start.setDate(end.getDate() - 6);

// //     setStartDate(start.toISOString().split("T")[0]);
// //     setEndDate(end.toISOString().split("T")[0]);
// //   }, []);

// //   // ✅ Fetch student ID from roll number
// //   const fetchStudentId = async () => {
// //     try {
// //       const res = await api.get(`/institutes/getId`, {
// //         params: { rollNo }
// //       });

// //       const id = res.data?.data?._id;

// //       if (!id) {
// //         console.error("❌ Student ID not found");
// //         return;
// //       }

// //       setStudentId(id);
// //       setStudentName(res.data.data.stdName);

// //     } catch (err) {
// //       console.error("❌ Error fetching student ID:", err);
// //     }
// //   };

// //   // ✅ Fetch attendance (FIXED)
// //   const fetchAttendance = async (id) => {
// //     if (!id || !startDate || !endDate) return;

// //     try {
// //       console.log("📡 Calling API:", id, startDate, endDate);

// //       const res = await api.get(
// //         `/institutes/getStdntAttd/${id}`,
// //         {
// //           params: {
// //             startDate,
// //             endDate
// //           }
// //         }
// //       );

// //       setAttendance(res.data?.attendance || []);
// //       setSummary(res.data?.summary || null);

// //     } catch (err) {
// //       console.error("❌ Attendance Error:", err);
// //     }
// //   };

// //   // ✅ First: get student ID
// //   useEffect(() => {
// //     if (rollNo) {
// //       fetchStudentId();
// //     }
// //   }, [rollNo]);

// //   // ✅ Then: fetch attendance AFTER everything is ready
// //   useEffect(() => {
// //     if (studentId && startDate && endDate) {
// //       fetchAttendance(studentId);
// //     }
// //   }, [studentId, startDate, endDate]);

// //   return (
// //     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">
// //       <div className="max-w-6xl mx-auto">

// //         {/* HEADER */}
// //         <div className="mb-6">
// //           <h1 className="text-2xl font-semibold">
// //             Attendance Report
// //           </h1>
// //           <p className="text-sm text-gray-500">
// //             Roll No: {rollNo}
// //           </p>
// //         </div>

// //         {/* FILTER */}
// //         <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-wrap gap-3 items-center">

// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             className="border px-3 py-2 rounded-md text-sm"
// //           />

// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             className="border px-3 py-2 rounded-md text-sm"
// //           />

// //           <button
// //             onClick={() => fetchAttendance(studentId)}
// //             className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
// //           >
// //             Apply
// //           </button>

// //           <button
// //             onClick={() => {
// //               const end = new Date();
// //               const start = new Date();
// //               start.setDate(end.getDate() - 6);

// //               setStartDate(start.toISOString().split("T")[0]);
// //               setEndDate(end.toISOString().split("T")[0]);
// //             }}
// //             className="text-sm text-indigo-600 hover:underline ml-auto"
// //           >
// //             Last 7 Days
// //           </button>
// //         </div>

// //         {/* STUDENT NAME */}
// //         {studentName && (
// //           <div className="mb-4 text-lg font-medium">
// //             {studentName}
// //           </div>
// //         )}

// //         {/* SUMMARY */}
// //         {summary && (
// //           <div className="grid grid-cols-3 gap-4 mb-6">
// //             <div className="bg-blue-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.totalLectures}</p>
// //               <p className="text-sm text-gray-600">Total</p>
// //             </div>

// //             <div className="bg-green-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.attended}</p>
// //               <p className="text-sm text-gray-600">Attended</p>
// //             </div>

// //             <div className="bg-purple-100 p-4 rounded-lg text-center">
// //               <p className="text-xl font-bold">{summary.percentage}</p>
// //               <p className="text-sm text-gray-600">Percentage</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* TABLE */}
// //         <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
// //           <table className="w-full text-sm">
// //             <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
// //               <tr>
// //                 <th className="text-left p-4">Date</th>
// //                 <th>Subject</th>
// //                 <th>Faculty</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {attendance.length > 0 ? (
// //                 attendance.map((a, i) => (
// //                   <tr key={i} className="border-t hover:bg-indigo-50/40">
// //                     <td className="p-4">
// //                       {new Date(a.date).toLocaleDateString()}
// //                     </td>
// //                     <td className="text-center">{a.subject}</td>
// //                     <td className="text-center">{a.faculty}</td>
// //                     <td
// //                       className={`text-center font-medium ${
// //                         a.status
// //                           ? "text-green-600"
// //                           : "text-red-600"
// //                       }`}
// //                     >
// //                       {a.status ? "Present" : "Absent"}
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="4" className="text-center p-6 text-gray-400">
// //                     No attendance found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import api from "@/lib/api";

// export default function ViewAttendance() {
//   const searchParams = useSearchParams();
//   const rollNo = searchParams.get("roll");

//   const [studentId, setStudentId] = useState("");
//   const [studentName, setStudentName] = useState("");

//   const [attendance, setAttendance] = useState([]);
//   const [summary, setSummary] = useState(null);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // ✅ Default last 7 days
//   useEffect(() => {
//     const end = new Date();
//     const start = new Date();
//     start.setDate(end.getDate() - 6);

//     setStartDate(start.toISOString().split("T")[0]);
//     setEndDate(end.toISOString().split("T")[0]);
//   }, []);

//   // ✅ Fetch student ID
//   const fetchStudentId = async () => {
//     if (!rollNo) return;

//     try {
//       console.log("📡 Fetching student ID...");

//       const res = await api.get("/institutes/getId", {
//         params: { rollNo }
//       });

//       const id = res.data?.data?._id;

//       if (!id) {
//         console.error("❌ Student ID not found");
//         return;
//       }

//       console.log("✅ Student ID:", id);

//       setStudentId(id);
//       setStudentName(res.data.data.stdName);

//     } catch (err) {
//       console.error("❌ Error fetching student:", err.response?.data || err);
//     }
//   };

//   // ✅ Fetch attendance
//   const fetchAttendance = async (id) => {
//     if (!id || !startDate || !endDate) return;

//     try {
//       console.log("📡 Fetching attendance...");
//       console.log("👉 URL:", `/institutes/getStdntAttd/${id}`);

//       const res = await api.get(
//         `/institutes/getStdntAttd/${id}`,
//         {
//           params: {
//             startDate,
//             endDate
//           }
//         }
//       );

//       setAttendance(res.data?.attendance || []);
//       setSummary(res.data?.summary || null);

//     } catch (err) {
//       console.error("❌ Attendance Error:", err.response?.data || err);
//     }
//   };

//   // ✅ Step 1: Get student ID
//   useEffect(() => {
//     fetchStudentId();
//   }, [rollNo]);

//   // ✅ Step 2: Fetch attendance
//   useEffect(() => {
//     if (studentId && startDate && endDate) {
//       fetchAttendance(studentId);
//     }
//   }, [studentId, startDate, endDate]);

//   return (
//     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">
//       <div className="max-w-6xl mx-auto">

//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold">
//             Attendance Report
//           </h1>
//           <p className="text-sm text-gray-500">
//             Roll No: {rollNo}
//           </p>
//         </div>

//         {/* FILTER */}
//         <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex gap-3 flex-wrap">

//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border px-3 py-2 rounded-md text-sm"
//           />

//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="border px-3 py-2 rounded-md text-sm"
//           />

//           <button
//             onClick={() => fetchAttendance(studentId)}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
//           >
//             Apply
//           </button>
//         </div>

//         {/* STUDENT NAME */}
//         {studentName && (
//           <div className="mb-4 text-lg font-medium">
//             {studentName}
//           </div>
//         )}

//         {/* SUMMARY */}
//         {summary && (
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="bg-blue-100 p-4 rounded-lg text-center">
//               {summary.totalLectures}
//             </div>
//             <div className="bg-green-100 p-4 rounded-lg text-center">
//               {summary.attended}
//             </div>
//             <div className="bg-purple-100 p-4 rounded-lg text-center">
//               {summary.percentage}
//             </div>
//           </div>
//         )}

//         {/* TABLE */}
//         <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr>
//                 <th className="p-4 text-left">Date</th>
//                 <th>Subject</th>
//                 <th>Faculty</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {attendance.length > 0 ? (
//                 attendance.map((a, i) => (
//                   <tr key={i} className="border-t">
//                     <td className="p-4">
//                       {new Date(a.date).toLocaleDateString()}
//                     </td>
//                     <td>{a.subject}</td>
//                     <td>{a.faculty}</td>
//                     <td>
//                       {a.status ? "Present" : "Absent"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-6">
//                     No attendance found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

export default function ViewAttendance() {
  const searchParams = useSearchParams();
  const rollNo = searchParams.get("roll");

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ Default last 7 days (only sets UI, no API call)
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  }, []);

  // ✅ Fetch student ID ONLY
  const fetchStudentId = async () => {
    if (!rollNo) return;

    try {
      const res = await api.get("/institutes/getId", {
        params: { rollNo }
      });

      const id = res.data?.data?._id;

      if (!id) {
        console.error("❌ Student ID not found");
        return;
      }

      setStudentId(id);
      setStudentName(res.data.data.stdName);

    } catch (err) {
      console.error("❌ Error fetching student:", err.response?.data || err);
    }
  };

  // ✅ Fetch attendance ONLY on Apply click
  const fetchAttendance = async () => {
    if (!studentId || !startDate || !endDate) return;

    setLoading(true);

    try {
      const res = await api.get(
        `/institutes/getStdntAttd/${studentId}`,
        {
          params: {
            startDate,
            endDate
          }
        }
      );

      setAttendance(res.data?.attendance || []);
      setSummary(res.data?.summary || null);

    } catch (err) {

      // ✅ Handle "no data"
      if (err.response?.status === 404) {
        setAttendance([]);
        setSummary(null);
      } else {
        console.error("❌ Attendance Error:", err);
      }

    } finally {
      setLoading(false);
    }
  };

  // ✅ Only fetch student ID on load
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
                <th>Subject</th>
                <th>Faculty</th>
                <th>Status</th>
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
                    <td className="text-center font-medium">
                      {a.status ? "Present" : "Absent"}
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
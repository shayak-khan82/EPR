// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import api from "@/lib/api";

// // export default function ManageStudents() {
// //   const [students, setStudents] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const [dept, setDept] = useState("");
// //   const [year, setYear] = useState("");
// //   const [section, setSection] = useState("");

// //   const [selectedStudent, setSelectedStudent] = useState(null);

// //   const router = useRouter();
// //   const limit = 10;

// //   const fetchStudents = async () => {
// //     try {
// //       let query = `/institutes/getStudents?page=${page}&limit=${limit}`;

// //       if (dept) query += `&dept=${dept}`;
// //       if (year) query += `&year=${year}`;
// //       if (section) query += `&section=${section}`;

// //       const res = await api.get(query);

// //       setStudents(res.data.students);
// //       setTotalPages(res.data.totalPages);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStudents();
// //   }, [page, dept, year, section]);

// //   const handleUpdate = async () => {
// //     try {
// //       await api.patch(
// //         `/institutes/updateStudent/${selectedStudent._id}`,
// //         {
// //           stdName: selectedStudent.stdName,
// //           stdEmail: selectedStudent.stdEmail,
// //         }
// //       );

// //       setSelectedStudent(null);
// //       fetchStudents();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Update failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

// //       {/* 🔥 HEADER */}
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h1 className="text-2xl font-semibold">Students</h1>
// //           <p className="text-sm text-gray-500">
// //             Manage and track student records
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => router.push("/students/bulk-add")}
// //           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
// //         >
// //           + Bulk Add Students
// //         </button>
// //       </div>

// //       {/* 🔹 FILTER CARD */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">

// //         <select
// //           value={dept}
// //           onChange={(e) => {
// //             setPage(1);
// //             setDept(e.target.value);
// //           }}
// //           className="border px-3 py-2 rounded-md text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-400 outline-none"
// //         >
// //           <option value="">Department</option>
// //           <option value="CSE">CSE</option>
// //           <option value="ECE">ECE</option>
// //           <option value="ME">ME</option>
// //         </select>

// //         <select
// //           value={year}
// //           onChange={(e) => {
// //             setPage(1);
// //             setYear(e.target.value);
// //           }}
// //           className="border px-3 py-2 rounded-md text-sm bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none"
// //         >
// //           <option value="">Year</option>
// //           <option value={1}>1</option>
// //           <option value={2}>2</option>
// //           <option value={3}>3</option>
// //           <option value={4}>4</option>
// //         </select>

// //         <select
// //           value={section}
// //           onChange={(e) => {
// //             setPage(1);
// //             setSection(e.target.value);
// //           }}
// //           className="border px-3 py-2 rounded-md text-sm bg-purple-50 focus:ring-2 focus:ring-purple-400 outline-none"
// //         >
// //           <option value="">Section</option>
// //           <option value="A">A</option>
// //           <option value="B">B</option>
// //           <option value="C">C</option>
// //           <option value="D">D</option>
// //         </select>

// //         <button
// //           onClick={() => {
// //             setDept("");
// //             setYear("");
// //             setSection("");
// //             setPage(1);
// //           }}
// //           className="ml-auto text-sm text-indigo-600 hover:underline"
// //         >
// //           Reset Filters
// //         </button>
// //       </div>

// //       {/* 🔹 TABLE */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //         <table className="w-full text-sm">
// //           <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-600">
// //             <tr>
// //               <th className="text-left p-4 font-medium">Name</th>
// //               <th className="text-left">Email</th>
// //               <th>Roll</th>
// //               <th>Status</th>
// //               <th className="text-right pr-4">Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {students.length > 0 ? (
// //               students.map((s) => (
// //                 <tr
// //                   key={s._id}
// //                   className="border-t hover:bg-indigo-50/40 transition"
// //                 >
// //                   <td className="p-4 font-medium">{s.stdName}</td>
// //                   <td className="text-gray-600">{s.stdEmail}</td>
// //                   <td className="text-center">{s.stdRoll}</td>

// //                   <td className="text-center">
// //                     <span
// //                       className={`text-xs px-3 py-1 rounded-full font-medium ${
// //                         s.faceEnrollmentStatus === "COMPLETED"
// //                           ? "bg-green-100 text-green-700"
// //                           : "bg-orange-100 text-orange-600"
// //                       }`}
// //                     >
// //                       {s.faceEnrollmentStatus || "PENDING"}
// //                     </span>
// //                   </td>

// //                   <td className="text-right pr-4">
// //                     <button
// //                       onClick={() => setSelectedStudent(s)}
// //                       className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
// //                     >
// //                       Edit
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5" className="text-center p-6 text-gray-400">
// //                   No students found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* 🔹 PAGINATION */}
// //       <div className="flex justify-between items-center mt-6 text-sm">
// //         <span className="text-gray-500">
// //           Page {page} of {totalPages}
// //         </span>

// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => setPage((p) => p - 1)}
// //             disabled={page === 1}
// //             className="border px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
// //           >
// //             Prev
// //           </button>

// //           <button
// //             onClick={() => setPage((p) => p + 1)}
// //             disabled={page === totalPages}
// //             className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-40"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {/* 🔥 EDIT MODAL */}
// //       {selectedStudent && (
// //         <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
// //           <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
// //             <h2 className="text-lg font-semibold mb-4">
// //               Edit Student
// //             </h2>

// //             <input
// //               type="text"
// //               value={selectedStudent.stdName}
// //               onChange={(e) =>
// //                 setSelectedStudent({
// //                   ...selectedStudent,
// //                   stdName: e.target.value,
// //                 })
// //               }
// //               className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
// //             />

// //             <input
// //               type="email"
// //               value={selectedStudent.stdEmail}
// //               onChange={(e) =>
// //                 setSelectedStudent({
// //                   ...selectedStudent,
// //                   stdEmail: e.target.value,
// //                 })
// //               }
// //               className="w-full border p-2 rounded mb-4 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
// //             />

// //             <div className="flex justify-end gap-2">
// //               <button
// //                 onClick={() => setSelectedStudent(null)}
// //                 className="text-sm px-3 py-1"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={handleUpdate}
// //                 className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
// //               >
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }  
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// export default function ManageStudents() {
//   const [students, setStudents] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [dept, setDept] = useState("");
//   const [year, setYear] = useState("");
//   const [section, setSection] = useState("");

//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const router = useRouter();
//   const limit = 10;

//   const fetchStudents = async () => {
//     try {
//       let query = `/institutes/getStudents?page=${page}&limit=${limit}`;

//       if (dept) query += `&dept=${dept}`;
//       if (year) query += `&year=${year}`;
//       if (section) query += `&section=${section}`;

//       const res = await api.get(query);

//       setStudents(res.data.students);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [page, dept, year, section]);

//   const handleUpdate = async () => {
//     try {
//       await api.patch(
//         `/institutes/updateStudent/${selectedStudent._id}`,
//         {
//           stdName: selectedStudent.stdName,
//           stdEmail: selectedStudent.stdEmail,
//         }
//       );

//       setSelectedStudent(null);
//       fetchStudents();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

//       {/* 🔥 HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Students</h1>
//           <p className="text-sm text-gray-500">
//             Manage and track student records
//           </p>
//         </div>

//         <button
//           onClick={() => router.push("/students/bulk-add")}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
//         >
//           + Bulk Add Students
//         </button>
//       </div>

//       {/* 🔹 FILTER CARD */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">

//         <select
//           value={dept}
//           onChange={(e) => {
//             setPage(1);
//             setDept(e.target.value);
//           }}
//           className="border px-3 py-2 rounded-md text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-400 outline-none"
//         >
//           <option value="">Department</option>
//           <option value="CSE">CSE</option>
//           <option value="ECE">ECE</option>
//           <option value="ME">ME</option>
//         </select>

//         <select
//           value={year}
//           onChange={(e) => {
//             setPage(1);
//             setYear(e.target.value);
//           }}
//           className="border px-3 py-2 rounded-md text-sm bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none"
//         >
//           <option value="">Year</option>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           <option value={3}>3</option>
//           <option value={4}>4</option>
//         </select>

//         <select
//           value={section}
//           onChange={(e) => {
//             setPage(1);
//             setSection(e.target.value);
//           }}
//           className="border px-3 py-2 rounded-md text-sm bg-purple-50 focus:ring-2 focus:ring-purple-400 outline-none"
//         >
//           <option value="">Section</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//           <option value="D">D</option>
//         </select>

//         <button
//           onClick={() => {
//             setDept("");
//             setYear("");
//             setSection("");
//             setPage(1);
//           }}
//           className="ml-auto text-sm text-indigo-600 hover:underline"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* 🔹 TABLE */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-600">
//             <tr>
//               <th className="text-left p-4 font-medium">Name</th>
//               <th className="text-left">Email</th>
//               <th>Roll</th>
//               <th>Status</th>
//               <th>Attendance</th>
//               <th className="text-right pr-4">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.length > 0 ? (
//               students.map((s) => (
//                 <tr
//                   key={s._id}
//                   className="border-t hover:bg-indigo-50/40 transition"
//                 >
//                   <td className="p-4 font-medium">{s.stdName}</td>
//                   <td className="text-gray-600">{s.stdEmail}</td>
//                   <td className="text-center">{s.stdRoll}</td>

//                   <td className="text-center">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full font-medium ${
//                         s.faceEnrollmentStatus === "COMPLETED"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-orange-100 text-orange-600"
//                       }`}
//                     >
//                       {s.faceEnrollmentStatus || "PENDING"}
//                     </span>
//                   </td>

//                   {/* 🔥 UPDATED ACTION COLUMN */}
//                   <td className="text-right pr-4">
//                     <div className="flex justify-end gap-3">

//                       {/* VIEW ATTENDANCE */}
//                       <button
//                         onClick={() =>
//                           router.push(`/students/view-ad?roll=${s.stdRoll}`)
//                         }
//                         className="text-green-600 hover:text-green-800 text-sm font-medium"
//                       >
//                         View
//                       </button>

//                       {/* EDIT */}
//                       <button
//                         onClick={() => setSelectedStudent(s)}
//                         className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//                       >
//                         Edit
//                       </button>

//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-6 text-gray-400">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 PAGINATION */}
//       <div className="flex justify-between items-center mt-6 text-sm">
//         <span className="text-gray-500">
//           Page {page} of {totalPages}
//         </span>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setPage((p) => p - 1)}
//             disabled={page === 1}
//             className="border px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
//           >
//             Prev
//           </button>

//           <button
//             onClick={() => setPage((p) => p + 1)}
//             disabled={page === totalPages}
//             className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* 🔥 EDIT MODAL */}
//       {selectedStudent && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
//           <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">
//               Edit Student
//             </h2>

//             <input
//               type="text"
//               value={selectedStudent.stdName}
//               onChange={(e) =>
//                 setSelectedStudent({
//                   ...selectedStudent,
//                   stdName: e.target.value,
//                 })
//               }
//               className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
//             />

//             <input
//               type="email"
//               value={selectedStudent.stdEmail}
//               onChange={(e) =>
//                 setSelectedStudent({
//                   ...selectedStudent,
//                   stdEmail: e.target.value,
//                 })
//               }
//               className="w-full border p-2 rounded mb-4 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setSelectedStudent(null)}
//                 className="text-sm px-3 py-1"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const router = useRouter();
  const limit = 10;

  const fetchStudents = async () => {
    try {
      let query = `/institutes/getStudents?page=${page}&limit=${limit}`;

      if (dept) query += `&dept=${dept}`;
      if (year) query += `&year=${year}`;
      if (section) query += `&section=${section}`;

      const res = await api.get(query);

      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, dept, year, section]);

  const handleUpdate = async () => {
    try {
      await api.patch(
        `/institutes/updateStudent/${selectedStudent._id}`,
        {
          stdName: selectedStudent.stdName,
          stdEmail: selectedStudent.stdEmail,
        }
      );

      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-gray-500">
            Manage and track student records
          </p>
        </div>

        <button
          onClick={() => router.push("/students/bulk-add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Bulk Add Students
        </button>
      </div>

      {/* 🔹 FILTERS */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 flex flex-wrap gap-3 items-center">

        <select
          value={dept}
          onChange={(e) => {
            setPage(1);
            setDept(e.target.value);
          }}
          className="border px-3 py-2 rounded-md bg-indigo-50"
        >
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <select
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(e.target.value);
          }}
          className="border px-3 py-2 rounded-md bg-blue-50"
        >
          <option value="">Year</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        <select
          value={section}
          onChange={(e) => {
            setPage(1);
            setSection(e.target.value);
          }}
          className="border px-3 py-2 rounded-md bg-purple-50"
        >
          <option value="">Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <button
          onClick={() => {
            setDept("");
            setYear("");
            setSection("");
            setPage(1);
          }}
          className="ml-auto text-sm text-indigo-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="text-left p-4">Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Status</th>
              <th>Attendance</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s) => {

                // 🔥 TEMP attendance (replace later with API)
                const attendancePercent = Math.floor(Math.random() * 100);

                let statusText = "Low";
                let statusColor = "bg-red-100 text-red-600";

                if (attendancePercent >= 75) {
                  statusText = "Active";
                  statusColor = "bg-green-100 text-green-700";
                } else if (attendancePercent >= 50) {
                  statusText = "Medium";
                  statusColor = "bg-yellow-100 text-yellow-700";
                }

                return (
                  <tr key={s._id} className="border-t hover:bg-indigo-50/40">

                    <td className="p-4 font-medium">{s.stdName}</td>
                    <td className="text-gray-600">{s.stdEmail}</td>
                    <td className="text-center">{s.stdRoll}</td>

                    {/* STATUS */}
                    <td className="text-center">
                      <span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>
                        {statusText}
                      </span>
                    </td>

                    {/* ATTENDANCE */}
                    <td className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{attendancePercent}%</span>

                        <div className="w-20 bg-gray-200 h-2 rounded mt-1">
                          <div
                            className={`h-2 rounded ${
                              attendancePercent >= 75
                                ? "bg-green-500"
                                : attendancePercent >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${attendancePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="pr-4">
                      <div className="flex flex-col items-end gap-1">

                        <button
                          onClick={() =>
                            router.push(`/students/view-ad?roll=${s.stdRoll}`)
                          }
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          View Attendance
                        </button>

                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          Edit
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No students found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* 🔹 PAGINATION */}
      <div className="flex justify-between mt-6">
        <span>Page {page} of {totalPages}</span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="border px-3 py-1 rounded"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* 🔥 EDIT MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">Edit Student</h2>

            <input
              value={selectedStudent.stdName}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, stdName: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              value={selectedStudent.stdEmail}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, stdEmail: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedStudent(null)}>Cancel</button>

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
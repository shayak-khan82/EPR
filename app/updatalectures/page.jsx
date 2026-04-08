
// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import api from "@/lib/api";

// // export default function UpdateLecturesPage() {
// //   const router = useRouter();

// //   const [selectedDate, setSelectedDate] = useState(
// //     new Date().toISOString().split("T")[0]
// //   );

// //   const [filters, setFilters] = useState({
// //     department: "",
// //     year: "",
// //     section: "",
// //   });

// //   const [lectures, setLectures] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [editingId, setEditingId] = useState(null);
// //   const [editData, setEditData] = useState({});
// //   const [deleteId, setDeleteId] = useState(null);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 10;

// //   // ---------------- FETCH ----------------
// //   const fetchLectures = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await api.get("/institutes/getLectures", {
// //         params: {
// //           start: selectedDate,
// //           end: selectedDate,
// //           department: filters.department.toUpperCase(),
// //           year: filters.year,
// //           section: filters.section,
// //         },
// //       });

// //       const sorted = (res.data.lectures || []).sort((a, b) =>
// //         a.startAt.localeCompare(b.startAt)
// //       );

// //       setLectures(sorted);
// //       setCurrentPage(1);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLectures();
// //   }, []);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchLectures();
// //   };

// //   // ---------------- EDIT ----------------
// //   const handleEdit = (lecture) => {
// //     setEditingId(lecture.lectureId);
// //     setEditData({
// //       startAt: lecture.startAt,
// //       endAt: lecture.endAt,
// //       subjectCode: lecture.subject.subCode,
// //       facultyEmail: lecture.faculty.facEmail,
// //     });
// //   };

// //   const handleSave = async (id) => {
// //     try {
// //       const res = await api.patch(`/institutes/updateLecture/${id}`, {
// //         startAt: editData.startAt,
// //         endAt: editData.endAt,
// //         subCode: editData.subjectCode,
// //         facEmail: editData.facultyEmail,
// //       });

// //       if (res.data.status === "success") {
// //         fetchLectures();
// //         setEditingId(null);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // ---------------- DELETE ----------------
// //   const confirmDelete = async () => {
// //     try {
// //       const res = await api.patch(
// //         `/institutes/updateLecture/${deleteId}`,
// //         { delete: true }
// //       );

// //       if (res.data.status === "success") {
// //         setLectures((prev) =>
// //           prev.filter((l) => l.lectureId !== deleteId)
// //         );
// //       }

// //       setDeleteId(null);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // ---------------- PAGINATION ----------------
// //   const indexOfLast = currentPage * rowsPerPage;
// //   const indexOfFirst = indexOfLast - rowsPerPage;
// //   const currentLectures = lectures.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(lectures.length / rowsPerPage);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 p-8">

// //       {/* HEADER */}
// //       <div className="flex items-center justify-between mb-6 text-white">
// //         <div>
// //           <h1 className="text-2xl font-semibold">Lectures</h1>
// //           <p className="text-sm text-gray-300">Manage and track lectures</p>
// //         </div>

// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => router.push("/lectures")}
// //             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
// //           >
// //             Lectures
// //           </button>

// //           <button
// //             onClick={() => router.push("/residuelectures")}
// //             className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
// //           >
// //             Residue Lectures
// //           </button>
// //         </div>
// //       </div>

// //       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

// //         {/* FILTERS */}
// //         <form
// //           onSubmit={handleSubmit}
// //           className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
// //         >
// //           <input
// //             placeholder="Department"
// //             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
// //             value={filters.department}
// //             onChange={(e) =>
// //               setFilters({ ...filters, department: e.target.value })
// //             }
// //           />

// //           <input
// //             type="number"
// //             placeholder="Year"
// //             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
// //             value={filters.year}
// //             onChange={(e) =>
// //               setFilters({ ...filters, year: e.target.value })
// //             }
// //           />

// //           <input
// //             placeholder="Section"
// //             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
// //             value={filters.section}
// //             onChange={(e) =>
// //               setFilters({ ...filters, section: e.target.value })
// //             }
// //           />

// //           <input
// //             type="date"
// //             className="border border-gray-300 rounded-lg px-4 py-2 text-black"
// //             value={selectedDate}
// //             onChange={(e) => setSelectedDate(e.target.value)}
// //           />

// //           <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
// //             Apply
// //           </button>
// //         </form>

// //         {/* TABLE */}
// //         {currentLectures.length > 0 ? (
// //           <>
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">

// //                 <thead className="bg-indigo-600 text-white">
// //                   <tr>
// //                     <th className="px-4 py-3 text-left">Date</th>
// //                     <th className="px-4 py-3 text-left">Start</th>
// //                     <th className="px-4 py-3 text-left">End</th>
// //                     <th className="px-4 py-3 text-left">Subject Code</th>
// //                     <th className="px-4 py-3 text-left">Faculty Email</th>
// //                     <th className="px-4 py-3 text-left">Actions</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody className="text-black">
// //                   {currentLectures.map((lecture) => (
// //                     <tr
// //                       key={lecture.lectureId}
// //                       className="border-b border-gray-300 hover:bg-gray-100 transition"
// //                     >
// //                       <td className="px-4 py-3 font-medium">{lecture.date}</td>

// //                       <td className="px-4 py-3">
// //                         {editingId === lecture.lectureId ? (
// //                           <input type="time" value={editData.startAt}
// //                             onChange={(e) =>
// //                               setEditData({ ...editData, startAt: e.target.value })
// //                             }
// //                           />
// //                         ) : lecture.startAt}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         {editingId === lecture.lectureId ? (
// //                           <input type="time" value={editData.endAt}
// //                             onChange={(e) =>
// //                               setEditData({ ...editData, endAt: e.target.value })
// //                             }
// //                           />
// //                         ) : lecture.endAt}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         {editingId === lecture.lectureId ? (
// //                           <input value={editData.subjectCode}
// //                             onChange={(e) =>
// //                               setEditData({ ...editData, subjectCode: e.target.value })
// //                             }
// //                           />
// //                         ) : lecture.subject.subCode}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         {editingId === lecture.lectureId ? (
// //                           <input value={editData.facultyEmail}
// //                             onChange={(e) =>
// //                               setEditData({ ...editData, facultyEmail: e.target.value })
// //                             }
// //                           />
// //                         ) : lecture.faculty.facEmail}
// //                       </td>

// //                       <td className="px-4 py-3 flex gap-2">
// //                         {editingId === lecture.lectureId ? (
// //                           <>
// //                             <button onClick={() => handleSave(lecture.lectureId)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
// //                             <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
// //                           </>
// //                         ) : (
// //                           <>
// //                             <button onClick={() => handleEdit(lecture)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
// //                             <button onClick={() => setDeleteId(lecture.lectureId)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
// //                           </>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* PAGINATION */}
// //             <div className="flex justify-between items-center mt-6">
// //               <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
// //                 className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50">
// //                 Previous
// //               </button>

// //               <span>Page {currentPage} of {totalPages}</span>

// //               <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
// //                 className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
// //                 Next
// //               </button>
// //             </div>
// //           </>
// //         ) : (
// //           !loading && <p className="text-center text-gray-500">No lectures found</p>
// //         )}
// //       </div>

// //       {/* DELETE MODAL */}
// //       {deleteId && (
// //         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
// //           <div className="bg-white p-6 rounded-xl">
// //             <p className="mb-4">Confirm Delete?</p>
// //             <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 mr-2">Yes</button>
// //             <button onClick={() => setDeleteId(null)} className="bg-gray-400 px-4 py-2">No</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// export default function UpdateLecturesPage() {
//   const router = useRouter();

//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     section: "",
//   });

//   const [lectures, setLectures] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [deleteId, setDeleteId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   // ---------------- FETCH ----------------
//   const fetchLectures = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/institutes/getLectures", {
//         params: {
//           start: selectedDate,
//           end: selectedDate,
//           department: filters.department?.toUpperCase() || "",
//           year: filters.year,
//           section: filters.section,
//         },
//       });

//       const sorted = (res.data.lectures || []).sort((a, b) =>
//         a.startAt.localeCompare(b.startAt)
//       );

//       setLectures(sorted);
//       setCurrentPage(1);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLectures();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchLectures();
//   };

//   // ---------------- EDIT ----------------
//   const handleEdit = (lecture) => {
//     setEditingId(lecture.lectureId);
//     setEditData({
//       startAt: lecture.startAt,
//       endAt: lecture.endAt,
//       subjectCode: lecture.subject.subCode,
//       facultyEmail: lecture.faculty.facEmail,
//     });
//   };

//   const handleSave = async (id) => {
//     try {
//       const lecture = lectures.find((l) => l.lectureId === id);

//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       const lectureDate = new Date(lecture.date);

//       if (lectureDate < today) {
//         alert("Cannot modify past lectures");
//         return;
//       }

//       const res = await api.patch(`/institutes/updateLecture/${id}`, {
//         startAt: editData.startAt,
//         endAt: editData.endAt,
//         subCode: editData.subjectCode,
//         facEmail: editData.facultyEmail,
//       });

//       if (res.data.status === "success") {
//         fetchLectures();
//         setEditingId(null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   // ---------------- DELETE ----------------
//   const confirmDelete = async () => {
//     try {
//       const res = await api.patch(
//         `/institutes/updateLecture/${deleteId}`,
//         { delete: true }
//       );

//       if (res.data.status === "success") {
//         setLectures((prev) =>
//           prev.filter((l) => l.lectureId !== deleteId)
//         );
//       }

//       setDeleteId(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ---------------- PAGINATION ----------------
//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentLectures = lectures.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(lectures.length / rowsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 p-8">

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6 text-white">
//         <div>
//           <h1 className="text-2xl font-semibold">Lectures</h1>
//           <p className="text-sm text-gray-300">Manage and track lectures</p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => router.push("/lectures")}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
//           >
//             Lectures
//           </button>

//           <button
//             onClick={() => router.push("/residuelectures")}
//             className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
//           >
//             Residue Lectures
//           </button>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

//         {/* FILTERS */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
//         >
//           <input
//             placeholder="Department"
//             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
//             value={filters.department}
//             onChange={(e) =>
//               setFilters({ ...filters, department: e.target.value })
//             }
//           />

//           <input
//             type="number"
//             placeholder="Year"
//             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
//             value={filters.year}
//             onChange={(e) =>
//               setFilters({ ...filters, year: e.target.value })
//             }
//           />

//           <input
//             placeholder="Section"
//             className="border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500"
//             value={filters.section}
//             onChange={(e) =>
//               setFilters({ ...filters, section: e.target.value })
//             }
//           />

//           <input
//             type="date"
//             className="border border-gray-300 rounded-lg px-4 py-2 text-black"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />

//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
//             Apply
//           </button>
//         </form>

//         {/* TABLE */}
//         {currentLectures.length > 0 ? (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">

//                 <thead className="bg-indigo-600 text-white">
//                   <tr>
//                     <th className="px-4 py-3 text-left">Date</th>
//                     <th className="px-4 py-3 text-left">Start</th>
//                     <th className="px-4 py-3 text-left">End</th>
//                     <th className="px-4 py-3 text-left">Subject Code</th>
//                     <th className="px-4 py-3 text-left">Faculty Email</th>
//                     <th className="px-4 py-3 text-left">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-black">
//                   {currentLectures.map((lecture) => (
//                     <tr key={lecture.lectureId} className="border-b border-gray-300 hover:bg-gray-100">

//                       <td className="px-4 py-3">{lecture.date}</td>
//                       <td className="px-4 py-3">{lecture.startAt}</td>
//                       <td className="px-4 py-3">{lecture.endAt}</td>
//                       <td className="px-4 py-3">{lecture.subject.subCode}</td>
//                       <td className="px-4 py-3">{lecture.faculty.facEmail}</td>

//                       {/* ✅ ACTIONS */}
//                       <td className="px-4 py-3 flex gap-2 items-center">

//                         <button
//                           onClick={() =>
//                             router.push(`/institutes/classAttd?lectureId=${lecture.lectureId}`)
//                           }
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
//                         >
//                           View
//                         </button>

//                         <button
//                           onClick={() => handleEdit(lecture)}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => setDeleteId(lecture.lectureId)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                         >
//                           Delete
//                         </button>

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             </div>

//             {/* PAGINATION */}
//             <div className="flex justify-between items-center mt-6">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => p - 1)}
//                 className="bg-gray-300 px-4 py-2 rounded"
//               >
//                 Previous
//               </button>

//               <span>Page {currentPage} of {totalPages}</span>

//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(p => p + 1)}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         ) : (
//           !loading && <p className="text-center text-gray-500">No lectures found</p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function UpdateLecturesPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    section: "",
  });

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  // ---------------- FETCH ----------------
  const fetchLectures = async () => {
    try {
      let query = `/institutes/getLectures?page=${page}&limit=${limit}`;

      if (filters.department) query += `&department=${filters.department}`;
      if (filters.year) query += `&year=${filters.year}`;
      if (filters.section) query += `&section=${filters.section}`;
      if (selectedDate) {
        query += `&start=${selectedDate}&end=${selectedDate}`;
      }

      const res = await api.get(query);

      setLectures(res.data.lectures || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [page, filters, selectedDate]);

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Lectures</h1>
          <p className="text-sm text-gray-500">
            Manage and track lectures
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push("/lectures")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
           Upload Lectures
          </button>

          <button
            onClick={() => router.push("/residuelectures")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Reschedule lecture
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 flex flex-wrap gap-3">

        <input
          placeholder="Department"
          value={filters.department}
          onChange={(e) => {
            setPage(1);
            setFilters({ ...filters, department: e.target.value });
          }}
          className="border px-3 py-2 rounded-md text-sm"
        />

        <input
          placeholder="Year"
          value={filters.year}
          onChange={(e) => {
            setPage(1);
            setFilters({ ...filters, year: e.target.value });
          }}
          className="border px-3 py-2 rounded-md text-sm"
        />

        <input
          placeholder="Section"
          value={filters.section}
          onChange={(e) => {
            setPage(1);
            setFilters({ ...filters, section: e.target.value });
          }}
          className="border px-3 py-2 rounded-md text-sm"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setPage(1);
            setSelectedDate(e.target.value);
          }}
          className="border px-3 py-2 rounded-md text-sm"
        />

        <button
          onClick={() => {
            setFilters({ department: "", year: "", section: "" });
            setSelectedDate(new Date().toISOString().split("T")[0]);
            setPage(1);
          }}
          className="ml-auto text-sm text-indigo-600"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="text-left">Start</th>
              <th className="text-left">End</th>
              <th className="text-left">Subject</th>
              <th className="text-left">Faculty</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <tr key={lecture.lectureId} className="border-t">

                  <td className="p-4">{lecture.date}</td>
                  <td>{lecture.startAt}</td>
                  <td>{lecture.endAt}</td>
                  <td>{lecture.subject.subCode}</td>
                  <td>{lecture.faculty.facEmail}</td>

                  {/* ACTION */}
                  <td className="text-right pr-4 space-x-3">

                    <button
                      onClick={() =>
                        router.push(`/updatalectures/view?lectureId=${lecture.lectureId}`)
                      }
                      className="text-green-600 font-medium"
                    >
                      View
                    </button>

                    <button
                      className="text-indigo-600 font-medium"
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              // <tr>
              //   <td colSpan="6" className="text-center p-6 text-gray-400">
              //     No lectures found
              //   </td>
              // </tr>
              <tr>
  <td colSpan="6" className="text-center p-8 text-gray-400">
    <div className="flex flex-col items-center gap-2">
      <p>
        No lectures found on{" "}
        <span className="font-medium text-gray-600">
          {new Date(selectedDate).toLocaleDateString("en-GB")}
        </span>
      </p>
    </div>
  </td>
</tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
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

    </div>
  );
}
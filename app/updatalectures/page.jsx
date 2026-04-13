// // // // // "use client";
// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import api from "@/lib/api";

// // // // // const getLocalDate = () => {
// // // // //   const date = new Date();
// // // // //   const offset = date.getTimezoneOffset();
// // // // //   const local = new Date(date.getTime() - offset * 60000);
// // // // //   return local.toISOString().split("T")[0];
// // // // // };

// // // // // export default function UpdateLecturesPage() {
// // // // //   const router = useRouter();

// // // // //   const [selectedDate, setSelectedDate] = useState(getLocalDate());

// // // // //   const [filters, setFilters] = useState({
// // // // //     department: "",
// // // // //     year: "",
// // // // //     section: "",
// // // // //   });

// // // // //   const [lectures, setLectures] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const [page, setPage] = useState(1);
// // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // //   // ✅ EDIT / DELETE
// // // // //   const [editingId, setEditingId] = useState(null);
// // // // //   const [editData, setEditData] = useState({});

// // // // //   const limit = 10;

// // // // //   // ---------------- FETCH ----------------
// // // // //   const fetchLectures = async () => {
// // // // //     try {
// // // // //       let res;

// // // // //       // ✅ FILTER → RANGE API
// // // // //       if (filters.department || filters.year || filters.section) {
// // // // //         let query = `/institutes/getLectures?page=${page}&limit=${limit}`;

// // // // //         if (filters.department) query += `&department=${filters.department}`;
// // // // //         if (filters.year) query += `&year=${filters.year}`;
// // // // //         if (filters.section) query += `&section=${filters.section}`;

// // // // //         query += `&start=${selectedDate}&end=${selectedDate}`;

// // // // //         res = await api.get(query);

// // // // //         setLectures(res.data.lectures || []);
// // // // //         setTotalPages(res.data.totalPages || 1);

// // // // //       } else {
// // // // //         // ✅ DEFAULT → TODAY VIEW
// // // // //         const res2 = await api.get(
// // // // //           `/institutes/getAllLectures?date=${selectedDate}`
// // // // //         );

// // // // //         setLectures(res2.data.lectures || []);
// // // // //         setTotalPages(1);
// // // // //       }

// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchLectures();
// // // // //   }, [filters, selectedDate, page]);

// // // // //   // ---------------- DATE NAV ----------------
// // // // //   const handleNextDay = () => {
// // // // //     const next = new Date(selectedDate);
// // // // //     next.setDate(next.getDate() + 1);
// // // // //     setSelectedDate(next.toISOString().split("T")[0]);
// // // // //   };

// // // // //   const handlePrevDay = () => {
// // // // //     const prev = new Date(selectedDate);
// // // // //     prev.setDate(prev.getDate() - 1);
// // // // //     setSelectedDate(prev.toISOString().split("T")[0]);
// // // // //   };

// // // // //   // ---------------- EDIT ----------------
// // // // //   const handleEdit = (lecture) => {
// // // // //     setEditingId(lecture.lectureId);
// // // // //     setEditData({
// // // // //       startAt: lecture.startAt,
// // // // //       endAt: lecture.endAt,
// // // // //       subCode: lecture.subject.subCode,
// // // // //       facEmail: lecture.faculty.facEmail,
// // // // //     });
// // // // //   };

// // // // //   const handleSave = async (id) => {
// // // // //     try {
// // // // //       const res = await api.patch(`/institutes/updateLecture/${id}`, editData);
// // // // //       if (res.data.status === "success") {
// // // // //         fetchLectures();
// // // // //         setEditingId(null);
// // // // //       }
// // // // //     } catch (e) {
// // // // //       console.error(e);
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (id) => {
// // // // //     try {
// // // // //       const res = await api.patch(`/institutes/updateLecture/${id}`, {
// // // // //         delete: true,
// // // // //       });

// // // // //       if (res.data.status === "success") {
// // // // //         setLectures((prev) => prev.filter((l) => l.lectureId !== id));
// // // // //       }
// // // // //     } catch (e) {
// // // // //       console.error(e);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

// // // // //       {/* ✅ HEADER RESTORED */}
// // // // //       <div className="flex items-center justify-between mb-6">
// // // // //         <div>
// // // // //           <h1 className="text-2xl font-semibold">Lectures</h1>
// // // // //           <p className="text-sm text-gray-500">
// // // // //             Manage and track lectures
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="flex gap-2">
// // // // //           <button
// // // // //             onClick={() => router.push("/lectures")}
// // // // //             className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
// // // // //           >
// // // // //             Upload Lectures
// // // // //           </button>

// // // // //           <button
// // // // //             onClick={() => router.push("/residuelectures")}
// // // // //             className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
// // // // //           >
// // // // //             Reschedule lecture
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ✅ FILTER SAME */}
// // // // //       <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 flex flex-wrap gap-3">

// // // // //         <input
// // // // //           placeholder="Department"
// // // // //           value={filters.department}
// // // // //           onChange={(e) => setFilters({ ...filters, department: e.target.value })}
// // // // //           className="border px-3 py-2 rounded-md text-sm"
// // // // //         />

// // // // //         <input
// // // // //           placeholder="Year"
// // // // //           value={filters.year}
// // // // //           onChange={(e) => setFilters({ ...filters, year: e.target.value })}
// // // // //           className="border px-3 py-2 rounded-md text-sm"
// // // // //         />

// // // // //         <input
// // // // //           placeholder="Section"
// // // // //           value={filters.section}
// // // // //           onChange={(e) => setFilters({ ...filters, section: e.target.value })}
// // // // //           className="border px-3 py-2 rounded-md text-sm"
// // // // //         />

// // // // //         <input
// // // // //           type="date"
// // // // //           value={selectedDate}
// // // // //           onChange={(e) => setSelectedDate(e.target.value)}
// // // // //           className="border px-3 py-2 rounded-md text-sm"
// // // // //         />

// // // // //         <button onClick={handlePrevDay} className="border px-3 py-2 rounded-md text-sm">
// // // // //           Prev Day
// // // // //         </button>

// // // // //         <button onClick={handleNextDay} className="border px-3 py-2 rounded-md text-sm">
// // // // //           Next Day
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* ✅ TABLE SAME */}
// // // // //       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
// // // // //         <table className="w-full text-sm">
// // // // //           <thead className="bg-gray-100">
// // // // //             <tr>
// // // // //               <th className="p-4 text-left">Date</th>
// // // // //               <th>Start</th>
// // // // //               <th>End</th>
// // // // //               <th>Subject</th>
// // // // //               <th>Faculty</th>
// // // // //               <th className="text-right pr-4">Action</th>
// // // // //             </tr>
// // // // //           </thead>

// // // // //           <tbody>
// // // // //             {lectures.map((lecture) => (
// // // // //               <tr key={lecture.lectureId} className="border-t">
// // // // //                 <td className="p-4">{lecture.date}</td>

// // // // //                 <td>
// // // // //                   {editingId === lecture.lectureId ? (
// // // // //                     <input
// // // // //                       value={editData.startAt}
// // // // //                       onChange={(e) =>
// // // // //                         setEditData({ ...editData, startAt: e.target.value })
// // // // //                       }
// // // // //                     />
// // // // //                   ) : lecture.startAt}
// // // // //                 </td>

// // // // //                 <td>
// // // // //                   {editingId === lecture.lectureId ? (
// // // // //                     <input
// // // // //                       value={editData.endAt}
// // // // //                       onChange={(e) =>
// // // // //                         setEditData({ ...editData, endAt: e.target.value })
// // // // //                       }
// // // // //                     />
// // // // //                   ) : lecture.endAt}
// // // // //                 </td>

// // // // //                 <td>{lecture.subject.subCode}</td>
// // // // //                 <td>{lecture.faculty.facEmail}</td>

// // // // //                 <td className="text-right pr-4 space-x-3">
// // // // //                   <button
// // // // //                     onClick={() =>
// // // // //                       router.push(`/updatalectures/view?lectureId=${lecture.lectureId}`)
// // // // //                     }
// // // // //                     className="text-green-600"
// // // // //                   >
// // // // //                     View
// // // // //                   </button>

// // // // //                   {editingId === lecture.lectureId ? (
// // // // //                     <button onClick={() => handleSave(lecture.lectureId)}>
// // // // //                       Save
// // // // //                     </button>
// // // // //                   ) : (
// // // // //                     <button onClick={() => handleEdit(lecture)}>Edit</button>
// // // // //                   )}

// // // // //                   <button onClick={() => handleDelete(lecture.lectureId)}>
// // // // //                     Delete
// // // // //                   </button>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";
// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import api from "@/lib/api";

// // // // const getLocalDate = () => {
// // // //   const d = new Date();
// // // //   const offset = d.getTimezoneOffset();
// // // //   const local = new Date(d.getTime() - offset * 60000);
// // // //   return local.toISOString().split("T")[0];
// // // // };

// // // // export default function Page() {
// // // //   const router = useRouter();

// // // //   const [mode, setMode] = useState("today");
// // // //   const [selectedDate, setSelectedDate] = useState(getLocalDate());

// // // //   const [filters, setFilters] = useState({
// // // //     department: "",
// // // //     year: "",
// // // //     section: "",
// // // //     start: "",
// // // //     end: "",
// // // //   });

// // // //   const [lectures, setLectures] = useState([]);

// // // //   // ---------------- TODAY ----------------
// // // //   const fetchTodayLectures = async (date) => {
// // // //     const res = await api.get(`/institutes/getAllLectures?date=${date}`);
// // // //     setLectures(res.data.lectures || []);
// // // //   };

// // // //   // ---------------- FILTER ----------------
// // // //   const fetchFilteredLectures = async () => {
// // // //     let query = `/institutes/getLectures?page=1&limit=10`;

// // // //     if (filters.department) query += `&department=${filters.department}`;
// // // //     if (filters.year) query += `&year=${filters.year}`;
// // // //     if (filters.section) query += `&section=${filters.section}`;

// // // //     query += `&start=${filters.start}&end=${filters.end}`;

// // // //     const res = await api.get(query);
// // // //     setLectures(res.data.lectures || []);
// // // //   };

// // // //   useEffect(() => {
// // // //     if (mode === "today") fetchTodayLectures(selectedDate);
// // // //   }, [selectedDate, mode]);

// // // //   const nextDay = () => {
// // // //     const d = new Date(selectedDate);
// // // //     d.setDate(d.getDate() + 1);
// // // //     setSelectedDate(d.toISOString().split("T")[0]);
// // // //     setMode("today");
// // // //   };

// // // //   const prevDay = () => {
// // // //     const d = new Date(selectedDate);
// // // //     d.setDate(d.getDate() - 1);
// // // //     setSelectedDate(d.toISOString().split("T")[0]);
// // // //     setMode("today");
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 p-6">

// // // //       {/* HEADER */}
// // // //       <div className="flex items-center justify-between mb-6">
// // // //         <div>
// // // //           <h1 className="text-2xl font-semibold text-gray-800">Lectures</h1>
// // // //           <p className="text-sm text-gray-500">Manage and track lectures</p>
// // // //         </div>

// // // //         <div className="flex gap-3">
// // // //           <button
// // // //             onClick={() => router.push("/lectures")}
// // // //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
// // // //           >
// // // //             Upload Lectures
// // // //           </button>

// // // //           <button
// // // //             onClick={() => router.push("/residuelectures")}
// // // //             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
// // // //           >
// // // //             Reschedule Lecture
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* DATE NAV */}
// // // //       <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center justify-between">
// // // //         <div className="flex gap-2">
// // // //           <button
// // // //             onClick={prevDay}
// // // //             className="border px-4 py-2 rounded-md hover:bg-gray-100"
// // // //           >
// // // //             ⬅ Prev
// // // //           </button>

// // // //           <button
// // // //             onClick={nextDay}
// // // //             className="border px-4 py-2 rounded-md hover:bg-gray-100"
// // // //           >
// // // //             Next ➡
// // // //           </button>
// // // //         </div>

// // // //         <span className="font-medium text-gray-700">{selectedDate}</span>
// // // //       </div>

// // // //       {/* FILTER */}
// // // //       <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3">

// // // //         <input
// // // //           placeholder="Department"
// // // //           className="border px-3 py-2 rounded-md"
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, department: e.target.value })
// // // //           }
// // // //         />

// // // //         <input
// // // //           placeholder="Year"
// // // //           className="border px-3 py-2 rounded-md"
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, year: e.target.value })
// // // //           }
// // // //         />

// // // //         <input
// // // //           placeholder="Section"
// // // //           className="border px-3 py-2 rounded-md"
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, section: e.target.value })
// // // //           }
// // // //         />

// // // //         <input
// // // //           type="date"
// // // //           className="border px-3 py-2 rounded-md"
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, start: e.target.value })
// // // //           }
// // // //         />

// // // //         <input
// // // //           type="date"
// // // //           className="border px-3 py-2 rounded-md"
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, end: e.target.value })
// // // //           }
// // // //         />

// // // //         <button
// // // //           onClick={() => {
// // // //             setMode("filter");
// // // //             fetchFilteredLectures();
// // // //           }}
// // // //           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
// // // //         >
// // // //           Fetch
// // // //         </button>

// // // //         <button
// // // //           onClick={() => {
// // // //             setMode("today");
// // // //             fetchTodayLectures(selectedDate);
// // // //           }}
// // // //           className="bg-gray-200 px-4 py-2 rounded-md"
// // // //         >
// // // //           Today
// // // //         </button>
// // // //       </div>

// // // //       {/* TABLE */}
// // // //       <div className="bg-white rounded-xl shadow overflow-hidden">
// // // //         <table className="w-full text-sm">
// // // //           <thead className="bg-gray-100 text-gray-700">
// // // //             <tr>
// // // //               <th className="p-4 text-left">Date</th>
// // // //               <th>Start</th>
// // // //               <th>End</th>
// // // //               <th>Subject</th>
// // // //               <th>Faculty</th>
// // // //               <th className="text-right pr-4">Action</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {lectures.length > 0 ? (
// // // //               lectures.map((l) => (
// // // //                 <tr key={l.lectureId} className="border-t hover:bg-gray-50">
// // // //                   <td className="p-4">{l.date}</td>
// // // //                   <td>{l.startAt}</td>
// // // //                   <td>{l.endAt}</td>
// // // //                   <td>{l.subject.subCode}</td>
// // // //                   <td>{l.faculty.facEmail}</td>

// // // //                   <td className="text-right pr-4 space-x-3">
// // // //                     <button className="text-green-600 font-medium">View</button>
// // // //                     <button className="text-indigo-600 font-medium">Edit</button>
// // // //                     <button className="text-red-600 font-medium">Delete</button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             ) : (
// // // //               <tr>
// // // //                 <td colSpan="6" className="text-center p-6 text-gray-400">
// // // //                   No lectures found
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import api from "@/lib/api";

// // // const getLocalDate = () => {
// // //   const d = new Date();
// // //   const offset = d.getTimezoneOffset();
// // //   const local = new Date(d.getTime() - offset * 60000);
// // //   return local.toISOString().split("T")[0];
// // // };

// // // export default function Page() {
// // //   const router = useRouter();

// // //   const [mode, setMode] = useState("today");
// // //   const [selectedDate, setSelectedDate] = useState(getLocalDate());

// // //   const [filters, setFilters] = useState({
// // //     department: "",
// // //     year: "",
// // //     section: "",
// // //     start: "",
// // //     end: "",
// // //   });

// // //   const [lectures, setLectures] = useState([]);

// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);

// // //   const [editingId, setEditingId] = useState(null);
// // //   const [editData, setEditData] = useState({});

// // //   // const limit = 5;

// // //   // // ---------------- FETCH ----------------
// // //   // const fetchTodayLectures = async (date) => {
// // //   //   const res = await api.get(`/institutes/getAllLectures?date=${date}`);
// // //   //   setLectures(res.data.lectures || []);
// // //   //   setTotalPages(1);
// // //   // };

// // //   // const fetchFilteredLectures = async () => {
// // //   //   let query = `/institutes/getLectures?page=${page}&limit=${limit}`;

// // //   //   if (filters.department) query += `&department=${filters.department}`;
// // //   //   if (filters.year) query += `&year=${filters.year}`;
// // //   //   if (filters.section) query += `&section=${filters.section}`;

// // //   //   query += `&start=${filters.start}&end=${filters.end}`;

// // //   //   const res = await api.get(query);

// // //   //   setLectures(res.data.lectures || []);
// // //   //   setTotalPages(res.data.totalPages || 1);
// // //   // };

// // //   // useEffect(() => {
// // //   //   if (mode === "today") {
// // //   //     fetchTodayLectures(selectedDate);
// // //   //   } else {
// // //   //     fetchFilteredLectures();
// // //   //   }
// // //   // }, [selectedDate, page, mode]);

// // //   // // ---------------- DATE NAV ----------------
// // //   // const nextDay = () => {
// // //   //   const d = new Date(selectedDate);
// // //   //   d.setDate(d.getDate() + 1);
// // //   //   setSelectedDate(d.toISOString().split("T")[0]);
// // //   //   setMode("today");
// // //   // };

// // //   // const prevDay = () => {
// // //   //   const d = new Date(selectedDate);
// // //   //   d.setDate(d.getDate() - 1);
// // //   //   setSelectedDate(d.toISOString().split("T")[0]);
// // //   //   setMode("today");
// // //   // };

// // //   // // ---------------- EDIT ----------------
// // //   // const handleEdit = (lec) => {
// // //   //   setEditingId(lec.lectureId);
// // //   //   setEditData({
// // //   //     startAt: lec.startAt,
// // //   //     endAt: lec.endAt,
// // //   //     subCode: lec.subject.subCode,
// // //   //     facEmail: lec.faculty.facEmail,
// // //   //   });
// // //   // };

// // //   // const handleSave = async (id) => {
// // //   //   await api.patch(`/institutes/updateLecture/${id}`, editData);
// // //   //   setEditingId(null);
// // //   //   fetchFilteredLectures();
// // //   // };

// // //   // // ---------------- DELETE ----------------
// // //   // const handleDelete = async (id) => {
// // //   //   await api.patch(`/institutes/updateLecture/${id}`, { delete: true });
// // //   //   setLectures((prev) => prev.filter((l) => l.lectureId !== id));
// // //   // };

// // //   // return (
// // //   //   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 text-white">

// // //   //     {/* HEADER */}
// // //   //     <div className="flex justify-between mb-6">
// // //   //       <h1 className="text-2xl font-bold">Lectures</h1>

// // //   //       <div className="flex gap-3">
// // //   //         <button
// // //   //           onClick={() => router.push("/lectures")}
// // //   //           className="bg-blue-600 px-4 py-2 rounded-lg"
// // //   //         >
// // //   //           Upload
// // //   //         </button>

// // //   //         <button
// // //   //           onClick={() => router.push("/residuelectures")}
// // //   //           className="bg-purple-600 px-4 py-2 rounded-lg"
// // //   //         >
// // //   //           Reschedule
// // //   //         </button>
// // //   //       </div>
// // //   //     </div>

// // //   //     {/* DATE NAV */}
// // //   //     <div className="flex justify-between mb-4">
// // //   //       <div className="flex gap-2">
// // //   //         <button onClick={prevDay} className="bg-gray-700 px-3 py-1 rounded">
// // //   //           Prev
// // //   //         </button>
// // //   //         <button onClick={nextDay} className="bg-gray-700 px-3 py-1 rounded">
// // //   //           Next
// // //   //         </button>
// // //   //       </div>

// // //   //       <span className="font-semibold">{selectedDate}</span>
// // //   //     </div>

// // //   //     {/* FILTER */}
// // //   //     <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-3">
// // //   //       <input placeholder="Dept" className="px-2 py-1 rounded text-black"
// // //   //         onChange={(e)=>setFilters({...filters,department:e.target.value})}/>
// // //   //       <input placeholder="Year" className="px-2 py-1 rounded text-black"
// // //   //         onChange={(e)=>setFilters({...filters,year:e.target.value})}/>
// // //   //       <input placeholder="Section" className="px-2 py-1 rounded text-black"
// // //   //         onChange={(e)=>setFilters({...filters,section:e.target.value})}/>
// // //   //       <input type="date" className="text-black px-2 py-1 rounded"
// // //   //         onChange={(e)=>setFilters({...filters,start:e.target.value})}/>
// // //   //       <input type="date" className="text-black px-2 py-1 rounded"
// // //   //         onChange={(e)=>setFilters({...filters,end:e.target.value})}/>

// // //   //       <button
// // //   //         onClick={() => {
// // //   //           setMode("filter");
// // //   //           setPage(1);
// // //   //           fetchFilteredLectures();
// // //   //         }}
// // //   //         className="bg-indigo-600 px-3 py-1 rounded"
// // //   //       >
// // //           Fetch
// // //         </button>
// // //       </div>

// // //       {/* TABLE */}
// // //       <div className="bg-gray-800 rounded-lg overflow-hidden">
// // //         <table className="w-full text-sm">
// // //           <thead className="bg-gray-700">
// // //             <tr>
// // //               <th className="p-3">Date</th>
// // //               <th>Start</th>
// // //               <th>End</th>
// // //               <th>Subject</th>
// // //               <th>Faculty</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {lectures.map((l) => (
// // //               <tr key={l.lectureId} className="border-t border-gray-700">

// // //                 <td className="p-3">{l.date}</td>

// // //                 <td>
// // //                   {editingId === l.lectureId ? (
// // //                     <input
// // //                       value={editData.startAt}
// // //                       onChange={(e)=>setEditData({...editData,startAt:e.target.value})}
// // //                       className="text-black px-1"
// // //                     />
// // //                   ) : l.startAt}
// // //                 </td>

// // //                 <td>
// // //                   {editingId === l.lectureId ? (
// // //                     <input
// // //                       value={editData.endAt}
// // //                       onChange={(e)=>setEditData({...editData,endAt:e.target.value})}
// // //                       className="text-black px-1"
// // //                     />
// // //                   ) : l.endAt}
// // //                 </td>

// // //                 <td>{l.subject.subCode}</td>
// // //                 <td>{l.faculty.facEmail}</td>

// // //                 <td className="space-x-2">
// // //                   <button
// // //                     onClick={() =>
// // //                       router.push(`/updatalectures/view?lectureId=${l.lectureId}`)
// // //                     }
// // //                     className="text-green-400"
// // //                   >
// // //                     View
// // //                   </button>

// // //                   {editingId === l.lectureId ? (
// // //                     <button
// // //                       onClick={() => handleSave(l.lectureId)}
// // //                       className="text-yellow-400"
// // //                     >
// // //                       Save
// // //                     </button>
// // //                   ) : (
// // //                     <button
// // //                       onClick={() => handleEdit(l)}
// // //                       className="text-blue-400"
// // //                     >
// // //                       Edit
// // //                     </button>
// // //                   )}

// // //                   <button
// // //                     onClick={() => handleDelete(l.lectureId)}
// // //                     className="text-red-400"
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </td>

// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* PAGINATION */}
// // //       <div className="flex justify-between mt-4">
// // //         <span>Page {page} of {totalPages}</span>

// // //         <div className="flex gap-2">
// // //           <button
// // //             onClick={() => setPage((p) => p - 1)}
// // //             disabled={page === 1}
// // //             className="bg-gray-700 px-3 py-1 rounded"
// // //           >
// // //             Prev
// // //           </button>

// // //           <button
// // //             onClick={() => setPage((p) => p + 1)}
// // //             disabled={page === totalPages}
// // //             className="bg-indigo-600 px-3 py-1 rounded"
// // //           >
// // //             Next
// // //           </button>
// // //         </div>
// // //       </div>

// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import api from "@/lib/api";

// // const getLocalDate = () => {
// //   const d = new Date();
// //   const offset = d.getTimezoneOffset();
// //   const local = new Date(d.getTime() - offset * 60000);
// //   return local.toISOString().split("T")[0];
// // };

// // export default function Page() {
// //   const router = useRouter();

// //   const [mode, setMode] = useState("today");
// //   const [selectedDate, setSelectedDate] = useState(getLocalDate());

// //   const [filters, setFilters] = useState({
// //     department: "",
// //     year: "",
// //     section: "",
// //     start: "",
// //     end: "",
// //   });

// //   const [lectures, setLectures] = useState([]);

// //   // ✅ PAGINATION STATE
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const limit = 10;

// //   // ---------------- TODAY ----------------
// //   const fetchTodayLectures = async (date) => {
// //     const res = await api.get(`/institutes/getAllLectures?date=${date}`);
// //     setLectures(res.data.lectures || []);
// //     setTotalPages(1);
// //   };

// //   // ---------------- FILTER ----------------
// //   const fetchFilteredLectures = async () => {
// //     let query = `/institutes/getLectures?page=${page}&limit=${limit}`;

// //     if (filters.department) query += `&department=${filters.department}`;
// //     if (filters.year) query += `&year=${filters.year}`;
// //     if (filters.section) query += `&section=${filters.section}`;

// //     query += `&start=${filters.start}&end=${filters.end}`;

// //     const res = await api.get(query);

// //     setLectures(res.data.lectures || []);
// //     setTotalPages(res.data.totalPages || 1);
// //   };

// //   useEffect(() => {
// //     if (mode === "today") {
// //       fetchTodayLectures(selectedDate);
// //     } else {
// //       fetchFilteredLectures();
// //     }
// //   }, [selectedDate, page, mode]);

// //   // ---------------- DATE NAV ----------------
// //   const nextDay = () => {
// //     const d = new Date(selectedDate);
// //     d.setDate(d.getDate() + 1);
// //     setSelectedDate(d.toISOString().split("T")[0]);
// //     setMode("today");
// //   };

// //   const prevDay = () => {
// //     const d = new Date(selectedDate);
// //     d.setDate(d.getDate() - 1);
// //     setSelectedDate(d.toISOString().split("T")[0]);
// //     setMode("today");
// //   };

// //   // ---------------- DELETE (UNCHANGED) ----------------
// //   const handleDelete = async (id) => {
// //     try {
// //       await api.patch(`/institutes/updateLecture/${id}`, {
// //         delete: true,
// //       });

// //       setLectures((prev) => prev.filter((l) => l.lectureId !== id));
// //     } catch (err) {
// //       console.error(err.response?.data);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white p-6">

// //       {/* HEADER */}
// //       <div className="flex justify-between mb-6">
// //         <h1 className="text-2xl font-bold">Lectures</h1>

// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => router.push("/lectures")}
// //             className="bg-blue-600 px-4 py-2 rounded-lg"
// //           >
// //             Upload
// //           </button>

// //           <button
// //             onClick={() => router.push("/residuelectures")}
// //             className="bg-purple-600 px-4 py-2 rounded-lg"
// //           >
// //             Reschedule
// //           </button>
// //         </div>
// //       </div>

// //       {/* DATE NAV */}
// //       <div className="flex justify-between mb-4">
// //         <div className="flex gap-2">
// //           <button onClick={prevDay} className="bg-gray-700 px-3 py-1 rounded">
// //             Prev
// //           </button>
// //           <button onClick={nextDay} className="bg-gray-700 px-3 py-1 rounded">
// //             Next
// //           </button>
// //         </div>

// //         <span>{selectedDate}</span>
// //       </div>

// //       {/* FILTER */}
// //       <div className="bg-gray-900 p-4 rounded-lg mb-6 flex flex-wrap gap-3">

// //         <input
// //           placeholder="Dept"
// //           className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
// //           onChange={(e)=>setFilters({...filters,department:e.target.value})}
// //         />

// //         <input
// //           placeholder="Year"
// //           className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
// //           onChange={(e)=>setFilters({...filters,year:e.target.value})}
// //         />

// //         <input
// //           placeholder="Section"
// //           className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
// //           onChange={(e)=>setFilters({...filters,section:e.target.value})}
// //         />

// //         <input
// //           type="date"
// //           className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
// //           onChange={(e)=>setFilters({...filters,start:e.target.value})}
// //         />

// //         <input
// //           type="date"
// //           className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
// //           onChange={(e)=>setFilters({...filters,end:e.target.value})}
// //         />

// //         <button
// //           onClick={() => {
// //             setMode("filter");
// //             setPage(1); // ✅ important
// //           }}
// //           className="bg-indigo-600 px-3 py-1 rounded"
// //         >
// //           Fetch
// //         </button>
// //       </div>

// //       {/* TABLE */}
// //       <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
// //         <table className="w-full text-sm">
// //           <thead className="bg-gray-800 text-gray-200">
// //             <tr>
// //               <th className="p-3">Date</th>
// //               <th>Start</th>
// //               <th>End</th>
// //               <th>Subject</th>
// //               <th>Faculty</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {lectures.map((l) => (
// //               <tr key={l.lectureId} className="border-t border-gray-700 hover:bg-gray-800">

// //                 <td className="p-3">{l.date}</td>
// //                 <td>{l.startAt}</td>
// //                 <td>{l.endAt}</td>
// //                 <td>{l.subject.subCode}</td>
// //                 <td>{l.faculty.facEmail}</td>

// //                 <td className="space-x-2">
// //                   <button
// //                     onClick={() =>
// //                       router.push(`/updatalectures/view?lectureId=${l.lectureId}`)
// //                     }
// //                     className="text-green-400"
// //                   >
// //                     View
// //                   </button>

// //                   <button className="text-blue-400">Edit</button>

// //                   <button
// //                     onClick={() => handleDelete(l.lectureId)}
// //                     className="text-red-400"
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>

// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* PAGINATION */}
// //       <div className="flex justify-between mt-4">
// //         <span>Page {page} of {totalPages}</span>

// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => setPage((p) => p - 1)}
// //             disabled={page === 1}
// //             className="bg-gray-700 px-3 py-1 rounded disabled:opacity-40"
// //           >
// //             Prev
// //           </button>

// //           <button
// //             onClick={() => setPage((p) => p + 1)}
// //             disabled={page === totalPages}
// //             className="bg-indigo-600 px-3 py-1 rounded disabled:opacity-40"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// const getLocalDate = () => {
//   const d = new Date();
//   const offset = d.getTimezoneOffset();
//   const local = new Date(d.getTime() - offset * 60000);
//   return local.toISOString().split("T")[0];
// };

// export default function Page() {
//   const router = useRouter();

//   const [mode, setMode] = useState("today");
//   const [selectedDate, setSelectedDate] = useState(getLocalDate());

//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     section: "",
//     start: "",
//     end: "",
//   });

//   const [lectures, setLectures] = useState([]);
//   const [allLectures, setAllLectures] = useState([]);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   // ✅ EDIT STATE
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});
  

//   // ---------------- TODAY ----------------
//   const fetchTodayLectures = async (date) => {
//     const res = await api.get(`/institutes/getAllLectures?date=${date}`);
//     setLectures(res.data.lectures || []);
//     setTotalPages(1);
//   };

//   // ---------------- FILTER ----------------
//   const fetchFilteredLectures = async () => {
//     let query = `/institutes/getLectures?page=${page}&limit=${limit}`;

//     if (filters.department) query += `&department=${filters.department}`;
//     if (filters.year) query += `&year=${filters.year}`;
//     if (filters.section) query += `&section=${filters.section}`;

//     query += `&start=${filters.start}&end=${filters.end}`;

//     const res = await api.get(query);

//     setLectures(res.data.lectures || []);
//     setTotalPages(res.data.totalPages || 1);
//   };

//   useEffect(() => {
//     if (mode === "today") {
//       fetchTodayLectures(selectedDate);
//     } else {
//       fetchFilteredLectures();
//     }
//   }, [selectedDate, page, mode]);
// const handlePrevPage = () => {
//   if (page > 1) {
//     setPage((prev) => prev - 1);
//   }
// };

// const handleNextPage = () => {
//   if (page < totalPages) {
//     setPage((prev) => prev + 1);
//   }
// };
//   // ---------------- DATE NAV ----------------
//   const nextDay = () => {
//     const d = new Date(selectedDate);
//     d.setDate(d.getDate() + 1);
//     setSelectedDate(d.toISOString().split("T")[0]);
//     setMode("today");
//   };

//   const prevDay = () => {
//     const d = new Date(selectedDate);
//     d.setDate(d.getDate() - 1);
//     setSelectedDate(d.toISOString().split("T")[0]);
//     setMode("today");
//   };

//   // ---------------- EDIT ----------------
//   const handleEdit = (l) => {
//     setEditingId(l.lectureId);
//     setEditData({
//       startAt: l.startAt,
//       endAt: l.endAt,
//       subjectCode: l.subject.subCode,
//       facultyEmail: l.faculty.facEmail,
//     });
//   };

 
//   // ---------------- SAVE (RESTORED) ----------------
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
//         if (mode === "today") {
//           fetchTodayLectures(selectedDate);
//         } else {
//           fetchFilteredLectures();
//         }

//         setEditingId(null);
//       }

//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   // ---------------- DELETE (UNCHANGED) ----------------
//   const handleDelete = async (id) => {
//     try {
//       await api.patch(`/institutes/updateLecture/${id}`, {
//         delete: true,
//       });

//       setLectures((prev) => prev.filter((l) => l.lectureId !== id));
//     } catch (err) {
//       console.error(err.response?.data);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black p-6">

//       {/* HEADER */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Lectures</h1>

//         <div className="flex gap-3">
//           <button
//             onClick={() => router.push("/lectures")}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             Upload
//           </button>

//           <button
//             onClick={() => router.push("/residuelectures")}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg"
//           >
//             Reschedule
//           </button>
//         </div>
//       </div>

//       {/* DATE NAV */}
//       <div className="flex justify-between mb-4">
//         <div className="flex gap-2">
//           <button onClick={prevDay} className="bg-gray-200 px-3 py-1 rounded">
//             Prev
//           </button>
//           <button onClick={nextDay} className="bg-gray-200 px-3 py-1 rounded">
//             Next
//           </button>
//         </div>

//         <span>{selectedDate}</span>
//       </div>

//       {/* FILTER */}
//       <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap gap-3">

//         <input placeholder="Dept" className="border px-2 py-1 rounded"
//           onChange={(e)=>setFilters({...filters,department:e.target.value})}/>

//         <input placeholder="Year" className="border px-2 py-1 rounded"
//           onChange={(e)=>setFilters({...filters,year:e.target.value})}/>

//         <input placeholder="Section" className="border px-2 py-1 rounded"
//           onChange={(e)=>setFilters({...filters,section:e.target.value})}/>

//         <input type="date" className="border px-2 py-1 rounded"
//           onChange={(e)=>setFilters({...filters,start:e.target.value})}/>

//         <input type="date" className="border px-2 py-1 rounded"
//           onChange={(e)=>setFilters({...filters,end:e.target.value})}/>

//         <button
//           onClick={() => {
//             setMode("filter");
//             setPage(1);
//            // fetchFilteredLectures();
//           }}
//           className="bg-indigo-600 text-white px-3 py-1 rounded"
//         >
//           Fetch
//         </button>
//       </div>

//       {/* TABLE */}
//       {/* <div className="bg-white border rounded-lg overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Date</th>
//               <th>Start</th>
//               <th>End</th>
//               <th>Subject</th>
//               <th>Faculty</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {lectures.map((l) => (
//               <tr key={l.lectureId} className="border-t hover:bg-gray-100">

//                 <td className="p-3">{l.date}</td>

//                 <td>
//                   {editingId === l.lectureId ? (
//                     <input value={editData.startAt}
//                       onChange={(e)=>setEditData({...editData,startAt:e.target.value})}/>
//                   ) : l.startAt}
//                 </td>

//                 <td>
//                   {editingId === l.lectureId ? (
//                     <input value={editData.endAt}
//                       onChange={(e)=>setEditData({...editData,endAt:e.target.value})}/>
//                   ) : l.endAt}
//                 </td>

//                 <td>{l.subject.subCode}</td>
//                 <td>{l.faculty.facEmail}</td>

//                 <td className="space-x-2">
//                   <button
//                     onClick={() =>
//                       router.push(`/updatalectures/view?lectureId=${l.lectureId}`)
//                     }
//                     className="text-green-600"
//                   >
//                     View
//                   </button>

//                   {editingId === l.lectureId ? (
//                     <button onClick={() => handleSave(l.lectureId)} className="text-yellow-600">
//                       Save
//                     </button>
//                   ) : (
//                     <button onClick={() => handleEdit(l)} className="text-blue-600">
//                       Edit
//                     </button>
//                   )}

//                   <button
//                     onClick={() => handleDelete(l.lectureId)}
//                     className="text-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//       <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
//   <table className="w-full text-sm">
    
//     {/* HEADER */}
//     <thead className="bg-gray-100 text-gray-700">
//       <tr>
//         <th className="p-4 text-left">Date</th>
//         <th className="text-left">Start</th>
//         <th className="text-left">End</th>
//         <th className="text-left">Subject</th>
//         <th className="text-left">Faculty</th>
//         <th className="text-right pr-4">Action</th>
//       </tr>
//     </thead>

//     {/* BODY */}
//     <tbody>
//       {lectures.length > 0 ? (
//         lectures.map((l) => (
//           <tr
//             key={l.lectureId}
//             className="border-t hover:bg-gray-50 transition"
//           >

//             {/* DATE */}
//             <td className="p-4">{l.date}</td>

//             {/* START */}
//             <td>
//               {editingId === l.lectureId ? (
//                 <input
//                   value={editData.startAt}
//                   onChange={(e) =>
//                     setEditData({ ...editData, startAt: e.target.value })
//                   }
//                   className="border px-2 py-1 rounded w-24"
//                 />
//               ) : (
//                 l.startAt
//               )}
//             </td>

//             {/* END */}
//             <td>
//               {editingId === l.lectureId ? (
//                 <input
//                   value={editData.endAt}
//                   onChange={(e) =>
//                     setEditData({ ...editData, endAt: e.target.value })
//                   }
//                   className="border px-2 py-1 rounded w-24"
//                 />
//               ) : (
//                 l.endAt
//               )}
//             </td>

//             {/* SUBJECT */}
//             <td>{l.subject.subCode}</td>

//             {/* FACULTY */}
//             <td>{l.faculty.facEmail}</td>

//             {/* ACTION */}
//             <td className="text-right pr-4 space-x-3">

//               {/* VIEW */}
//               <button
//                 onClick={() =>
//                   router.push(
//                     `/updatalectures/view?lectureId=${l.lectureId}`
//                   )
//                 }
//                 className="text-green-600 font-medium"
//               >
//                 View
//               </button>

//               {/* EDIT / SAVE */}
//               {editingId === l.lectureId ? (
//                 <button
//                   onClick={() => handleSave(l.lectureId)}
//                   className="text-yellow-600 font-medium"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleEdit(l)}
//                   className="text-blue-600 font-medium"
//                 >
//                   Edit
//                 </button>
//               )}

//               {/* DELETE */}
//               <button
//                 onClick={() => handleDelete(l.lectureId)}
//                 className="text-red-600 font-medium"
//               >
//                 Delete
//               </button>

//             </td>
//           </tr>
//         ))
//       ) : (
//         // ✅ EMPTY STATE (YOU ASKED)
//         <tr>
//           <td colSpan="6" className="text-center p-8 text-gray-400">
//             <div className="flex flex-col items-center gap-2">
//               <p>
//                 No lectures found on{" "}
//                 <span className="font-medium text-gray-600">
//                   {new Date(selectedDate).toLocaleDateString("en-GB")}
//                 </span>
//               </p>
//             </div>
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between mt-4">
//   <span>Page {page} of {totalPages}</span>

//   <div className="flex gap-2">
//     <button
//       onClick={handlePrevPage}
//       disabled={page === 1}
//       className="bg-gray-200 px-3 py-1 rounded disabled:opacity-40"
//     >
//       Prev
//     </button>

//     <button
//       onClick={handleNextPage}
//       disabled={page === totalPages}
//       className="bg-indigo-600 text-white px-3 py-1 rounded disabled:opacity-40"
//     >
//       Next
//     </button>
//   </div>
// </div>

//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const getLocalDate = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
};

export default function Page() {
  const router = useRouter();

  const [mode, setMode] = useState("today");
  const [selectedDate, setSelectedDate] = useState(getLocalDate());

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    section: "",
    start: "",
    end: "",
  });

  const [lectures, setLectures] = useState([]);
  const [allLectures, setAllLectures] = useState([]);

  // ✅ FRONTEND PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // ✅ EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  

  // ---------------- TODAY ----------------
  const fetchTodayLectures = async (date) => {
    const res = await api.get(`/institutes/getAllLectures?date=${date}`);
    setLectures(res.data.lectures || []);
    setCurrentPage(1); // Reset to first page
  };

  // ---------------- FILTER ----------------
  const fetchFilteredLectures = async () => {
    let query = `/institutes/getLectures?`;
    
    if (filters.department) query += `&department=${filters.department}`;
    if (filters.year) query += `&year=${filters.year}`;
    if (filters.section) query += `&section=${filters.section}`;
    if (filters.start) query += `&start=${filters.start}`;
    if (filters.end) query += `&end=${filters.end}`;

    const res = await api.get(query);
    setLectures(res.data.lectures || []);
    setCurrentPage(1); // Reset to first page
  };

  useEffect(() => {
    if (mode === "today") {
      fetchTodayLectures(selectedDate);
    } else {
      fetchFilteredLectures();
    }
  }, [selectedDate, mode]);

  // ✅ FRONTEND PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLectures = lectures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(lectures.length / itemsPerPage);

  // ✅ PAGINATION HANDLERS
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // ---------------- DATE NAV ----------------
  const nextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split("T")[0]);
    setMode("today");
  };

  const prevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split("T")[0]);
    setMode("today");
  };

  // ---------------- EDIT ----------------
  const handleEdit = (l) => {
    setEditingId(l.lectureId);
    setEditData({
      startAt: l.startAt,
      endAt: l.endAt,
      subjectCode: l.subject.subCode,
      facultyEmail: l.faculty.facEmail,
    });
  };

  // ---------------- SAVE ----------------
  const handleSave = async (id) => {
    try {
      const lecture = lectures.find((l) => l.lectureId === id);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lectureDate = new Date(lecture.date);

      if (lectureDate < today) {
        alert("Cannot modify past lectures");
        return;
      }

      const res = await api.patch(`/institutes/updateLecture/${id}`, {
        startAt: editData.startAt,
        endAt: editData.endAt,
        subCode: editData.subjectCode,
        facEmail: editData.facultyEmail,
      });

      if (res.data.status === "success") {
        if (mode === "today") {
          fetchTodayLectures(selectedDate);
        } else {
          fetchFilteredLectures();
        }
        setEditingId(null);
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      await api.patch(`/institutes/updateLecture/${id}`, {
        delete: true,
      });
      setLectures((prev) => prev.filter((l) => l.lectureId !== id));
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // ✅ Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Lectures</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/lectures")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
           Upload Lecture
          </button>
          <button
            onClick={() => router.push("/residuelectures")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Reschedule
          </button>
        </div>
      </div>

      {/* DATE NAV */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button onClick={prevDay} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            ← Prev Day
          </button>
          <button onClick={nextDay} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            Next Day →
          </button>
        </div>
        <div className="flex gap-2">
          {/* <button
            onClick={() => {
              setMode("today");
              setSelectedDate(getLocalDate());
            }}
            className={`px-3 py-1 rounded ${mode === "today" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          >
            Today View
          </button> */}
          <span className="px-3 py-1 bg-gray-100 rounded">
            {mode === "today" ? selectedDate : "Filter View"}
          </span>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap gap-3">
        <input 
          placeholder="Department" 
          className="border px-2 py-1 rounded"
          onChange={(e)=>setFilters({...filters,department:e.target.value})}
        />
        <input 
          placeholder="Year" 
          className="border px-2 py-1 rounded"
          onChange={(e)=>setFilters({...filters,year:e.target.value})}
        />
        <input 
          placeholder="Section" 
          className="border px-2 py-1 rounded"
          onChange={(e)=>setFilters({...filters,section:e.target.value})}
        />
        <input 
          type="date" 
          placeholder="Start Date"
          className="border px-2 py-1 rounded"
          onChange={(e)=>setFilters({...filters,start:e.target.value})}
        />
        <input 
          type="date" 
          placeholder="End Date"
          className="border px-2 py-1 rounded"
          onChange={(e)=>setFilters({...filters,end:e.target.value})}
        />
        <button
          onClick={() => {
            setMode("filter");
            fetchFilteredLectures();
          }}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>

      {/* ✅ TOP PAGINATION */}
      {lectures.length > 0 && totalPages > 1 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, lectures.length)} of {lectures.length} lectures
            </div>
            
            <div className="flex gap-2 items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              
              {getPageNumbers().map((pageNum, idx) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum 
                        ? "bg-indigo-600 text-white" 
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
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
            {currentLectures.length > 0 ? (
              currentLectures.map((l) => (
                <tr key={l.lectureId} className="border-t hover:bg-gray-50">
                  <td className="p-4">{l.date}</td>
                  <td>
                    {editingId === l.lectureId ? (
                      <input
                        value={editData.startAt}
                        onChange={(e) => setEditData({...editData, startAt: e.target.value})}
                        className="border px-2 py-1 rounded w-24"
                      />
                    ) : (
                      l.startAt
                    )}
                  </td>
                  <td>
                    {editingId === l.lectureId ? (
                      <input
                        value={editData.endAt}
                        onChange={(e) => setEditData({...editData, endAt: e.target.value})}
                        className="border px-2 py-1 rounded w-24"
                      />
                    ) : (
                      l.endAt
                    )}
                  </td>
                  <td>{l.subject.subCode}</td>
                  <td>{l.faculty.facEmail}</td>
                  <td className="text-right pr-4 space-x-3">
                    <button
                      onClick={() => router.push(`/updatalectures/view?lectureId=${l.lectureId}`)}
                      className="text-green-600 font-medium hover:text-green-700"
                    >
                      View
                    </button>
                    {editingId === l.lectureId ? (
                      <button onClick={() => handleSave(l.lectureId)} className="text-yellow-600 font-medium">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(l)} className="text-blue-600 font-medium">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDelete(l.lectureId)} className="text-red-600 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <p>No lectures found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ BOTTOM PAGINATION */}
      {lectures.length > 0 && totalPages > 1 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              <select
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
                className="px-3 py-2 rounded border bg-white"
              >
                {[...Array(totalPages).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>
                    Page {num + 1}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
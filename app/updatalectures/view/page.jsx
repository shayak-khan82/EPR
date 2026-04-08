// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// export default function ClassAttendancePage() {
//   const searchParams = useSearchParams();
//   const lectureId = searchParams.get("lectureId");

//   const [data, setData] = useState(null);

// //   const fetchAttendance = async () => {
// //     try {
// //       const res = await api.get(`/institutes/classAttd`, {
// //         params: { lectureId }
// //       });

// //       setData(res.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };
// const fetchAttendance = async () => {
//   try {
//     const res = await api.get(
//       `/institutes/classAttd/${lectureId}`
//     );

//     setData(res.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
//   useEffect(() => {
//     if (lectureId) fetchAttendance();
//   }, [lectureId]);

//   if (!data) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow">

//         <h1 className="text-2xl font-bold mb-6">
//           Lecture Attendance
//         </h1>

//         {/* SUMMARY */}
//         <div className="flex gap-6 mb-6">
//           <div className="bg-blue-100 px-4 py-2 rounded">
//             Total: {data.summary.totalStudents}
//           </div>
//           <div className="bg-green-100 px-4 py-2 rounded">
//             Present: {data.summary.presentCount}
//           </div>
//           <div className="bg-red-100 px-4 py-2 rounded">
//             Absent: {data.summary.absentCount}
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">

//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2 text-left">Roll No</th>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody className="text-black">
//               {data.attendance.map((student) => (
//                 <tr key={student.studentId} className="border-b">

//                   <td className="px-4 py-2">{student.rollNo}</td>
//                   <td className="px-4 py-2">{student.name}</td>
//                   <td className="px-4 py-2">{student.email}</td>

//                   <td className="px-4 py-2">
//                     {student.status ? (
//                       <span className="text-green-600 font-semibold">
//                         Present
//                       </span>
//                     ) : (
//                       <span className="text-red-600 font-semibold">
//                         Absent
//                       </span>
//                     )}
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ClassAttendancePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lectureId = searchParams.get("lectureId");

  const [data, setData] = useState(null);

  const fetchAttendance = async () => {
    try {
      const res = await api.get(
        `/institutes/classAttd/${lectureId}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lectureId) fetchAttendance();
  }, [lectureId]);

  if (!data) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 text-gray-800">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Lecture Attendance</h1>
          <p className="text-sm text-gray-500">
            View student attendance details
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
        >
          ← Back
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Students</p>
          <h2 className="text-xl font-semibold">
            {data.summary.totalStudents}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-sm text-green-600">Present</p>
          <h2 className="text-xl font-semibold text-green-600">
            {data.summary.presentCount}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-sm text-red-600">Absent</p>
          <h2 className="text-xl font-semibold text-red-600">
            {data.summary.absentCount}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Roll No</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.attendance.map((student) => (
              <tr
                key={student.studentId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>

                <td>
                  {student.status ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Present
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                      Absent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// export default function ManageCourses() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   // 🔥 Fetch ALL courses (no pagination)
//   const fetchCourses = async () => {
//     try {
//       const res = await api.get(`/institutes/getCourses`); // ✅ simple API

//       setCourses(res.data.courses); // adjust if backend uses different key
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // 🔹 Update Course
//   const handleUpdate = async () => {
//     try {
//       await api.put(`/updateCourse/${selectedCourse._id}`, {
//         courseName: selectedCourse.courseName,
//         courseCode: selectedCourse.courseCode,
//       });

//       alert("Updated successfully!");
//       setSelectedCourse(null);
//       fetchCourses();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">
      
//       <h1 className="text-3xl font-bold text-center mb-8">
//         Manage Courses
//       </h1>

//       {/* 🔹 Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <table className="w-full text-center">
          
//           <thead className="bg-gray-900 text-white">
//             <tr>
//               <th className="p-4">Course Name</th>
//               <th>Course Code</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {courses.length > 0 ? (
//               courses.map((c) => (
//                 <tr
//                   key={c._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4 font-medium">
//                     {c.courseName}
//                   </td>
//                   <td>{c.courseCode}</td>

//                   <td>
//                     <button
//                       onClick={() => setSelectedCourse(c)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="p-6">
//                   No courses found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 Edit Modal */}
//       {selectedCourse && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            
//             <h2 className="text-xl font-bold mb-4">
//               Edit Course
//             </h2>

//             <input
//               type="text"
//               value={selectedCourse.courseName}
//               onChange={(e) =>
//                 setSelectedCourse({
//                   ...selectedCourse,
//                   courseName: e.target.value,
//                 })
//               }
//               className="w-full border p-2 mb-3 rounded-lg"
//             />

//             <input
//               type="text"
//               value={selectedCourse.courseCode}
//               onChange={(e) =>
//                 setSelectedCourse({
//                   ...selectedCourse,
//                   courseCode: e.target.value,
//                 })
//               }
//               className="w-full border p-2 mb-4 rounded-lg"
//             />

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setSelectedCourse(null)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
import api from "@/lib/api";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 🔥 Fetch Departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get(`/institutes/getDepts`);
      setDepartments(res.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch Courses (Filtered)
  const fetchCourses = async (deptId = "") => {
    try {
      let url = `/institutes/getCourses`;

      if (deptId) {
        url += `?deptId=${deptId}`;
      }

      const res = await api.get(url);
      setCourses(res.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchCourses();
  }, []);

  // 🔹 Update Course (ALL FIELDS)
  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateCourse/${selectedCourse._id}`, {
        courseName: selectedCourse.courseName,
        courseCode: selectedCourse.courseCode,
        deptId: selectedCourse.deptId?._id || selectedCourse.deptId, // ✅ important
      });

      alert("Updated successfully!");
      setSelectedCourse(null);
      fetchCourses(selectedDept);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Courses
      </h1>

      {/* 🔥 Department Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            fetchCourses(e.target.value);
          }}
          className="p-3 border rounded-lg"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.deptName}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Course Name</th>
              <th>Course Code</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{c.courseName}</td>
                <td>{c.courseCode}</td>
                <td>{c.deptId?.deptName || "-"}</td>

                <td>
                  <button
                    onClick={() => setSelectedCourse(c)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Edit Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            
            <h2 className="text-xl font-bold mb-4">
              Edit Course
            </h2>

            {/* Name */}
            <input
              type="text"
              value={selectedCourse.courseName}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  courseName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            {/* Code */}
            <input
              type="text"
              value={selectedCourse.courseCode}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  courseCode: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            {/* 🔥 Department Change */}
            <select
              value={selectedCourse.deptId?._id || selectedCourse.deptId}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  deptId: e.target.value,
                })
              }
              className="w-full border p-2 mb-4 rounded-lg"
            >
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deptName}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedCourse(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
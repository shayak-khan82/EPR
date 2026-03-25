// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// export default function ManageDepartments() {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDept, setSelectedDept] = useState(null);

//   // 🔥 Fetch Departments (NEW API)
//   const fetchDepartments = async () => {
//     try {
//       const res = await api.get(`/institutes/getDepts`);

//       setDepartments(res.data.departments); // ✅ correct field
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   // 🔹 Update Department
//   const handleUpdate = async () => {
//     try {
//       await api.put(`/updateDepartment/${selectedDept._id}`, {
//         deptName: selectedDept.deptName,
//       });

//       alert("Updated successfully!");
//       setSelectedDept(null);
//       fetchDepartments();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">

//       <h1 className="text-3xl font-bold text-center mb-8">
//         Manage Departments
//       </h1>

//       {/* 🔹 Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <table className="w-full text-center">
          
//           <thead className="bg-gray-900 text-white">
//             <tr>
//               <th className="p-4">Department</th>
//               <th>HOD Name</th>
//               <th>HOD Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {departments.length > 0 ? (
//               departments.map((d) => (
//                 <tr
//                   key={d._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   {/* Department Name */}
//                   <td className="p-4 font-medium">
//                     {d.deptName}
//                   </td>

//                   {/* HOD Name */}
//                   <td>
//                     {d.deptHeadId?.facName || "Not Assigned"}
//                   </td>

//                   {/* HOD Email */}
//                   <td>
//                     {d.deptHeadId?.facEmail || "-"}
//                   </td>

//                   {/* Edit */}
//                   <td>
//                     <button
//                       onClick={() => setSelectedDept(d)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-6">
//                   No departments found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 Edit Modal */}
//       {selectedDept && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

//             <h2 className="text-xl font-bold mb-4">
//               Edit Department
//             </h2>

//             <input
//               type="text"
//               value={selectedDept.deptName}
//               onChange={(e) =>
//                 setSelectedDept({
//                   ...selectedDept,
//                   deptName: e.target.value,
//                 })
//               }
//               className="w-full border p-2 mb-4 rounded-lg"
//             />

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setSelectedDept(null)}
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

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  // 🔥 Fetch Departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get(`/institutes/getDepts`); // ✅ make sure this is correct

      setDepartments(res.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // 🔥 UPDATE FUNCTION (deptName + facEmail)
  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateDept/${selectedDept._id}`, {
        deptName: selectedDept.deptName,
        facEmail: selectedDept.deptHeadId?.facEmail, // ✅ HOD email update
      });

      alert("Updated successfully!");
      setSelectedDept(null);
      fetchDepartments();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">

      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Departments
      </h1>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-center">
          
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Department</th>
              <th>HOD Name</th>
              <th>HOD Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.length > 0 ? (
              departments.map((d) => (
                <tr
                  key={d._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {d.deptName}
                  </td>

                  <td>
                    {d.deptHeadId?.facName || "Not Assigned"}
                  </td>

                  <td>
                    {d.deptHeadId?.facEmail || "-"}
                  </td>

                  <td>
                    <button
                      onClick={() => setSelectedDept(d)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 Edit Modal */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Edit Department
            </h2>

            {/* Department Name */}
            <input
              type="text"
              placeholder="Department Name"
              value={selectedDept.deptName}
              onChange={(e) =>
                setSelectedDept({
                  ...selectedDept,
                  deptName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            {/* HOD Email */}
            <input
              type="email"
              placeholder="HOD Email"
              value={selectedDept.deptHeadId?.facEmail || ""}
              onChange={(e) =>
                setSelectedDept({
                  ...selectedDept,
                  deptHeadId: {
                    ...selectedDept.deptHeadId,
                    facEmail: e.target.value,
                  },
                })
              }
              className="w-full border p-2 mb-4 rounded-lg"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedDept(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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
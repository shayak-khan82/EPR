"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  const router = useRouter();

  const fetchDepartments = async () => {
    try {
      const res = await api.get(`/institutes/getDepts`);
      setDepartments(res.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateDept/${selectedDept._id}`, {
        deptName: selectedDept.deptName,
        facEmail: selectedDept.deptHeadId?.facEmail,
      });

      setSelectedDept(null);
      fetchDepartments();
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
          <h1 className="text-2xl font-semibold">Departments</h1>
          <p className="text-sm text-gray-500">
            Manage departments and HODs
          </p>
        </div>

        <button
          onClick={() => router.push("/departments/add-departments")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Add Department
        </button>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-600">
            <tr>
              <th className="text-left p-4 font-medium">Department</th>
              <th>HOD Name</th>
              <th>HOD Email</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.length > 0 ? (
              departments.map((d) => (
                <tr
                  key={d._id}
                  className="border-t hover:bg-indigo-50/40 transition"
                >
                  <td className="p-4 font-medium">
                    {d.deptName}
                  </td>

                  <td className="text-center">
                    {d.deptHeadId?.facName || "Not Assigned"}
                  </td>

                  <td className="text-center text-gray-600">
                    {d.deptHeadId?.facEmail || "-"}
                  </td>

                  <td className="text-right pr-4">
                    <button
                      onClick={() => setSelectedDept(d)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 EDIT MODAL */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Edit Department
            </h2>

            {/* Department Name */}
            <input
              type="text"
              value={selectedDept.deptName}
              onChange={(e) =>
                setSelectedDept({
                  ...selectedDept,
                  deptName: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            {/* HOD Email */}
            <input
              type="email"
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
              className="w-full border p-2 rounded mb-4 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDept(null)}
                className="text-sm px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
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
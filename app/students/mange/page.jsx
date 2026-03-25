"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Optional filters
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const limit = 10;

  // 🔥 Fetch students (OPTIONAL FILTER LOGIC)
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

  // 🔹 Update student
//   const handleUpdate = async () => {
//     try {
//       await api.put(`/updateStudent/${selectedStudent._id}`, {
//         stdName: selectedStudent.stdName,
//         stdEmail: selectedStudent.stdEmail,
//       });

//       alert("Updated successfully!");
//       setSelectedStudent(null);
//       fetchStudents();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };
const handleUpdate = async () => {
  try {
    await api.patch(
      `/institutes/updateStudent/${selectedStudent._id}`,
      {
        stdName: selectedStudent.stdName,
        stdEmail: selectedStudent.stdEmail,
      }
    );

    alert("Updated successfully!");
    setSelectedStudent(null);
    fetchStudents();
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manage Students
      </h1>

      {/* 🔹 Filters (Optional) */}
      <div className="flex gap-4 justify-center mb-6 flex-wrap">

        {/* Department */}
        <select
          value={dept}
          onChange={(e) => {
            setPage(1);
            setDept(e.target.value);
          }}
          className="p-2 border rounded"
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(e.target.value);
          }}
          className="p-2 border rounded"
        >
          <option value="">All Years</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        {/* Section */}
        <select
          value={section}
          onChange={(e) => {
            setPage(1);
            setSection(e.target.value);
          }}
          className="p-2 border rounded"
        >
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        {/* 🔥 Reset Button */}
        <button
          onClick={() => {
            setDept("");
            setYear("");
            setSection("");
            setPage(1);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.stdName}</td>
                  <td>{s.stdEmail}</td>
                  <td>{s.stdRoll}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        s.faceEnrollmentStatus === "COMPLETED"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {s.faceEnrollmentStatus || "PENDING"}
                    </span>
                  </td>

                  {/* 🔥 Edit Button */}
                  <td>
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* 🔥 Edit Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>

            <input
              type="text"
              value={selectedStudent.stdName}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  stdName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="email"
              value={selectedStudent.stdEmail}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  stdEmail: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
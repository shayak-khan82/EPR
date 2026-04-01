

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

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-gray-500">
            Manage and track student records
          </p>
        </div>

        <button
          onClick={() => router.push("/students/bulk-add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm"
        >
          + Bulk Add Students
        </button>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 flex flex-wrap gap-3">

        <select value={dept} onChange={(e) => { setPage(1); setDept(e.target.value); }}
          className="border px-3 py-2 rounded-md text-sm">
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <select value={year} onChange={(e) => { setPage(1); setYear(e.target.value); }}
          className="border px-3 py-2 rounded-md text-sm">
          <option value="">Year</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        <select value={section} onChange={(e) => { setPage(1); setSection(e.target.value); }}
          className="border px-3 py-2 rounded-md text-sm">
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
              <th className="p-4 text-left">Name</th>
              <th className="text-left">Email</th> {/* ✅ FIX */}
              <th className="text-center">Roll</th>
              <th className="text-center">Year</th>
              <th className="text-center">Section</th>
              <th className="text-center">Status</th>
              <th className="text-center">Attendance</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s._id} className="border-t">

                  <td className="p-4 font-medium">{s.stdName}</td>

                  {/* ✅ EMAIL ALIGN FIX */}
                  <td className="text-left">{s.stdEmail}</td>

                  <td className="text-center">{s.stdRoll}</td>
                  <td className="text-center">{s.stdYear}</td>
                  <td className="text-center">{s.stdSection}</td>

                  {/* ✅ STATUS FIX (ONLY ENROLLED) */}
                  {/* <td className="text-center">
                    {s.faceEnrollmentStatus === "COMPLETED" && (
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-green-100 text-green-700">
                        Enrolled
                      </span>
                    )}
                  </td> */}
                  <td className="text-center">
  <span
    className={`text-xs px-3 py-1 rounded-full font-medium ${
      s.faceEnrollmentStatus === "COMPLETED"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {s.faceEnrollmentStatus === "COMPLETED"
      ? "Enrolled"
      : "Not Enrolled"}
  </span>
</td>

                  {/* ATTENDANCE */}
                  <td className="text-center">
                    <button
                      onClick={() =>
                        router.push(`/students/view-ad?roll=${s.stdRoll}`)
                      }
                      className="text-green-600 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>

                  {/* ACTION */}
                  <td className="text-right pr-4">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="text-indigo-600 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-400">
                  No students found
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
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
            className="border px-3 py-1 rounded">
            Prev
          </button>

          <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
            className="bg-indigo-600 text-white px-3 py-1 rounded">
            Next
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="font-semibold mb-4">Edit Student</h2>

            <input
              value={selectedStudent.stdName}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  stdName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3"
            />

            <input
              value={selectedStudent.stdEmail}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  stdEmail: e.target.value,
                })
              }
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedStudent(null)}>
                Cancel
              </button>

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
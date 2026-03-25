"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ManageFaculties() {
  const [faculties, setFaculties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dept, setDept] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const limit = 10;

  // 🔥 Fetch Faculties
  const fetchFaculties = async () => {
    try {
      let query = `/institutes/getFaculty?page=${page}&limit=${limit}`;

      if (dept) query += `&dept=${dept}`;

      const res = await api.get(query);

      setFaculties(res.data.faculty);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, [page, dept]);

  // 🔥 FULL UPDATE FUNCTION
  const handleUpdate = async () => {
    try {
      await api.patch(
        `/institutes/updateFaculty/${selectedFaculty._id}`,
        {
          facName: selectedFaculty.facName,
          facEmail: selectedFaculty.facEmail,
          facRecEmail: selectedFaculty.facRecEmail,
          facNum: selectedFaculty.facNum,
          facDept: selectedFaculty.facDept,
        }
      );

      alert("Updated successfully!");
      setSelectedFaculty(null);
      fetchFaculties();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Faculties
      </h1>

      {/* 🔹 Filter */}
      <div className="flex gap-4 justify-center mb-6">
        <select
          value={dept}
          onChange={(e) => {
            setDept(e.target.value);
            setPage(1);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <button
          onClick={() => {
            setDept("");
            setPage(1);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Recovery Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {faculties.length > 0 ? (
              faculties.map((f) => (
                <tr key={f._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{f.facName}</td>
                  <td>{f.facEmail}</td>
                  <td>{f.facDept}</td>
                  <td>{f.facNum}</td>
                  <td>{f.facRecEmail}</td>

                  <td>
                    <button
                      onClick={() => setSelectedFaculty(f)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6">
                  No faculties found
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
          className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* 🔥 Edit Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Edit Faculty
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={selectedFaculty.facName}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={selectedFaculty.facEmail}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facEmail: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Recovery Email"
              value={selectedFaculty.facRecEmail}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facRecEmail: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Phone"
              value={selectedFaculty.facNum}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facNum: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <select
              value={selectedFaculty.facDept}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facDept: e.target.value,
                })
              }
              className="w-full border p-2 mb-4 rounded-lg"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedFaculty(null)}
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
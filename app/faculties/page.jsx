"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ManageFaculties() {
  const [faculties, setFaculties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dept, setDept] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const router = useRouter();
  const limit = 10;

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

      setSelectedFaculty(null);
      fetchFaculties();
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
          <h1 className="text-2xl font-semibold">Faculties</h1>
          <p className="text-sm text-gray-500">
            Manage faculty members
          </p>
        </div>

        <button
          onClick={() => router.push("/faculties/bulk-add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Bulk Add Faculty
        </button>
      </div>

      {/* 🔹 FILTER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex gap-3 items-center">

        <select
          value={dept}
          onChange={(e) => {
            setDept(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <button
          onClick={() => {
            setDept("");
            setPage(1);
          }}
          className="ml-auto text-sm text-indigo-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-600">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Recovery Email</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {faculties.length > 0 ? (
              faculties.map((f) => (
                <tr
                  key={f._id}
                  className="border-t hover:bg-indigo-50/40 transition"
                >
                  <td className="p-4 font-medium">{f.facName}</td>
                  <td className="text-gray-600">{f.facEmail}</td>
                  <td className="text-center">{f.facDept}</td>
                  <td className="text-center">{f.facNum}</td>
                  <td className="text-center">{f.facRecEmail}</td>

                  <td className="text-right pr-4">
                    <button
                      onClick={() => setSelectedFaculty(f)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No faculties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 PAGINATION */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <span className="text-gray-500">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="border px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* 🔥 EDIT MODAL */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Edit Faculty
            </h2>

            <input
              type="text"
              value={selectedFaculty.facName}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facName: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="email"
              value={selectedFaculty.facEmail}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facEmail: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="email"
              value={selectedFaculty.facRecEmail}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facRecEmail: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="text"
              value={selectedFaculty.facNum}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facNum: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <select
              value={selectedFaculty.facDept}
              onChange={(e) =>
                setSelectedFaculty({
                  ...selectedFaculty,
                  facDept: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedFaculty(null)}
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
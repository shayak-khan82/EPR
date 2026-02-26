
"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UpdateLecturesPage() {

  const formatDate = (date) => date.toISOString().split("T")[0];

  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 6);

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    section: "",
  });

  const [lectures, setLectures] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH WEEK ----------------
  const fetchLectures = async () => {
    try {
      setLoading(true);

      const res = await api.get("/institutes/getLectures", {
        params: {
          start: formatDate(today),
          end: formatDate(endDate),
          department: filters.department,
          year: filters.year,
          section: filters.section,
        },
      });

      // Sort by date + time
      const sorted = (res.data.lectures || []).sort((a, b) => {
        if (a.date === b.date) {
          return a.startAt.localeCompare(b.startAt);
        }
        return a.date.localeCompare(b.date);
      });

      setLectures(sorted);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FORM SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLectures();
  };

  // ---------------- EDIT ----------------
  const handleEdit = (lecture) => {
    setEditingId(lecture.lectureId);

    setEditData({
      startAt: lecture.startAt,
      endAt: lecture.endAt,
      subjectCode: lecture.subject.subCode,
      facultyEmail: lecture.faculty.facEmail,
    });
  };

  // ---------------- SAVE ----------------
  const handleSave = async (id) => {
    try {
      const res = await api.patch(`http://4.194.252.156:4040/institutes/updateLecture/${id}`, {
        startAt: editData.startAt,
        endAt: editData.endAt,
        subCode: editData.subjectCode,
        facEmail: editData.facultyEmail,
      });

      console.log("Update Response:", res.data);

      // Your backend returns { status: "success" }
      if (res.data.status === "success") {
        await fetchLectures();  // refresh table
        setEditingId(null);
      }

    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- DELETE ----------------
  const confirmDelete = async () => {
    try {
      const res = await api.patch(
        `/institutes/updateLecture/${deleteId}`,
        { delete: true }
      );

      if (res.data.status === "success") {
        setLectures((prev) =>
          prev.filter((l) => l.lectureId !== deleteId)
        );
      }

      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Weekly Lectures
        </h1>

        {/* FILTER FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Department"
            required
            className="border rounded-lg px-4 py-2"
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Year"
            required
            className="border rounded-lg px-4 py-2"
            value={filters.year}
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Section"
            required
            className="border rounded-lg px-4 py-2"
            value={filters.section}
            onChange={(e) =>
              setFilters({ ...filters, section: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
          >
            {loading ? "Loading..." : "Show Week"}
          </button>
        </form>

        {/* TABLE */}
        {lectures.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-xl">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Start</th>
                  <th className="px-4 py-3 text-left">End</th>
                  <th className="px-4 py-3 text-left">Subject Code</th>
                  <th className="px-4 py-3 text-left">Faculty Email</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {lectures.map((lecture) => (
                  <tr key={lecture.lectureId} className="border-b hover:bg-gray-100">

                    <td className="px-4 py-3 text-gray-900">
                      {lecture.date}
                    </td>

                    {/* START */}
                    <td className="px-4 py-3">
                      {editingId === lecture.lectureId ? (
                        <input
                          type="time"
                          value={editData.startAt}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              startAt: e.target.value,
                            })
                          }
                          className="border px-2 py-1 rounded"
                        />
                      ) : (
                        lecture.startAt
                      )}
                    </td>

                    {/* END */}
                    <td className="px-4 py-3">
                      {editingId === lecture.lectureId ? (
                        <input
                          type="time"
                          value={editData.endAt}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              endAt: e.target.value,
                            })
                          }
                          className="border px-2 py-1 rounded"
                        />
                      ) : (
                        lecture.endAt
                      )}
                    </td>

                    {/* SUBJECT */}
                    <td className="px-4 py-3">
                      {editingId === lecture.lectureId ? (
                        <input
                          type="text"
                          value={editData.subjectCode}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              subjectCode: e.target.value,
                            })
                          }
                          className="border px-2 py-1 rounded"
                        />
                      ) : (
                        lecture.subject.subCode
                      )}
                    </td>

                    {/* FACULTY */}
                    <td className="px-4 py-3 text-black">
                      {editingId === lecture.lectureId ? (
                        <input
                          type="email"
                          value={editData.facultyEmail}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              facultyEmail: e.target.value,
                            })
                          }
                          className="border px-2 py-1 rounded"
                        />
                      ) : (
                        lecture.faculty.facEmail
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3 flex gap-2 text-black">
                      {editingId === lecture.lectureId ? (
                        <>
                          <button
                            onClick={() => handleSave(lecture.lectureId)}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(lecture)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(lecture.lectureId)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="font-bold mb-4">Confirm Delete</h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


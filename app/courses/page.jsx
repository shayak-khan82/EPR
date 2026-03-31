"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const router = useRouter();

  // 🔥 Fetch Departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get(`/institutes/getDepts`);
      setDepartments(res.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch Courses
  const fetchCourses = async (deptId = "") => {
    try {
      let url = `/institutes/getCourses`;
      if (deptId) url += `?deptId=${deptId}`;

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

  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateCourse/${selectedCourse._id}`, {
        courseName: selectedCourse.courseName,
        courseCode: selectedCourse.courseCode,
        deptId: selectedCourse.deptId?._id || selectedCourse.deptId,
      });

      setSelectedCourse(null);
      fetchCourses(selectedDept);
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
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-gray-500">
            Manage courses and departments
          </p>
        </div>

        <button
          onClick={() => router.push("/courses/add-course")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Add Course
        </button>
      </div>

      {/* 🔹 FILTER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex items-center gap-3">
        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            fetchCourses(e.target.value);
          }}
          className="border px-3 py-2 rounded-md text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.deptName}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSelectedDept("");
            fetchCourses();
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
              <th className="text-left p-4 font-medium">Course Name</th>
              <th>Course Code</th>
              <th>Department</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((c) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-indigo-50/40 transition"
                >
                  <td className="p-4 font-medium">{c.courseName}</td>
                  <td className="text-center">{c.courseCode}</td>
                  <td className="text-center text-gray-600">
                    {c.deptId?.deptName || "-"}
                  </td>

                  <td className="text-right pr-4">
                    <button
                      onClick={() => setSelectedCourse(c)}
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
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 EDIT MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Edit Course
            </h2>

            <input
              type="text"
              value={selectedCourse.courseName}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  courseName: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="text"
              value={selectedCourse.courseCode}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  courseCode: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <select
              value={selectedCourse.deptId?._id || selectedCourse.deptId}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  deptId: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deptName}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedCourse(null)}
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
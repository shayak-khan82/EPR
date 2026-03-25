 
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");

  const [selectedSubject, setSelectedSubject] = useState(null);

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

      if (deptId) {
        url += `?deptId=${deptId}`;
      }

      const res = await api.get(url);
      setCourses(res.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch Subjects
  const fetchSubjects = async (deptId = "", courseId = "") => {
    try {
      let url = `/institutes/getSubjects`;

      const params = [];

      if (deptId) params.push(`deptId=${deptId}`);
      if (courseId) params.push(`courseId=${courseId}`);

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await api.get(url);
      setSubjects(res.data.subjects);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Initial Load
  useEffect(() => {
    fetchDepartments();
    fetchCourses();
    fetchSubjects("", ""); // ✅ load ALL subjects
  }, []);

  // 🔥 Department Change
  const handleDeptChange = (e) => {
    const deptId = e.target.value;

    setSelectedDept(deptId);
    setSelectedCourseFilter("");

    fetchCourses(deptId);

    if (!deptId) {
      fetchSubjects("", ""); // show all
    } else {
      fetchSubjects(deptId, "");
    }
  };

  // 🔥 Course Change
  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourseFilter(courseId);

    if (!courseId) {
      fetchSubjects(selectedDept, "");
    } else {
      fetchSubjects(selectedDept, courseId);
    }
  };

  // 🔥 Reset Filters
  const handleReset = () => {
    setSelectedDept("");
    setSelectedCourseFilter("");
    fetchCourses();
    fetchSubjects("", "");
  };

  // 🔥 Update Subject
  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateSubject/${selectedSubject._id}`, {
        subName: selectedSubject.subName,
        subCode: selectedSubject.subCode,
        deptId:
          selectedSubject.deptId?._id || selectedSubject.deptId,
        courseId:
          selectedSubject.courseId?._id || selectedSubject.courseId,
      });

      alert("Updated successfully!");
      setSelectedSubject(null);
      fetchSubjects(selectedDept, selectedCourseFilter);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">

      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Subjects
      </h1>

      {/* 🔥 Filters */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">

        {/* Department */}
        <select
          value={selectedDept}
          onChange={handleDeptChange}
          className="p-3 border rounded-lg"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.deptName}
            </option>
          ))}
        </select>

        {/* Course */}
        <select
          value={selectedCourseFilter}
          onChange={handleCourseChange}
          disabled={!selectedDept}
          className="p-3 border rounded-lg"
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.courseName}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
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
              <th className="p-4">Subject</th>
              <th>Code</th>
              <th>Department</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length > 0 ? (
              subjects.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{s.subName}</td>
                  <td>{s.subCode}</td>
                  <td>{s.deptId?.deptName || "-"}</td>
                  <td>{s.courseId?.courseName || "-"}</td>

                  <td>
                    <button
                      onClick={() => setSelectedSubject(s)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6">
                  No subjects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 Edit Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Edit Subject
            </h2>

            <input
              type="text"
              value={selectedSubject.subName}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  subName: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <input
              type="text"
              value={selectedSubject.subCode}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  subCode: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            />

            {/* Department */}
            <select
              value={selectedSubject.deptId?._id || selectedSubject.deptId}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  deptId: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded-lg"
            >
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deptName}
                </option>
              ))}
            </select>

            {/* Course */}
            <select
              value={selectedSubject.courseId?._id || selectedSubject.courseId}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  courseId: e.target.value,
                })
              }
              className="w-full border p-2 mb-4 rounded-lg"
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseName}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedSubject(null)}
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
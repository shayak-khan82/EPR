"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");

  const [selectedSubject, setSelectedSubject] = useState(null);

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

  // 🔥 Fetch Subjects
  const fetchSubjects = async (deptId = "", courseId = "") => {
    try {
      let url = `/institutes/getSubjects`;
      const params = [];

      if (deptId) params.push(`deptId=${deptId}`);
      if (courseId) params.push(`courseId=${courseId}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await api.get(url);
      setSubjects(res.data.subjects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchCourses();
    fetchSubjects("", "");
  }, []);

  const handleDeptChange = (e) => {
    const deptId = e.target.value;

    setSelectedDept(deptId);
    setSelectedCourseFilter("");

    fetchCourses(deptId);

    if (!deptId) fetchSubjects("", "");
    else fetchSubjects(deptId, "");
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourseFilter(courseId);

    if (!courseId) fetchSubjects(selectedDept, "");
    else fetchSubjects(selectedDept, courseId);
  };

  const handleReset = () => {
    setSelectedDept("");
    setSelectedCourseFilter("");
    fetchCourses();
    fetchSubjects("", "");
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/institutes/updateSubject/${selectedSubject._id}`, {
        subName: selectedSubject.subName,
        subCode: selectedSubject.subCode,
        deptId: selectedSubject.deptId?._id || selectedSubject.deptId,
        courseId: selectedSubject.courseId?._id || selectedSubject.courseId,
      });

      setSelectedSubject(null);
      fetchSubjects(selectedDept, selectedCourseFilter);
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
          <h1 className="text-2xl font-semibold">Subjects</h1>
          <p className="text-sm text-gray-500">
            Manage subjects across courses
          </p>
        </div>

        <button
          onClick={() => router.push("/subjects/add-subjects")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Add Subject
        </button>
      </div>

      {/* 🔹 FILTERS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex gap-3 flex-wrap items-center">

        {/* Department */}
        <select
          value={selectedDept}
          onChange={handleDeptChange}
          className="border px-3 py-2 rounded-md text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-400 outline-none"
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
          className="border px-3 py-2 rounded-md text-sm bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none"
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
              <th className="text-left p-4 font-medium">Subject</th>
              <th>Code</th>
              <th>Department</th>
              <th>Course</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length > 0 ? (
              subjects.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-indigo-50/40 transition"
                >
                  <td className="p-4 font-medium">{s.subName}</td>
                  <td className="text-center">{s.subCode}</td>
                  <td className="text-center text-gray-600">
                    {s.deptId?.deptName || "-"}
                  </td>
                  <td className="text-center text-gray-600">
                    {s.courseId?.courseName || "-"}
                  </td>

                  <td className="text-right pr-4">
                    <button
                      onClick={() => setSelectedSubject(s)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No subjects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 EDIT MODAL */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
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
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
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
              className="w-full border p-2 rounded mb-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <select
              value={selectedSubject.deptId?._id || selectedSubject.deptId}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  deptId: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3 text-sm"
            >
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deptName}
                </option>
              ))}
            </select>

            <select
              value={selectedSubject.courseId?._id || selectedSubject.courseId}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  courseId: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4 text-sm"
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseName}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedSubject(null)}
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
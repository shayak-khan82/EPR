
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function CoursesPage() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [deptName, setDeptName] = useState("");
  //const [departments, setDepartments] = useState("");

  // Fetch all departments for dropdown
  // useEffect(() => {
  //   async function loadDepartments() {
  //     try {
  //       const res = await api.get("/departments");
  //       setDepartments(res.data); // expecting [{ id, deptName }]
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   loadDepartments();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseCode || !deptName)
      return alert("All fields are required!");

    try {
      const res = await api.post(ENDPOINT.createCourse, {
        courseName,
        courseCode,
        deptname: deptName,
      });
      alert(
        `Course created successfully!\nName: ${res.data.courseName}\nCode: ${res.data.courseCode}\nDepartment: ${res.data.deptname}`
      );
      setCourseName("");
      setCourseCode("");
      setDeptName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Create Course
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Course Name */}
          <div>
            <label className="block mb-2 text-black font-medium">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block mb-2 text-black font-medium">
              Course Code
            </label>
            <input
              type="text"
              placeholder="Enter course code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* // Department */}
          {/* <div>
            <label className="block mb-2 text-black font-medium">
              Department
            </label>
            <select
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.deptName}>
                  {dep.deptName}
                </option>
              ))}
            </select>
          </div>  */}
           {/* <div>
            <label className="block mb-2 font-medium text-black"> Department</label>
            <select
              value={ deptName}
              onChange={(e) => setDeptName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="A">CSE</option>
              <option value="B">ME</option>
              <option value="A">ECE</option>
              
              
              
            </select>
          </div> */}
          <div>
            <label className="block mb-2 text-black font-medium">
              Course Code
            </label>
            <input
              type="text"
              placeholder="Enter course code"
              value={deptName}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

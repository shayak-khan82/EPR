
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function CreateSubjectPage() {
  const [subName, setSubName] = useState("");
  const [subCode, setSubCode] = useState("");
  // const [courseName, setCourseName] = useState("");
   const [coursescode, setCoursescode] = useState("");

  // Fetch all courses for dropdown
  // useEffect(() => {
  //   async function fetchCourses() {
  //     try {
  //       const res = await api.get("/courses");
  //       setCourses(res.data);
  //     } catch (err) {
  //       console.error(err);
  //       alert("Failed to load courses");
  //     }
  //   }
  //   fetchCourses();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subName || !subCode || !courseName)
      return alert("All fields are required!");

    try {
      const res = await api.post(ENDPOINT.createSubject, {
        subName,
        SubCode: subCode,
        courseCode: courseName, // send course name or code as needed
      });
      alert(
        `Subject Created!\nName: ${res.data.subName}\nCode: ${res.data.SubCode}\nCourse: ${res.data.courseCode}`
      );

      // Clear form
      setSubName("");
      setSubCode("");
      setCourseName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create subject");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Create Subject
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Subject Name */}
          <div>
            <label className="block mb-2 text-black font-medium">Subject Name</label>
            <input
              type="text"
              placeholder="Enter subject name"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Subject Code */}
          <div>
            <label className="block mb-2 text-black font-medium">Subject Code</label>
            <input
              type="text"
              placeholder="Enter subject code"
              value={subCode}
              onChange={(e) => setSubCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Course Name Selection */}
          <div>
            {/* <label className="block mb-2 text-black font-medium">Course Name</label>
            <select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.courseName}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select> */}
            <label className="block mb-2 text-black font-medium">Course Code</label>
            <input
              type="text"
              placeholder="Enter Course code"
              value={coursescode}
              onChange={(e) => setCoursescode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Create Subject
          </button>
        </form>
      </div>
    </div>
  );
}

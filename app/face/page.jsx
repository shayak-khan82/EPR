
"use client";
import { useState } from "react";
import api from "@/lib/api";
import { FaUser, FaSearch, FaUpload } from "react-icons/fa";

export default function FaceUpload() {
  const [rollNo, setRollNo] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // STEP 1 — FETCH STUDENT ID USING ROLL NO
  const getStudent = async () => {
    if (!rollNo) return alert("Enter Roll Number!");

    try {
      const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);
      const id = res.data.data._id;

      setStudentId(id);
      setMessage(`✅ Student Found (ID: ${id})`);
    } catch (error) {
      console.log(error);
      setMessage("❌ Roll No not found!");
    }
  };

  // STEP 2 — UPLOAD FACE IMAGE
  const uploadFace = async () => {
    if (!studentId) return alert("Fetch Student ID First");
    if (!file) return alert("Please select a face image");

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("file", file);

    try {
      const res = await api.post(
        "http://4.194.252.156:8000/api/enroll-student",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("✅ " + res.data.message);
    } catch (error) {
      console.log(error);
      setMessage("❌ Face upload failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-black">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Student Face Enrollment
        </h1>

        {/* Step 1 Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Step 1 — Get Student ID
          </h2>

          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={getStudent}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            <div className="flex justify-center items-center gap-2">
              <FaSearch /> Get Student ID
            </div>
          </button>
        </div>

        {/* Step 2 Section */}
        {studentId && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Step 2 — Upload Student Face
            </h2>

            <p className="font-medium text-gray-800 mb-3">
              <span className="text-blue-700 font-bold">Student ID:</span>{" "}
              {studentId}
            </p>

            {/* File Upload Box */}
            <label className="flex flex-col items-center justify-center w-full h-40 px-4 border border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <FaUpload className="text-gray-500 text-3xl mb-2" />
              <span className="text-gray-600 font-medium">
                {file ? file.name : "Upload Face Image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <button
              onClick={uploadFace}
              className="w-full bg-green-600 text-white py-3 mt-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
            >
              Upload Face
            </button>
          </div>
        )}

        {/* Response Message */}
        {message && (
          <p className="mt-4 bg-gray-100 p-4 rounded-xl text-gray-800 font-semibold text-center border">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

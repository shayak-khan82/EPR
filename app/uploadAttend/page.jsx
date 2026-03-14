
"use client";
import { useState } from "react";
import api from "@/lib/api";
import { FaUpload, FaCalendarAlt, FaCamera } from "react-icons/fa";

export default function GetLectures() {
  const [date, setDate] = useState("");
  const [lectures, setLectures] = useState([]);
  const [message, setMessage] = useState("");
  const [openBox, setOpenBox] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch lectures
  const fetchLectures = async () => {
    if (!date) return alert("Select a date");

    try {
      const res = await api.get(`/institutes/getAllLectures?date=${date}`);
      setLectures(res.data.lectures);
      setMessage(`📌 Found ${res.data.count} scheduled lectures`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to load lectures");
    }
  };

  // Recognize face
  const recognizeFace = async (lectureId) => {
    if (!file) return alert("Select a photo first!");

    const formData = new FormData();
    formData.append("lectureId", lectureId);
    formData.append("file", file);

    try {
      const res = await api.post(
        "http://100.31.69.124:8000/api/recognize",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
      setFile(null);
      setOpenBox(null);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to recognize face!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black flex flex-col items-center">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Attendance Update via Face Recognition
      </h1>

      {/* DATE CARD */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2 text-lg">
          <FaCalendarAlt className="text-blue-600" /> Select Lecture Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-4 bg-gray-50 shadow-sm"
        />

        <button
          onClick={fetchLectures}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition"
        >
          Search Lectures
        </button>

        {message && (
          <p className="mt-4 text-center text-blue-700 bg-blue-50 border border-blue-200 shadow-sm p-3 rounded-xl font-medium">
            {message}
          </p>
        )}
      </div>

      {/* LECTURE LIST */}
      <div className="w-full max-w-3xl mt-10 space-y-6">
        {lectures.map((lec) => (
          <div
            key={lec._id}
            className="bg-white p-6 rounded-2xl border shadow-lg hover:shadow-2xl transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {lec.subId.subName}
              </h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full shadow text-sm">
                {lec.subId.subCode}
              </span>
            </div>

            <p className="mt-2 text-gray-600">
              <strong>Lecture ID:</strong> {lec._id}
            </p>

            {/* Update btn */}
            <button
              onClick={() => setOpenBox(openBox === lec._id ? null : lec._id)}
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition flex items-center gap-2"
            >
              <FaCamera /> Update Attendance
            </button>

            {/* Upload Box */}
            {openBox === lec._id && (
              <div className="mt-5 p-5 border rounded-xl bg-gray-50 shadow-inner">
                {/* Upload Box */}
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition">
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
                  onClick={() => recognizeFace(lec._id)}
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl shadow font-semibold hover:bg-blue-700 transition"
                >
                  Upload & Recognize
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RESULT VISUAL CARD */}
      {result && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl border mt-10">
          <h2 className="text-2xl font-bold mb-3 text-green-700 flex items-center gap-2">
            ✅ Attendance Updated
          </h2>

          <div className="bg-green-50 border border-green-300 p-4 rounded-xl">
            <p className="font-bold text-green-800">
              {result.attendanceUpdate.message}
            </p>
            <p className="mt-2 text-green-700 text-lg">
              Updated Count: {result.attendanceUpdate.updatedCount}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

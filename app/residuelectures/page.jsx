
"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ReschedulePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    start: "",
    end: "",
    department: "",
    year: "",
    section: "",
  });

  const [response, setResponse] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Download template
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/template/lectures_template.xlsx";
    link.download = "lectures_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload Excel file");
      return;
    }

    const startISO = new Date(formData.start).toISOString();
    const endISO = new Date(formData.end).toISOString();

    const data = new FormData();
    data.append("file", file);
    data.append("start", startISO);
    data.append("end", endISO);
    data.append("department", formData.department);
    data.append("year", formData.year);
    data.append("section", formData.section);

    try {
      setLoading(true);

      const res = await api.post(
        "/institutes/rescheduleLectures",
        data
      );

      setResponse({
        status: "success",
        message: "Lectures rescheduled successfully",
        data: res.data,
      });
    } catch (error) {
      setResponse({
        status: "error",
        message:
          error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            📅 Reschedule Lectures
          </h1>

          <p className="text-gray-600 mt-2">
            Download the template, fill lecture data, then upload it.
          </p>
        </div>

        {/* Download Template */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={downloadTemplate}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            ⬇ Download Template
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* File Upload */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6">

            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Upload Filled Excel Template
            </label>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                name="start"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                End Date
              </label>

              <input
                type="date"
                name="end"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Department
              </label>

              <input
                type="text"
                name="department"
                placeholder="CSE"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Year
              </label>

              <input
                type="number"
                name="year"
                placeholder="3"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Section
              </label>

              <input
                type="text"
                name="section"
                placeholder="A"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

          </div>

          {/* Submit */}
          <div className="pt-6 flex justify-center">

            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
            </button>

          </div>

        </form>

        {/* Response */}
        {response && (
          <div
            className={`mt-10 p-6 rounded-xl border ${
              response.status === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            <h3 className="font-semibold mb-2">Server Response</h3>

            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}
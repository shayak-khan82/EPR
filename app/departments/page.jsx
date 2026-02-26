

"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function DepartmentsPage() {
  const [deptName, setDeptName] = useState("");
  const [deptHeadId, setDeptHeadId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deptName || !deptHeadId) return alert("All fields are required!");

    try {
      await api.post(ENDPOINT.createDept, { deptName, deptHeadId });
      alert("Department created successfully!");
      setDeptName("");
      setDeptHeadId("");
    } catch (err) {
      console.error(err);
      alert("Failed to create department");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">Create Department</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Department Name */}
          <div>
            <label className="block mb-2 text-black font-medium">Department Name</label>
            <input
              type="text"
              placeholder="Enter department name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Department Head Email / ID */}
          <div>
            <label className="block mb-2 text-black font-medium">Department Head Email</label>
            <input
              type="email"
              placeholder="Enter department head email"
              value={deptHeadId}
              onChange={(e) => setDeptHeadId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
}



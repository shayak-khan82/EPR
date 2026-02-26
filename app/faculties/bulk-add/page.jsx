
// "use client";

// import { useState } from "react";
// import api from "@/lib/api";

// export default function BulkAddFaculties() {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file!");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await api.post("/faculties/bulk-add", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Faculties added successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Bulk Add Faculties</h1>
//       <input
//         type="file"
//         accept=".csv,.xlsx"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="mb-4"
//       />
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Upload
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function BulkAddFaculties() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(ENDPOINT.uploadFac, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Faculties added successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">Bulk Add Faculties</h1>

        <div className="mb-4">
          <label className="block mb-2 text-black font-medium">Upload CSV/Excel File</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Upload Faculties
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Make sure your file contains all required fields for faculties.
        </p>
      </div>
    </div>
  );
}

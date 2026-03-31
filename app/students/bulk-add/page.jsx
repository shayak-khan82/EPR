
// // "use client";

// // import { useState } from "react";
// // import api from "@/lib/api";
// // import { ENDPOINT } from "@/lib/app";
// // export default function BulkAddStudents() {
// //   const [file, setFile] = useState(null);

// //   const handleUpload = async () => {
// //     if (!file) return;
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       await api.post(ENDPOINT.uploadStd, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       alert("Students added successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Upload failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
// //       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
// //         <h1 className="text-2xl font-bold mb-6 text-black text-center">Bulk Add Students</h1>

// //         <div className="mb-4">
// //           <label className="block mb-2 text-black font-medium">Upload CSV/Excel File</label>
// //           <input
// //             type="file"
// //             onChange={(e) => setFile(e.target.files[0])}
// //             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //         </div>

// //         <button
// //           onClick={handleUpload}
// //           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
// //         >
// //           Upload Students
// //         </button>

// //         <p className="text-sm text-gray-500 mt-4 text-center">
// //           Make sure your file contains all required fields.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import api from "@/lib/api";
// import { ENDPOINT } from "@/lib/app";

// export default function BulkAddStudents() {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await api.post(ENDPOINT.uploadStd, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Students added successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   // ✅ DOWNLOAD TEMPLATE
//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/template"; // public/template
//     link.download = "student-template.xlsx"; // name (optional)
//     link.click();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-4 text-gray-800">

//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

//         {/* 🔥 HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl font-semibold">
//             Bulk Add Students
//           </h1>

//           <button
//             onClick={handleDownload}
//             className="text-sm text-indigo-600 hover:underline"
//           >
//             Download Template
//           </button>
//         </div>

//         {/* 🔹 FILE INPUT */}
//         <div className="mb-4">
//           <label className="block mb-2 text-sm font-medium">
//             Upload CSV / Excel
//           </label>

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         {/* 🔹 UPLOAD BUTTON */}
//         <button
//           onClick={handleUpload}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
//         >
//           Upload Students
//         </button>

//         <p className="text-xs text-gray-500 mt-4 text-center">
//           Ensure your file matches the template format.
//         </p>

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ENDPOINT } from "@/lib/app";

export default function BulkAddStudents() {
  const [file, setFile] = useState(null);

  // 🔥 Upload Students
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(ENDPOINT.uploadStd, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Students added successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // ✅ Download Template (your format)
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/template/students_template.xlsx";
    link.download = "students_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-4 text-gray-800">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Bulk Add Students
          </h1>

          <button
            onClick={downloadTemplate}
            className="text-sm text-indigo-600 hover:underline"
          >
            Download Template
          </button>
        </div>

        {/* 🔹 FILE INPUT */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Upload CSV / Excel File
          </label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* 🔹 UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
        >
          Upload Students
        </button>

        {/* 🔹 NOTE */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Ensure your file follows the template format.
        </p>

      </div>
    </div>
  );
}
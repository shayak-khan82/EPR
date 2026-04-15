
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Upload, Loader2, FileSpreadsheet, XCircle } from "lucide-react";
// import api from "@/lib/api"; // <-- ✅ Import your axios instance (adjust path if needed)

// export default function UploadLecturesPage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const resultRef = useRef(null);

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setError("⚠️ Please select a file before uploading.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setResponse(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file); // ✅ Make sure backend expects 'file' (not 'lectureFile')

//       // ✅ Using your api instance automatically includes accessToken
//       const res = await api.post("/institutes/uploadLectures", formData);

//       if (res.data.status === "error") {
//         setError(res.data.message || "Upload failed due to invalid file format.");
//       } else {
//         setResponse(res.data);
//       }
//     } catch (err) {
//       // ✅ Catch any 400 / validation errors
//       const message =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         "Server error: Upload failed.";
//       setError(message);
//       console.error("Upload Error:", err.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-scroll to result on change
//   useEffect(() => {
//     if (response || error) {
//       resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [response, error]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//         {/* Title */}
//         <h1 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
//           <FileSpreadsheet className="w-6 h-6 text-blue-600" />
//           Upload Lecture Sheet
//         </h1>
//         <p className="text-gray-500 mb-6 text-sm">
//           Upload your <span className="font-medium">.xlsx</span> file to insert lecture data.
//         </p>

//         {/* Upload Form */}
//         <form onSubmit={handleUpload} className="flex flex-col gap-5">
//           <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
//             <Upload className="w-10 h-10 text-blue-500 mb-2" />
//             <p className="text-gray-700">
//               {file ? (
//                 <span className="font-medium text-blue-600">{file.name}</span>
//               ) : (
//                 "Click to upload or drag your Excel file here"
//               )}
//             </p>
//             <input
//               type="file"
//               accept=".xlsx"
//               className="hidden"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//           </label>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
//               </>
//             ) : (
//               <>
//                 <Upload className="w-5 h-5" /> Upload File
//               </>
//             )}
//           </button>
//         </form>

//         {/* Error Message */}
//         {error && (
//           <div
//             ref={resultRef}
//             className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-sm flex items-start gap-3"
//           >
//             <XCircle className="w-6 h-6 flex-shrink-0 text-red-500 mt-0.5" />
//             <div className="flex-1">
//               <h3 className="font-semibold text-red-800 mb-1">Upload Failed</h3>
//               <p className="text-sm">{error}</p>
//               <button
//                 onClick={() => {
//                   setError(null);
//                   setFile(null);
//                 }}
//                 className="mt-3 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md transition"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Success Summary */}
//         {response && (
//           <div
//             ref={resultRef}
//             className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm"
//           >
//             <h2 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
//               ✅ Upload Successful
//             </h2>
//             <div className="text-sm text-gray-700 space-y-1">
//               <p>
//                 <strong>Status:</strong> {response.status}
//               </p>
//               <p>
//                 <strong>Total Rows:</strong> {response.totalRows}
//               </p>
//               <p>
//                 <strong>Inserted:</strong> {response.inserted}
//               </p>
//             </div>

//             {response.errors?.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-semibold text-red-600 mb-2">
//                   Errors Found in Upload:
//                 </h3>
//                 <ul className="text-sm text-gray-700 bg-white rounded-md border border-gray-200 divide-y divide-gray-100 max-h-40 overflow-y-auto">
//                   {response.errors.map((err, idx) => (
//                     <li key={idx} className="p-2">
//                       <span className="font-medium text-red-600">
//                         Row {err.row}:
//                       </span>{" "}
//                       {err.error}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Loader2, FileSpreadsheet, XCircle, Download } from "lucide-react";
import api from "@/lib/api";

export default function UploadLecturesPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  // ✅ DOWNLOAD TEMPLATE FUNCTION (NEW)
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/dashboard/template/lectures_template.xlsx"; // ✅ your file path
    link.download = "lectures_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("⚠️ Please select a file before uploading.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/institutes/uploadLectures", formData);

      if (res.data.status === "error") {
        setError(res.data.message || "Upload failed due to invalid file format.");
      } else {
        setResponse(res.data);
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Server error: Upload failed.";

      setError(message);
      console.error("Upload Error:", err.response?.data);

    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (response || error) {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            Upload Lecture Sheet
          </h1>

          {/* ✅ DOWNLOAD BUTTON */}
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-1 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition"
          >
            <Download className="w-4 h-4" />
            Template
          </button>
        </div>

        <p className="text-gray-500 mb-6 text-sm">
          Upload your <span className="font-medium">.xlsx</span> file to insert lecture data.
        </p>

        {/* FORM */}
        <form onSubmit={handleUpload} className="flex flex-col gap-5">

          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            <Upload className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-gray-700">
              {file ? (
                <span className="font-medium text-blue-600">{file.name}</span>
              ) : (
                "Click to upload or drag your Excel file here"
              )}
            </p>
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" /> Upload File
              </>
            )}
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <div
            ref={resultRef}
            className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-sm flex gap-3"
          >
            <XCircle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="font-semibold mb-1">Upload Failed</h3>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setFile(null);
                }}
                className="mt-3 text-sm text-white bg-red-500 px-3 py-1 rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {response && (
          <div
            ref={resultRef}
            className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-green-700 mb-3">
              ✅ Upload Successful
            </h2>

            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Status:</strong> {response.status}</p>
              <p><strong>Total Rows:</strong> {response.totalRows}</p>
              <p><strong>Inserted:</strong> {response.inserted}</p>
            </div>

            {response.errors?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-red-600 mb-2">
                  Errors Found:
                </h3>
                <ul className="text-sm bg-white border rounded-md max-h-40 overflow-y-auto">
                  {response.errors.map((err, idx) => (
                    <li key={idx} className="p-2 border-b">
                      <span className="text-red-600 font-medium">
                        Row {err.row}:
                      </span>{" "}
                      {err.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
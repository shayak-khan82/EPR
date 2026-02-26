// // // "use client";

// // // import { useState } from "react";
// // // import axios from "axios";
// // // import { createUseStyles } from "react-jss";

// // // const useStyles = createUseStyles({
// // //   container: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "linear-gradient(135deg,#667eea,#764ba2)",
// // //   },
// // //   card: {
// // //     background: "#fff",
// // //     padding: 30,
// // //     borderRadius: 12,
// // //     width: 420,
// // //     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
// // //   },
// // //   title: {
// // //     fontSize: 22,
// // //     fontWeight: 600,
// // //     marginBottom: 20,
// // //     textAlign: "center",
// // //   },
// // //   inputGroup: {
// // //     marginBottom: 15,
// // //     display: "flex",
// // //     flexDirection: "column",
// // //   },
// // //   input: {
// // //     padding: 10,
// // //     borderRadius: 6,
// // //     border: "1px solid #ddd",
// // //     marginTop: 5,
// // //   },
// // //   button: {
// // //     width: "100%",
// // //     padding: 12,
// // //     background: "#667eea",
// // //     color: "#fff",
// // //     border: "none",
// // //     borderRadius: 6,
// // //     cursor: "pointer",
// // //     fontWeight: 600,
// // //     marginTop: 10,
// // //   },
// // //   result: {
// // //     marginTop: 15,
// // //     padding: 10,
// // //     borderRadius: 6,
// // //     background: "#f4f4f4",
// // //     fontSize: 14,
// // //   },
// // // });

// // // export default function ReschedulePage() {
// // //   const classes = useStyles();

// // //   const [file, setFile] = useState(null);
// // //   const [formData, setFormData] = useState({
// // //     start: "",
// // //     end: "",
// // //     department: "",
// // //     year: "",
// // //     section: "",
// // //   });

// // //   const [response, setResponse] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const handleChange = (e) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value,
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!file) {
// // //       alert("Please upload an Excel file");
// // //       return;
// // //     }

// // //     const data = new FormData();
// // //     data.append("file", file);
// // //     data.append("start", formData.start);
// // //     data.append("end", formData.end);
// // //     data.append("department", formData.department);
// // //     data.append("year", formData.year);
// // //     data.append("section", formData.section);

// // //     try {
// // //       setLoading(true);

// // //       const res = await axios.post(
// // //         "http://4.194.252.156:4040/institutes/rescheduleLectures",
// // //         data,
// // //         {
// // //           headers: {
// // //             "Content-Type": "multipart/form-data",
// // //           },
// // //         }
// // //       );

// // //       setResponse(res.data);
// // //     } catch (error) {
// // //       setResponse({
// // //         status: "error",
// // //         message: error.response?.data || "Something went wrong",
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className={classes.container}>
// // //       <div className={classes.card}>
// // //         <h2 className={classes.title}>Reschedule Lectures</h2>

// // //         <form onSubmit={handleSubmit}>
// // //           <div className={classes.inputGroup}>
// // //             <label>Excel File</label>
// // //             <input
// // //               type="file"
// // //               accept=".xlsx,.xls"
// // //               className={classes.input}
// // //               onChange={(e) => setFile(e.target.files[0])}
// // //             />
// // //           </div>

// // //           <div className={classes.inputGroup}>
// // //             <label>Start Date</label>
// // //             <input
// // //               type="date"
// // //               name="start"
// // //               className={classes.input}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <div className={classes.inputGroup}>
// // //             <label>End Date</label>
// // //             <input
// // //               type="date"
// // //               name="end"
// // //               className={classes.input}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <div className={classes.inputGroup}>
// // //             <label>Department</label>
// // //             <input
// // //               type="text"
// // //               name="department"
// // //               placeholder="CSE"
// // //               className={classes.input}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <div className={classes.inputGroup}>
// // //             <label>Year</label>
// // //             <input
// // //               type="number"
// // //               name="year"
// // //               placeholder="3"
// // //               className={classes.input}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <div className={classes.inputGroup}>
// // //             <label>Section</label>
// // //             <input
// // //               type="text"
// // //               name="section"
// // //               placeholder="D"
// // //               className={classes.input}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <button className={classes.button} type="submit">
// // //             {loading ? "Processing..." : "Submit"}
// // //           </button>
// // //         </form>

// // //         {response && (
// // //           <div className={classes.result}>
// // //             <pre>{JSON.stringify(response, null, 2)}</pre>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState } from "react";
// // import axios from "axios";

// // export default function ReschedulePage() {
// //   const [file, setFile] = useState(null);
// //   const [formData, setFormData] = useState({
// //     start: "",
// //     end: "",
// //     department: "",
// //     year: "",
// //     section: "",
// //   });

// //   const [response, setResponse] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       alert("Please upload an Excel file");
// //       return;
// //     }

// //     const data = new FormData();
// //     data.append("file", file);
// //     data.append("start", formData.start);
// //     data.append("end", formData.end);
// //     data.append("department", formData.department);
// //     data.append("year", formData.year);
// //     data.append("section", formData.section);

// //     try {
// //       setLoading(true);
// //       const res = await axios.post(
// //         "http://4.194.252.156:4040/institutes/rescheduleLectures",
// //         data
// //       );
// //       setResponse(res.data);
// //     } catch (error) {
// //       setResponse({
// //         status: "error",
// //         message: error.response?.data || "Something went wrong",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">
// //       <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8">
// //         <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
// //           📅 Reschedule Lectures
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* File Upload */}
// //           <div>
// //             <label className="block text-sm font-medium text-slate-600 mb-2">
// //               Upload Excel File
// //             </label>
// //             <input
// //               type="file"
// //               accept=".xlsx,.xls"
// //               onChange={(e) => setFile(e.target.files[0])}
// //               className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //             />
// //           </div>

// //           {/* Date Row */}
// //           <div className="grid md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-slate-600 mb-2">
// //                 Start Date
// //               </label>
// //               <input
// //                 type="date"
// //                 name="start"
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-slate-600 mb-2">
// //                 End Date
// //               </label>
// //               <input
// //                 type="date"
// //                 name="end"
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               />
// //             </div>
// //           </div>

// //           {/* Department / Year / Section */}
// //           <div className="grid md:grid-cols-3 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-slate-600 mb-2">
// //                 Department
// //               </label>
// //               <input
// //                 type="text"
// //                 name="department"
// //                 placeholder="CSE"
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-slate-600 mb-2">
// //                 Year
// //               </label>
// //               <input
// //                 type="number"
// //                 name="year"
// //                 placeholder="3"
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-slate-600 mb-2">
// //                 Section
// //               </label>
// //               <input
// //                 type="text"
// //                 name="section"
// //                 placeholder="D"
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               />
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg"
// //           >
// //             {loading ? "Processing..." : "Submit"}
// //           </button>
// //         </form>

// //         {/* Response */}
// //         {response && (
// //           <div
// //             className={`mt-6 p-4 rounded-xl border text-sm ${
// //               response.status === "success"
// //                 ? "bg-green-50 border-green-400 text-green-700"
// //                 : "bg-red-50 border-red-400 text-red-700"
// //             }`}
// //           >
// //             <pre>{JSON.stringify(response, null, 2)}</pre>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import api from "@/lib/api"; // 👈 your axios instance

// export default function ReschedulePage() {
//   const [file, setFile] = useState(null);
//   const [formData, setFormData] = useState({
//     start: "",
//     end: "",
//     department: "",
//     year: "",
//     section: "",
//   });

//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please upload an Excel file");
//       return;
//     }

//     const data = new FormData();
//     data.append("file", file);
//     data.append("start", formData.start);
//     data.append("end", formData.end);
//     data.append("department", formData.department);
//     data.append("year", formData.year);
//     data.append("section", formData.section);

//     try {
//       setLoading(true);

//       // ✅ Corrected Route Here
//       const res = await api.post(
//         "http://4.194.252.156:4040/institutes/rescheduleLectures",
//         data
//       );

//       setResponse(res.data);
//     } catch (error) {
//       setResponse({
//         status: "error",
//         message:
//           error.response?.data?.message ||
//           error.response?.data ||
//           "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10">
        
//         <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
//           📅 Reschedule Lectures
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-600 mb-2">
//               Upload Excel File
//             </label>
//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           {/* Grid Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             <div>
//               <label className="block text-sm font-semibold text-slate-600 mb-2">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="start"
//                 onChange={handleChange}
//                 className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-600 mb-2">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="end"
//                 onChange={handleChange}
//                 className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-600 mb-2">
//                 Department
//               </label>
//               <input
//                 type="text"
//                 name="department"
//                 placeholder="CSE"
//                 onChange={handleChange}
//                 className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-600 mb-2">
//                 Year
//               </label>
//               <input
//                 type="number"
//                 name="year"
//                 placeholder="3"
//                 onChange={handleChange}
//                 className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-600 mb-2">
//                 Section
//               </label>
//               <input
//                 type="text"
//                 name="section"
//                 placeholder="D"
//                 onChange={handleChange}
//                 className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
//           >
//             {loading ? "Processing..." : "Submit"}
//           </button>
//         </form>

//         {/* Response */}
//         {response && (
//           <div
//             className={`mt-8 p-6 rounded-2xl border ${
//               response.status === "success"
//                 ? "bg-green-50 border-green-400 text-green-700"
//                 : "bg-red-50 border-red-400 text-red-700"
//             }`}
//           >
//             <pre className="text-sm overflow-x-auto">
//               {JSON.stringify(response, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import api from "@/lib/api"; // adjust path if needed

export default function ReschedulePage() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    department: "",
    year: "",
    section: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload Excel file");
      return;
    }

    if (!formData.start || !formData.end) {
      alert("Please select start and end date");
      return;
    }

    const startISO = new Date(formData.start).toISOString();
    const endISO = new Date(formData.end).toISOString();

    if (isNaN(new Date(startISO)) || isNaN(new Date(endISO))) {
      alert("Invalid date format");
      return;
    }

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
        "http://4.194.252.156:4040/institutes/rescheduleLectures",
        data
      );

      setResponse(res.data);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            📅 Reschedule Lectures
          </h1>
          <p className="text-slate-500 mt-2">
            Upload Excel timetable and update lecture schedule.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* File Upload */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <label className="block text-sm font-semibold text-slate-600 mb-3">
              Upload Excel File
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="CSE"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                placeholder="3"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Section
              </label>
              <input
                type="text"
                name="section"
                placeholder="D"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Response Section */}
        {response && (
          <div
            className={`mt-10 p-6 rounded-2xl border ${
              response.status === "success"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
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
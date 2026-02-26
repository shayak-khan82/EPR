// // // "use client";
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function FaceUpload() {
// // //   const [file, setFile] = useState(null);
// // //   const [message, setMessage] = useState("");

// // //   const handleUpload = async () => {
// // //     if (!file) return alert("Please select a photo!");
// // //     const formData = new FormData();
// // //     formData.append("face", file);

// // //     try {
// // //       const res = await axios.post("http://localhost:8000/upload-face", formData, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });
// // //       setMessage(res.data.message); // e.g., "Identified: John Doe"
// // //     } catch (err) {
// // //       console.error(err);
// // //       setMessage("Error recognizing face");
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
// // //       <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center">
// // //         <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Face</h1>

// // //         <input
// // //           type="file"
// // //           accept="image/*"
// // //           onChange={(e) => setFile(e.target.files[0])}
// // //           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
// // //         />

// // //         <button
// // //           onClick={handleUpload}
// // //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
// // //         >
// // //           Upload & Identify
// // //         </button>

// // //         {message && (
// // //           <p className="mt-6 text-lg font-semibold text-gray-700 bg-gray-100 p-3 rounded">
// // //             {message}
// // //           </p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState } from "react";
// // import api from "@/lib/api"; // 👈 import your token-based API

// // export default function FaceUpload() {
// //   const [rollNo, setRollNo] = useState("");
// //   const [studentId, setStudentId] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [message, setMessage] = useState("");

// //   // STEP 1 — FETCH STUDENT ID USING ROLL NO
// //   const getStudent = async () => {
// //     if (!rollNo) return alert("Enter Roll No");

// //     try {
// //       // 👇 This automatically adds Authorization + Base URL
// //       const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);

// //       const id = res.data.data._id;
// //       setStudentId(id);
// //       setMessage(`Student Found: ID = ${id}`);
// //     } catch (err) {
// //       console.log(err);
// //       setMessage("Roll No not found!");
// //     }
// //   };

// //   // STEP 2 — UPLOAD FACE TO THAT STUDENT ID
// //   const uploadFace = async () => {
// //     if (!studentId) return alert("Fetch Student ID First");
// //     if (!file) return alert("Upload a face image");

// //     const formData = new FormData();
// //     formData.append("face", file);
// //     formData.append("student_id", studentId);

// //     try {
// //       // 👇 Automatically sends Authorization + token refresh
// //       const res = await api.post(`api/enroll-student`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       setMessage(res.data.message);
// //     } catch (err) {
// //       console.log(err);
// //       setMessage("Face upload failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
// //       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
// //         <h1 className="text-2xl font-bold mb-6 text-gray-800">
// //           Upload Student Face
// //         </h1>

// //         {/* STEP 1: Enter Roll No */}
// //         <input
// //           type="text"
// //           placeholder="Enter Roll No"
// //           value={rollNo}
// //           onChange={(e) => setRollNo(e.target.value)}
// //           className="w-full border px-4 py-2 rounded-lg mb-4"
// //         />

// //         <button
// //           onClick={getStudent}
// //           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mb-6"
// //         >
// //           Get Student ID
// //         </button>

// //         {/* STEP 2: Only show upload if ID found */}
// //         {studentId && (
// //           <>
// //             <p className="mb-4 font-semibold">Student ID: {studentId}</p>

// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => setFile(e.target.files[0])}
// //               className="w-full border px-4 py-2 rounded-lg mb-4"
// //             />

// //             <button
// //               onClick={uploadFace}
// //               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
// //             >
// //               Upload Face
// //             </button>
// //           </>
// //         )}

// //         {/* RESPONSE MESSAGE */}
// //         {message && (
// //           <p className="mt-6 p-3 bg-gray-100 rounded text-gray-700 font-semibold">
// //             {message}
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import api from "@/lib/api"; // your axios instance

// export default function FaceUpload() {
//   const [rollNo, setRollNo] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   // STEP 1 — FETCH STUDENT ID USING ROLL NO
//   const getStudent = async () => {
//     if (!rollNo) return alert("Enter Roll No");

//     try {
//       const res = await api.get(`/institutes/getId?rollNo=${rollNo}`);
//       const id = res.data.data._id;

//       setStudentId(id);
//       setMessage(`Student Found: ID = ${id}`);
//     } catch (error) {
//       console.log(error);
//       setMessage("Roll No not found!");
//     }
//   };

//   // STEP 2 — UPLOAD FACE EXACTLY LIKE POSTMAN
//   const uploadFace = async () => {
//     if (!studentId) return alert("Fetch Student ID First");
//     if (!file) return alert("Select a face image");

//     const formData = new FormData();
//     formData.append("studentId", studentId);  // EXACT name from Postman
//     formData.append("file", file);            // EXACT name from Postman

//     try {
//       const res = await api.post("http://4.194.252.156:8000/api/enroll-student",
        
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(res.data.message);
//     } catch (error) {
//       console.log(error);
//       setMessage("Face upload failed!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">
//           Enroll Student Face
//         </h1>

//         {/* STEP 1 - Get Student ID */}
//         <input
//           type="text"
//           placeholder="Enter Roll Number"
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           className="w-full border px-4 py-2 rounded-lg mb-4"
//         />

//         <button
//           onClick={getStudent}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mb-6"
//         >
//           Get Student ID
//         </button>

//         {/* STEP 2 - Upload Face */}
//         {studentId && (
//           <>
//             <p className="mb-4 font-semibold">Student ID: {studentId}</p>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="w-full border px-4 py-2 rounded-lg mb-4"
//             />

//             <button
//               onClick={uploadFace}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
//             >
//               Upload Face
//             </button>
//           </>
//         )}

//         {message && (
//           <p className="mt-6 p-3 bg-gray-100 rounded text-gray-700 font-semibold">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
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

// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
// //       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
// //           <li className="mb-2 tracking-[-.01em]">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
// //               app/page.js
// //             </code>
// //             .
// //           </li>
// //           <li className="tracking-[-.01em]">
// //             Save and see your changes instantly.
// //           </li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }

// "use client";

// import { FaUsers, FaChalkboardTeacher, FaBuilding, FaBook, FaClipboardList, FaUserCheck, FaBookOpen, FaChalkboard } from "react-icons/fa";

// export default function ERPMainPage() {
//   const modules = [
//     {
//       title: "Students Management",
//       icon: <FaUsers className="text-5xl text-blue-500" />,
//       description: "Manage student profiles, enrollment, attendance, grades, and performance reports efficiently."
//     },
//     {
//       title: "Faculty Management",
//       icon: <FaChalkboardTeacher className="text-5xl text-green-500" />,
//       description: "Handle faculty profiles, subjects assigned, schedules, and performance tracking seamlessly."
//     },
//     {
//       title: "Departments & Courses",
//       icon: <FaBuilding className="text-5xl text-yellow-500" />,
//       description: "Organize all departments and courses, assign subjects, and manage academic structures."
//     },
//     {
//       title: "Subjects & Lectures",
//       icon: <FaBookOpen className="text-5xl text-indigo-500" />,
//       description: "Create subjects, schedule lectures, manage classrooms, and track lecture details."
//     },
//     {
//       title: "Attendance Tracking",
//       icon: <FaClipboardList className="text-5xl text-pink-500" />,
//       description: "Monitor student attendance by class or by individual student with analytics and reports."
//     },
//     {
//       title: "Exams & Results",
//       icon: <FaBook className="text-5xl text-purple-500" />,
//       description: "Manage exams, mark entry, result generation, and student performance dashboards."
//     },
//     {
//       title: "ERP Analytics",
//       icon: <FaUserCheck className="text-5xl text-red-500" />,
//       description: "Get insights and analytics on student progress, faculty activity, and departmental performance."
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 p-8">
//       {/* Hero Section */}
//       <section className="text-center py-16">
//         <h1 className="text-5xl font-extrabold mb-6 text-gray-800">College ERP System</h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           A comprehensive, modern ERP system designed to manage students, faculty, courses, attendance, and academic analytics — all in one place.
//         </p>
//       </section>

//       {/* Features / Modules Section */}
//       <section className="py-16 max-w-6xl mx-auto">
//         <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Modules & Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
//           {modules.map((mod) => (
//             <div key={mod.title} className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition">
//               <div className="mb-6 flex justify-center">{mod.icon}</div>
//               <h3 className="text-2xl font-semibold mb-4 text-gray-800">{mod.title}</h3>
//               <p className="text-gray-600">{mod.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* About / Advantages Section */}
//       <section className="py-16 bg-indigo-50 rounded-3xl max-w-6xl mx-auto px-8">
//         <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Why Choose Our ERP?</h2>
//         <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
//           Our College ERP system is designed for scalability, usability, and real-time performance. It provides an intuitive interface for students, faculty, and administrators, ensuring academic operations run smoothly.
//         </p>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700 text-center">
//           <li className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">User-Friendly Interface</li>
//           <li className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">Real-Time Analytics</li>
//           <li className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">Attendance & Exam Management</li>
//           <li className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">Secure & Scalable</li>
//         </ul>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 text-center">
//         <h2 className="text-4xl font-bold mb-6 text-gray-800">Get Started Today</h2>
//         <p className="text-gray-600 mb-6">Empower your institution with an all-in-one ERP solution for academic excellence.</p>
//         <button className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
//           Request Demo
//         </button>
//       </section>
//     </div>
//   );
// }
"use client";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
  FaClipboardList,
  FaUserCheck,
  FaBookOpen,
  FaFingerprint,
} from "react-icons/fa";

export default function ERPMainPage() {
  const modules = [
    {
      title: "Students",
      icon: <FaUsers className="text-4xl text-blue-700" />,
      description: "Manage student data, enrollment, profiles, and academic records.",
    },
    {
      title: "Faculty",
      icon: <FaChalkboardTeacher className="text-4xl text-green-700" />,
      description: "Monitor faculty workload, courses, schedules, and performance.",
    },
    {
      title: "Departments",
      icon: <FaBuilding className="text-4xl text-yellow-700" />,
      description: "Organize departments, assign courses, and manage structures.",
    },
    {
      title: "Subjects & Lectures",
      icon: <FaBookOpen className="text-4xl text-indigo-700" />,
      description: "Create subjects, schedule lectures, allocate classes and halls.",
    },
    {
      title: "Face Recognition Attendance",
      icon: <FaFingerprint className="text-4xl text-purple-700" />,
      description: "AI-based attendance system using accurate facial recognition.",
    },
    {
      title: "Attendance Tracking",
      icon: <FaClipboardList className="text-4xl text-pink-700" />,
      description: "Track attendance by classes, students, and subjects effortlessly.",
    },
    {
      title: "Exams & Results",
      icon: <FaBook className="text-4xl text-orange-700" />,
      description: "Create exams, manage marks, and auto-generate student results.",
    },
    {
      title: "Analytics",
      icon: <FaUserCheck className="text-4xl text-red-700" />,
      description: "View dashboards for students, faculty, attendance, & results.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa]">

      {/* ============================
          🎓 HEADER / HERO SECTION
      ============================= */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white py-20 px-6 shadow-lg relative">

        {/* Soft College Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            College ERP System
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            A complete academic management solution designed for modern colleges —  
            from attendance to analytics, all powered by smart automation.
          </p>
        </div>
      </header>

      {/* ============================
         🎓 FEATURE MODULES SECTION
      ============================= */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Academic Modules
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="bg-white p-8 rounded-2xl shadow-md border hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">{mod.icon}</div>

              <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
                {mod.title}
              </h3>

              <p className="text-gray-600 text-center">{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
         🎓 CAMPUS ADVANTAGE SECTION
      ============================= */}
      <section className="max-w-6xl mx-auto mt-20 px-6 text-gray-800">
        <div className="bg-white p-10 rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Why Colleges Prefer This ERP
          </h2>

          <p className="text-center max-w-3xl mx-auto mb-10 text-gray-600">
            Designed for educational institutions with a friendly UI,
            smooth navigation, and strong academic workflow management.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-blue-50 rounded-xl text-center shadow">
              🎓 Student-Friendly UI
            </div>
            <div className="p-5 bg-purple-50 rounded-xl text-center shadow">
              ⚡ Quick Face Attendance
            </div>
            <div className="p-5 bg-green-50 rounded-xl text-center shadow">
              📊 Real-Time Reports
            </div>
            <div className="p-5 bg-orange-50 rounded-xl text-center shadow">
              🔒 Secure & Reliable
            </div>
          </div>
        </div>
      </section>

      {/* ============================
            📞 CTA SECTION 
      ============================= */}
      <section className="text-center mt-20 pb-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Modernize Your Campus?
        </h2>
        <p className="text-gray-600 mb-8">
          Switch to automated attendance, digital academics, and smart analytics.
        </p>
        <button className="px-10 py-4 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 shadow-lg transition">
          Contact Administration
        </button>
      </section>
    </div>
  );
}

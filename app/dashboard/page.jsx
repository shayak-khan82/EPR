
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
  FaClipboardList,
  FaUserCheck,
  FaBookOpen,
  FaChalkboard,
  FaFingerprint,
} from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
  }, [router]);

  const modules = [
    {
      title: "Students",
      subtitle: "Bulk Add & Manage Students",
      icon: <FaUsers className="text-5xl text-blue-600" />,
      path: "/students/bulk-add",
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Faculties",
      subtitle: "Bulk Add & Manage Faculties",
      icon: <FaChalkboardTeacher className="text-5xl text-green-600" />,
      path: "/faculties/bulk-add",
      color: "from-green-50 to-green-100",
    },
    {
      title: "Departments",
      subtitle: "Create & Manage Departments",
      icon: <FaBuilding className="text-5xl text-yellow-600" />,
      path: "/departments",
      color: "from-yellow-50 to-yellow-100",
    },
    {
      title: "Courses",
      subtitle: "Create & Manage Courses",
      icon: <FaBook className="text-5xl text-purple-600" />,
      path: "/courses",
      color: "from-purple-50 to-purple-100",
    },
    {
      title: "Subjects",
      subtitle: "Create & Manage Subjects",
      icon: <FaBookOpen className="text-5xl text-indigo-600" />,
      path: "/subjects",
      color: "from-indigo-50 to-indigo-100",
    },
    {
      title: "Lectures",
      subtitle: "Schedule & Manage Lectures",
      icon: <FaChalkboard className="text-5xl text-teal-600" />,
      path: "/lectures",
      color: "from-teal-50 to-teal-100",
    },
    // {
    //   title: "Face Recognition",
    //   subtitle: "Identify Students via Face",
    //   icon: <FaFingerprint className="text-5xl text-pink-600" />,
    //   path: "/face",
    //   color: "from-pink-50 to-pink-100",
    // },
    {
      title: "Attendance by Class",
      subtitle: "Track Class Attendance",
      icon: <FaClipboardList className="text-5xl text-orange-500" />,
      path: "/attendance/by-class",
      color: "from-orange-50 to-orange-100",
    },
    {
      title: "Attendance by Student",
      subtitle: "Track Student Attendance",
      icon: <FaUserCheck className="text-5xl text-red-600" />,
      path: "/attendance/by-student",
      color: "from-red-50 to-red-100",
    },
    // {
    //   title: "Upload Attendance",
    //   subtitle: "Excel / CSV attendance upload",
    //   icon: <FaUserCheck className="text-5xl text-blue-500" />,
    //   path: "/uploadAttend",
    //   color: "from-blue-50 to-blue-100",
    // },
     {
      title: "residuelectures",
      subtitle: "Excel / CSV attendance upload",
      icon: <FaUserCheck className="text-5xl text-blue-500" />,
      path: "/residuelectures",
      color: "from-blue-50 to-blue-100",
    },
     {
      title: "residuelectures",
      subtitle: "Excel / CSV attendance upload",
      icon: <FaUserCheck className="text-5xl text-blue-500" />,
      path: "/updatalectures",
      color: "from-blue-50 to-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-wide">
        College ERP Dashboard
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {modules.map((mod, i) => (
          <div
            key={i}
            onClick={() => router.push(mod.path)}
            className={`
              bg-gradient-to-br ${mod.color}
              rounded-3xl shadow-lg p-7 cursor-pointer 
              group relative overflow-hidden
              transition-all duration-300 transform 
              hover:-translate-y-2 hover:shadow-2xl 
            `}
          >
            {/* Glow circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

            {/* Icon */}
            <div className="mb-5 group-hover:scale-110 transition-transform">
              {mod.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {mod.title}
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 font-medium">{mod.subtitle}</p>

            {/* Arrow Button */}
            <div className="absolute bottom-5 right-5">
              <div className="h-10 w-10 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

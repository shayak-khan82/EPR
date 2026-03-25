"use client";

import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

  const options = [
    {
      title: "Add Courses",
      path: "/courses/add-course",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Manage Courses",
      path: "/courses/mange",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-10">
        Courses Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {options.map((item) => (
          <div
            key={item.title}
            onClick={() => router.push(item.path)}
            className={`bg-gradient-to-r ${item.color} text-white p-10 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition text-center`}
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
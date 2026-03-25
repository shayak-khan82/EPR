"use client";

import { useRouter } from "next/navigation";

export default function SubjectsPage() {
  const router = useRouter();

  const options = [
    {
      title: "Add Subjects",
      path: "/subjects/add-subjects",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Manage Subjects",
      path: "/subjects/mange",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-10">
        Subjects Dashboard
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
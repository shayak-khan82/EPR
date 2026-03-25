"use client";

import { useRouter } from "next/navigation";

export default function FacultiesPage() {
  const router = useRouter();

  const options = [
    {
      title: "Add Faculties",
      path: "/faculties/bulk-add",
      color: "bg-blue-500",
    },
    {
      title: "Manage Faculties",
      path: "/faculties/mange",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-8">
        Faculties Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {options.map((item) => (
          <div
            key={item.title}
            onClick={() => router.push(item.path)}
            className={`${item.color} text-white p-8 rounded-xl shadow-md cursor-pointer hover:scale-105 transition text-center`}
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

// // // // "use client";

// // // // import { useRouter } from "next/navigation";
// // // // import { useEffect, useState } from "react";

// // // // export default function Navbar() {
// // // //   const router = useRouter();
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// // // //   // ✅ Check login state on mount
// // // //   // useEffect(() => {
// // // //   //   const token = localStorage.getItem("accessToken");
// // // //   //   setIsLoggedIn(!!token); // true if token exists
// // // //   // }, []);
// // // //   useEffect(() => {
// // // //   const checkLoginStatus = () => {
// // // //     const token = localStorage.getItem("accessToken");
// // // //     setIsLoggedIn(!!token);
// // // //   };

// // // //   checkLoginStatus();
// // // //   window.addEventListener("storage", checkLoginStatus);
// // // //   return () => window.removeEventListener("storage", checkLoginStatus);
// // // // }, []);

// // // //   // ✅ Logout handler
// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("accessToken");
// // // //     localStorage.removeItem("refreshToken");
// // // //     setIsLoggedIn(false);
// // // //     router.push("/login");
// // // //   };

// // // //   return (
// // // //     <nav className="bg-white shadow-md fixed w-full z-50">
// // // //       <div className="max-w-7xl mx-auto px-6 lg:px-8">
// // // //         <div className="flex justify-between items-center h-16">
// // // //           {/* Logo / Brand */}
// // // //           <div className="flex-shrink-0">
// // // //             <h1
// // // //               className="text-2xl font-bold text-purple-600 cursor-pointer"
// // // //               onClick={() => router.push("/")}
// // // //             >
// // // //               College ERP
// // // //             </h1>
// // // //           </div>

// // // //           {/* Right side - Login/Logout Button */}
// // // //           <div>
// // // //             {isLoggedIn ? (
// // // //               <button
// // // //                 onClick={handleLogout}
// // // //                 className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
// // // //               >
// // // //                 Logout
// // // //               </button>
// // // //             ) : (
// // // //               <button
// // // //                 onClick={() => router.push("/login")}
// // // //                 className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
// // // //               >
// // // //                 Login
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // }
// // // "use client";

// // // import { useRouter } from "next/navigation";
// // // import { useEffect, useState } from "react";

// // // export default function Navbar() {
// // //   const router = useRouter();
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// // //   // Check login status
// // //   useEffect(() => {
// // //     const checkLoginStatus = () => {
// // //       const token = localStorage.getItem("accessToken");
// // //       setIsLoggedIn(!!token);
// // //     };

// // //     checkLoginStatus();
// // //     window.addEventListener("storage", checkLoginStatus);
// // //     return () => window.removeEventListener("storage", checkLoginStatus);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("accessToken");
// // //     localStorage.removeItem("refreshToken");
// // //     setIsLoggedIn(false);
// // //     router.push("/login");
// // //   };

// // //   return (
// // //     <nav className="bg-white shadow-md fixed w-full z-50 border-b border-gray-200">
// // //       <div className="max-w-6xl mx-auto px-6">
// // //         <div className="flex justify-between items-center h-16">

// // //           {/* 🎓 Logo Section */}
// // //           <div
// // //             className="flex items-center gap-2 cursor-pointer"
// // //             onClick={() => router.push("/")}
// // //           >
// // //             <div className="bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
// // //               🎓
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
// // //               College ERP
// // //             </h1>
// // //           </div>

// // //           {/* 🔗 Center Navigation Menu */}

// // //           {/* 🔘 Login / Logout Button */}

          

// // //           <div>
// // //             {isLoggedIn ? (
// // //               <button
// // //                 onClick={handleLogout}
// // //                 className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
// // //               >
// // //                 Logout
// // //               </button>
// // //             ) : (
// // //               <button
// // //                 onClick={() => router.push("/login")}
// // //                 className="px-5 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
// // //               >
// // //                 Login
// // //               </button>
// // //             )}
// // //           </div>

          
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }
// // "use client";

// // import { useRouter, usePathname } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

// // export default function Navbar() {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   const checkLoginStatus = () => {
// //     const token = localStorage.getItem("accessToken");
// //     setIsLoggedIn(!!token);
// //   };

// //   // ✅ Run on mount
// //   useEffect(() => {
// //     checkLoginStatus();
// //   }, []);

// //   // ✅ Run whenever route changes (IMPORTANT)
// //   useEffect(() => {
// //     checkLoginStatus();
// //   }, [pathname]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("accessToken");
// //     localStorage.removeItem("refreshToken");
// //     setIsLoggedIn(false);
// //     router.push("/login");
// //   };

// //   return (
// //     <nav className="bg-white shadow-md fixed w-full z-50 border-b border-gray-200">
// //       <div className="max-w-6xl mx-auto px-6">
// //         <div className="flex justify-between items-center h-16">

// //           {/* Logo */}
// //           <div
// //             className="flex items-center gap-2 cursor-pointer"
// //             onClick={() => router.push("/")}
// //           >
// //             <div className="bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
// //               🎓
// //             </div>
// //             <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
// //               College ERP
// //             </h1>
// //           </div>

// //           {/* Login / Logout */}
// //           <div>
// //             {isLoggedIn ? (
// //               <button
// //                 onClick={handleLogout}
// //                 className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
// //               >
// //                 <FaSignOutAlt />
// //                 Logout
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={() => router.push("/login")}
// //                 className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
// //               >
// //                 <FaSignInAlt />
// //                 Login
// //               </button>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }
// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const checkLoginStatus = () => {
//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token);
//   };

//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     checkLoginStatus();
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50 border-b border-gray-200">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="flex justify-between items-center h-16">

//           {/* 🎓 Logo */}
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => router.push("/")}
//           >
//             <div className="bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
//               🎓
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
//               College ERP
//             </h1>
//           </div>

//           {/* 🔗 Right Side Menu */}
//           <div className="flex items-center gap-4">

//             {/* Dashboard Button (Only when logged in) */}
//             {isLoggedIn && (
//               <button
//                 onClick={() => router.push("/dashboard")}
//                 className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 <FaTachometerAlt />
//                 Dashboard
//               </button>
//             )}

//             {/* Login / Logout */}
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={() => router.push("/login")}
//                 className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
//               >
//                 <FaSignInAlt />
//                 Login
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* 🎓 Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
              🎓
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              College ERP
            </h1>
          </div>

          {/* 🔗 Right Side Menu */}
          <div className="flex items-center gap-4">

            {/* Dashboard Button (Only when logged in) */}
            {isLoggedIn && (
              <button
                onClick={() => router.push("/home")}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <FaTachometerAlt />
                Dashboard
              </button>
            )}

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                <FaSignInAlt />
                Login
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
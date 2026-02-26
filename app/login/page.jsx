// // // "use client";
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function LoginPage() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const res = await axios.post(
// // //         "http://4.194.252.156:4040/institutes/login",
// // //         { email, password }
// // //       );

// // //       // ✅ if login successful, store tokens if backend returns them
// // //       if (res.data.accessToken) {
// // //         localStorage.setItem("accessToken", res.data.accessToken);
// // //       }
// // //       if (res.data.refreshToken) {
// // //         localStorage.setItem("refreshToken", res.data.refreshToken);
// // //       }

// // //       alert("Login successful ✅");
// // //       // router.push("/dashboard"); // redirect after login
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("Invalid email or password ❌");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex h-screen justify-center items-center bg-gray-100">
// // //       <form
// // //         onSubmit={handleLogin}
// // //         className="bg-white p-8 rounded-lg shadow-md w-96"
// // //       >
// // //         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           required
// // //           className="w-full mb-4 p-2 border rounded"
// // //         />

// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //           className="w-full mb-4 p-2 border rounded"
// // //         />

// // //         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// // //         >
// // //           {loading ? "Logging in..." : "Login"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState } from "react";
// // import api from "@/lib/api";
// // import { useRouter } from "next/navigation";
// // import { ENDPOINT } from "@/lib/app";

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await api.post(ENDPOINT.Institutes, { instiEmail:email, pwd:password });

// //       localStorage.setItem("accessToken", res.data.accessToken);
// //       localStorage.setItem("refreshToken", res.data.refreshToken);

// //       router.push("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       setError("Login failed ❌");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
// //         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //           className="w-full mb-4 p-2 border rounded"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //           className="w-full mb-4 p-2 border rounded"
// //         />

// //         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { ENDPOINT } from "@/lib/app";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post(ENDPOINT.Institutes, {
//         instiEmail: email,
//         pwd: password,
//       });

//       // ✅ Use actual keys from backend response
//       const accessToken = res.data.jtoken.token;
//       const refreshToken = res.data.token_r_id;

//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       router.push("/dashboard");
//       router.refresh(); 
//     } catch (err) {
//       console.error(err);
//       setError("Login failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full mb-4 p-2 border rounded"
//         />

//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { ENDPOINT } from "@/lib/app";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(ENDPOINT.Institutes, {
        instiEmail: email,
        pwd: password,
      });

      const accessToken = res.data.jtoken.token;
      const refreshToken = res.data.token_r_id;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border w-full max-w-md">
        
        <h1 className="text-gray-800 text-3xl font-bold text-center mb-8">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 text-gray-700 pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-300 focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-50 text-gray-700 pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-300 focus:border-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}


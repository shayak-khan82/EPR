

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

      router.push("/home");
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


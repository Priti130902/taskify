"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

/* ================= TYPES ================= */

type ApiError = {
  message: string;
};

type LoginResponse = {
  token: string;
};

/* ================= COMPONENT ================= */

export default function AuthPage() {
  const router = useRouter();

  const [tab, setTab] = useState<"login" | "signup">("login");

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup state
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= LOGIN ================= */

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email & password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // save token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }

      router.replace("/dashboard");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async () => {
    if (!name || !signupEmail || !signupPassword) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email: signupEmail,
          password: signupPassword,
        }
      );

      alert("Account created ✅ Please login");
      setTab("login");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow border px-8 py-10">

        {/* Back */}
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← Back to home
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center my-6">
          <div className="h-12 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
            ✓
          </div>
          <h1 className="text-xl font-semibold mt-2">TaskFlow</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              tab === "login" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              tab === "signup" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* ================= LOGIN ================= */}
        {tab === "login" && (
          <>
            <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm mb-6">
              Login to access your dashboard
            </p>

            <div className="space-y-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </>
        )}

        {/* ================= SIGNUP ================= */}
        {tab === "signup" && (
          <>
            <h2 className="text-2xl font-semibold mb-1">
              Create an account
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Sign up to get started
            </p>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

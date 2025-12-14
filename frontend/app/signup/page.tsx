"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border px-8 py-10">
        
        {/* Back */}
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block"
        >
          ← Back to home
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold mb-2">
            ✓
          </div>
          <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-1">Create an account</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your details to get started
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={() => {
              login(); // fake signup = logged in
              router.replace("/dashboard");
            }}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth" className="text-emerald-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ===== FETCH PROFILE ===== */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setName(data.name);
        setLoading(false);
      });
  }, []);

  /* ===== UPDATE PROFILE ===== */
  const updateProfile = async () => {
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const updated = await res.json();
    setUser(updated);
    setEditOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Error loading profile</p>;

  return (
    <>
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* CARD */}
      <div className="bg-white border rounded-2xl p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium capitalize">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p><b>Full Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p className="text-sm text-gray-500">
            Member since: {new Date(user.createdAt).toDateString()}
          </p>
        </div>

        <button
          onClick={() => setEditOpen(true)}
          className="mt-6 bg-emerald-500 text-white px-5 py-2 rounded-xl"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setEditOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 z-10">
            <h2 className="text-lg font-semibold mb-4">
              Edit Profile
            </h2>

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 mb-4"
              placeholder="Full name"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

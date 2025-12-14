"use client";

import { useEffect, useState } from "react";
type Task = {
  _id: string;
  title: string;
  status: "Pending" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function DashboardPage() {
const [tasks, setTasks] = useState<Task[]>([]);
const [user, setUser] = useState<User | null>(null);
useEffect(() => {
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setTasks(data);
  };

  fetchTasks();

  const onStorage = () => fetchTasks();
  window.addEventListener("storage", onStorage);

  return () => window.removeEventListener("storage", onStorage);
}, []);


  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
</h1>

        <p className="text-gray-500 text-sm">
          Here&apos;s an overview of your tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Stat title="Total Tasks" value={tasks.length} />
        <Stat title="Completed" value={tasks.filter(t => t.status === "Completed").length} />
        <Stat title="Pending" value={tasks.filter(t => t.status === "Pending").length} />
        <Stat title="High Priority" value={tasks.filter(t => t.priority === "High").length} />
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>

      {tasks.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center">
          <p className="font-medium">No tasks yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map(t => (
            <div key={t._id} className="bg-white border rounded-xl p-4 flex justify-between">
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-gray-500">
                  {t.status} • {t.priority}
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No date"}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border rounded-2xl p-5 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
        ✓
      </div>
    </div>
  );
}

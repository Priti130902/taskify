"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type TaskStatus = "Pending" | "Completed" | "In Progress";
type TaskPriority = "Low" | "Medium" | "High";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
};

/* ================= PAGE ================= */

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ===== FETCH TASKS ===== */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, [token]);

  /* ===== DELETE TASK ===== */
  const deleteTask = async (id: string) => {
    if (!token) return;

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(prev => prev.filter(t => t._id !== id));
    setOpenMenu(null);
  };

  /* ===== UPDATE STATUS ===== */
  const updateTaskStatus = async (id: string, newStatus: TaskStatus) => {
    if (!token) return;

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setTasks(prev =>
      prev.map(t =>
        t._id === id ? { ...t, status: newStatus } : t
      )
    );

    setOpenMenu(null);
  };

  /* ===== FILTERED TASKS ===== */
  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== "All" && task.status !== filterStatus) return false;
    if (filterPriority !== "All" && task.priority !== filterPriority)
      return false;
    return true;
  });

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-gray-500 text-sm">
            Manage and organize your tasks
          </p>
        </div>

        <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm">
          + New Task
        </button>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search tasks..."
          className="flex-1 border rounded-xl px-4 py-2"
        />

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* ================= TASK LIST ================= */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center">
          No tasks found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div
              key={task._id}
              className="bg-white border rounded-2xl p-5 relative"
            >
              {/* 3 DOT MENU */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === task._id ? null : task._id)
                  }
                  className="text-gray-400 hover:text-black text-xl"
                >
                  ⋮
                </button>

                {openMenu === task._id && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg text-sm z-10">
                    <button
                      onClick={() => updateTaskStatus(task._id, "Pending")}
                      className="block w-full px-4 py-2 hover:bg-gray-50 text-left"
                    >
                      ⏳ Mark Pending
                    </button>

                    <button
                      onClick={() =>
                        updateTaskStatus(task._id, "In Progress")
                      }
                      className="block w-full px-4 py-2 hover:bg-gray-50 text-left"
                    >
                      🔄 Mark In Progress
                    </button>

                    <button
                      onClick={() => updateTaskStatus(task._id, "Completed")}
                      className="block w-full px-4 py-2 hover:bg-gray-50 text-left"
                    >
                      ✅ Mark Completed
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>

              {/* TASK CONTENT */}
              <h3 className="font-semibold">{task.title}</h3>

              {task.description && (
                <p className="text-sm text-gray-500 mb-2">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                  {task.status}
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                  {task.priority}
                </span>
                <span className="ml-auto text-gray-400">
                  {task.dueDate
                    ? new Date(task.dueDate).toDateString()
                    : "No date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-gray-500 text-sm mt-8">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="px-6 py-5 flex items-center gap-2 font-semibold text-lg">
          <div className="h-9 w-9 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
            ✓
          </div>
          TaskFlow
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm">
          <SidebarLink href="/dashboard" label="Overview" active={pathname === "/dashboard"} />
          <SidebarLink href="/dashboard/tasks" label="Tasks" active={pathname.startsWith("/dashboard/tasks")} />
          <SidebarLink href="/dashboard/profile" label="Profile" active={pathname.startsWith("/dashboard/profile")} />
        </nav>

        <button
          onClick={() => {
            logout();
            router.replace("/auth");
          }}
          className="px-6 py-4 text-sm text-gray-500 border-t hover:text-black"
        >
          ⎋ Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg ${
        active
          ? "bg-gray-100 font-medium"
          : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}

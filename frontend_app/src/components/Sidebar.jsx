import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Sidebar component providing secondary navigation.
 * Hidden on small screens by default; shows on md+.
 */
export default function Sidebar() {
  // Hooks must be called unconditionally
  const { user } = useAuth();

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/projects", label: "Projects" },
    { to: "/auth", label: user ? "Account" : "Login / Signup" },
  ];

  return (
    <aside className="hidden md:block md:w-64 border-r border-gray-200 bg-gray-50 h-full">
      <div className="p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Navigation
        </h2>
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 text-sm ${isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {!user ? (
          <div className="mt-6 rounded-md border border-dashed border-gray-300 p-3 text-xs text-gray-600">
            Log in to create and manage projects.
          </div>
        ) : null}
      </div>
    </aside>
  );
}

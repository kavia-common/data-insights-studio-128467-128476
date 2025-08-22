import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Sidebar component providing secondary navigation with accent highlights.
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
    <aside className="hidden h-full bg-gray-50/70 md:block md:w-64 border-r border-gray-100">
      <div className="p-4">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
          Navigation
        </h2>
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  [
                    "group relative block rounded-md px-3 py-2 text-sm transition-colors",
                    "ring-1 ring-inset",
                    isActive
                      ? "bg-blue-50 text-primary ring-blue-200"
                      : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:text-gray-900",
                  ].join(" ")
                }
              >
                <span
                  className="absolute left-0 top-1/2 hidden h-5 -translate-y-1/2 rounded-r-full bg-accent md:block"
                  style={{ width: 3 }}
                />
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {!user ? (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-3 text-xs text-gray-600 shadow-sm">
            <p className="mb-2 font-medium text-secondary">Guest mode</p>
            <p>Log in to create and manage projects.</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

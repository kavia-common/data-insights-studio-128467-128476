import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

/**
 * PUBLIC_INTERFACE
 * Sidebar component providing secondary navigation with accent highlights.
 * Hidden on small screens by default; shows on md+.
 * Shows project list with active project highlight and quick switching.
 */
export default function Sidebar() {
  // Hooks must be called unconditionally
  const { user } = useAuth();
  const { projects, activeProjectId, setActiveProject } = useProjects();

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

        <div className="mt-6">
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            Projects
          </h3>
          {projects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-3 text-xs text-gray-600 shadow-sm">
              No projects yet. Create one from the Projects page.
            </div>
          ) : (
            <ul className="space-y-1">
              {projects.map((p) => {
                const active = p.id === activeProjectId;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setActiveProject(p.id)}
                      className={[
                        "w-full truncate rounded-md px-3 py-2 text-left text-sm ring-1 ring-inset transition",
                        active
                          ? "bg-blue-50 text-primary ring-blue-200"
                          : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:text-gray-900",
                      ].join(" ")}
                      title={p.name}
                    >
                      <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: active ? "#22c55e" : "#d1d5db" }} />
                      {p.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

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

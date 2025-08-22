import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Header component providing top navigation and branding with modern Tailwind styling.
 */
export default function Header() {
  // Hooks must be called unconditionally
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-sm ring-1 ring-blue-600/20">
            DS
          </span>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900 leading-none">
              Data Insights Studio
            </span>
            <span className="text-xs text-secondary">Build analytics with ease</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          <TopLink to="/" end>
            Home
          </TopLink>
          <TopLink to="/projects">Projects</TopLink>

          {!user ? (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                [
                  "ml-1 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "ring-1 ring-inset",
                  isActive
                    ? "bg-primary text-white ring-blue-600/20"
                    : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:text-gray-900",
                ].join(" ")
              }
            >
              Log in
            </NavLink>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700 ring-1 ring-inset ring-gray-200">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                {user.name || user.email}
              </span>
              <button
                className="inline-flex items-center rounded-md bg-accent/90 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                onClick={logout}
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

/**
 * PUBLIC_INTERFACE
 * Small helper component to render top nav links with active state styling.
 */
function TopLink({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "text-primary bg-blue-50"
            : "text-secondary hover:text-gray-900 hover:bg-gray-50",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

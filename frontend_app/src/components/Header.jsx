import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Header component providing top navigation and branding.
 */
export default function Header() {
  // Hooks must be called unconditionally
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white font-bold">DS</span>
          <span className="text-lg font-semibold text-gray-900">Data Insights Studio</span>
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"}`
            }
          >
            Projects
          </NavLink>

          {!user ? (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"}`
              }
            >
              Log in
            </NavLink>
          ) : (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                {user.name || user.email}
              </span>
              <button
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
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

import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Header component providing top navigation and branding.
 */
export default function Header() {
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
        </nav>
      </div>
    </header>
  );
}

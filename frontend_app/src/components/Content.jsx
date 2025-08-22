import React from "react";

/**
 * PUBLIC_INTERFACE
 * Content wrapper for the main page area with responsive spacing.
 */
export default function Content({ children }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}

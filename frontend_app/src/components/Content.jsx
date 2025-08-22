import React from "react";

/**
 * PUBLIC_INTERFACE
 * Content wrapper for the main page area.
 */
export default function Content({ children }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl p-4">{children}</div>
    </main>
  );
}

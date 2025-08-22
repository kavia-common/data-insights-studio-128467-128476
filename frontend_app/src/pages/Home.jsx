import React from "react";

/**
 * PUBLIC_INTERFACE
 * Home page - placeholder content for the app landing.
 */
export default function Home() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
      <p className="text-secondary">
        This is the starter shell. Use the sidebar or header links to navigate. Tailwind and routing are configured.
      </p>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-gray-600 shadow-sm">
        Placeholder area for dataset upload and instruction input.
      </div>
    </div>
  );
}

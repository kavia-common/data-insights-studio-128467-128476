import React from "react";

/**
 * PUBLIC_INTERFACE
 * Home page - placeholder content for the app landing.
 */
export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
      <p className="text-gray-600">
        This is the starter shell. Use the sidebar or header links to navigate. Tailwind and routing are configured.
      </p>
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-gray-500">
        Placeholder area for dataset upload and instruction input.
      </div>
    </div>
  );
}

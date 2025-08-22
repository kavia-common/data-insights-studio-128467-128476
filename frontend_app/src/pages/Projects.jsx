import React from "react";

/**
 * PUBLIC_INTERFACE
 * Projects page - placeholder list for future project management UI.
 */
export default function Projects() {
  const sampleProjects = ["Marketing KPIs", "Quarterly Sales", "Customer Churn Analysis"];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {sampleProjects.map((p) => (
          <li key={p} className="p-4 text-gray-800">{p}</li>
        ))}
      </ul>
    </div>
  );
}

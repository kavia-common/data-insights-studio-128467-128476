import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ProjectCreateModal is a small controlled modal for entering the project name.
 */
export default function ProjectCreateModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onCreate(name.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold text-gray-900">Create project</h3>
        <p className="mt-1 text-sm text-secondary">
          Give your project a short descriptive name.
        </p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            autoFocus
            type="text"
            placeholder="e.g., Marketing KPIs"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

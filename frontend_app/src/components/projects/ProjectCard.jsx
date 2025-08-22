import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";

/**
 * PUBLIC_INTERFACE
 * ProjectCard displays a single project with actions (open, rename, archive).
 */
export default function ProjectCard({ project, isActive, onOpen }) {
  const { archiveProject, renameProject } = useProjects();
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(project.name);

  const onRenameSubmit = (e) => {
    e.preventDefault();
    renameProject(project.id, name);
    setRenaming(false);
  };

  return (
    <div
      className={[
        "flex items-center justify-between rounded-lg border p-4 transition",
        "bg-white shadow-sm",
        isActive ? "border-blue-300 ring-1 ring-blue-200" : "border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      <div className="min-w-0 flex-1">
        {renaming ? (
          <form onSubmit={onRenameSubmit} className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
            <button type="submit" className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setName(project.name);
                setRenaming(false);
              }}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {isActive ? (
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              ) : (
                <span className="inline-block h-2 w-2 rounded-full bg-gray-300" />
              )}
              <h3 className="truncate text-sm font-semibold text-gray-900">{project.name}</h3>
            </div>
            <p className="mt-1 text-xs text-secondary">
              Created {new Date(project.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </div>

      {!renaming && (
        <div className="ml-3 flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-primary hover:bg-blue-100"
          >
            {isActive ? "Open" : "Open"}
          </button>
          <button
            type="button"
            onClick={() => setRenaming(true)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
          >
            Rename
          </button>
          <button
            type="button"
            onClick={() => archiveProject(project.id)}
            className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
            aria-label={`Archive ${project.name}`}
            title="Archive"
          >
            Archive
          </button>
        </div>
      )}
    </div>
  );
}

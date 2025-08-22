import React from "react";
import ProjectCard from "./ProjectCard";

/**
 * PUBLIC_INTERFACE
 * ProjectList lays out the list of projects with simple responsive grid.
 */
export default function ProjectList({ projects, activeProjectId, onOpen }) {
  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-secondary">
        No projects yet. Create your first project to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          isActive={p.id === activeProjectId}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

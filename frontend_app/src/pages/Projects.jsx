import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import ProjectList from "../components/projects/ProjectList";
import ProjectCreateModal from "../components/projects/ProjectCreateModal";

/**
 * PUBLIC_INTERFACE
 * Projects page - provides simple in-memory create/list/archive and switching.
 */
export default function Projects() {
  const { projects, activeProjectId, createProject, setActiveProject } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const onCreate = (name) => {
    createProject(name);
    setModalOpen(false);
  };

  const onOpen = (id) => setActiveProject(id);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
        >
          + New Project
        </button>
      </div>

      <ProjectList projects={projects} activeProjectId={activeProjectId} onOpen={onOpen} />

      <ProjectCreateModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate} />
    </div>
  );
}

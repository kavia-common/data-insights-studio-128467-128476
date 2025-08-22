import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

/**
 * PUBLIC_INTERFACE
 * ProjectContext provides in-memory project and workspace management with simple
 * localStorage persistence for preview/demo purposes. Not for production use.
 */
const ProjectContext = createContext(undefined);

/**
 * Restore projects from localStorage (preview only).
 */
function loadProjects() {
  try {
    const raw = window.localStorage.getItem("ds_projects");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors
  }
  // Seed with a couple of sample projects for a nicer first-run experience
  const seed = [
    { id: "p_marketing", name: "Marketing KPIs", archived: false, createdAt: Date.now() - 86400000 },
    { id: "p_sales_q", name: "Quarterly Sales", archived: false, createdAt: Date.now() - 43200000 },
    { id: "p_churn", name: "Customer Churn Analysis", archived: false, createdAt: Date.now() - 100000 },
  ];
  try {
    window.localStorage.setItem("ds_projects", JSON.stringify(seed));
  } catch { /* noop */ }
  return seed;
}

function saveProjects(projects) {
  try {
    window.localStorage.setItem("ds_projects", JSON.stringify(projects));
  } catch { /* noop */ }
}

function loadActiveProjectId() {
  try {
    return window.localStorage.getItem("ds_active_project_id") || "";
  } catch {
    return "";
  }
}

function saveActiveProjectId(id) {
  try {
    if (id) window.localStorage.setItem("ds_active_project_id", id);
    else window.localStorage.removeItem("ds_active_project_id");
  } catch { /* noop */ }
}

/**
 * PUBLIC_INTERFACE
 * Hook to access project state and actions.
 */
export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}

// PUBLIC_INTERFACE
export function ProjectProvider({ children }) {
  /**
   * PUBLIC_INTERFACE
   * Holds project list and active selection; provides CRUD-like actions:
   * createProject, archiveProject, setActiveProject, renameProject.
   */
  const [projects, setProjects] = useState(() => loadProjects());
  const [activeProjectId, setActiveProjectId] = useState(() => {
    const stored = loadActiveProjectId();
    // Ensure active id exists and is not archived
    const exists = projects.find(p => p.id === stored && !p.archived);
    return exists ? stored : (projects.find(p => !p.archived)?.id || "");
  });

  useEffect(() => saveProjects(projects), [projects]);
  useEffect(() => saveActiveProjectId(activeProjectId), [activeProjectId]);

  const createProject = useCallback((name) => {
    const id = "p_" + Math.random().toString(36).slice(2, 8);
    const proj = { id, name: name.trim() || "Untitled Project", archived: false, createdAt: Date.now() };
    setProjects(prev => [proj, ...prev]);
    setActiveProjectId(id);
    return proj;
  }, []);

  const archiveProject = useCallback((id) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, archived: true } : p));
    setActiveProjectId(prev => (prev === id ? "" : prev));
  }, []);

  const renameProject = useCallback((id, name) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, name: name.trim() || p.name } : p));
  }, []);

  const setActiveProject = useCallback((id) => {
    const target = projects.find(p => p.id === id && !p.archived);
    if (target) setActiveProjectId(target.id);
  }, [projects]);

  const visibleProjects = useMemo(() => projects.filter(p => !p.archived), [projects]);
  const activeProject = useMemo(
    () => visibleProjects.find(p => p.id === activeProjectId) || null,
    [visibleProjects, activeProjectId]
  );

  const value = useMemo(() => ({
    projects: visibleProjects,
    allProjects: projects,
    activeProject,
    activeProjectId,
    createProject,
    archiveProject,
    renameProject,
    setActiveProject,
  }), [visibleProjects, projects, activeProject, activeProjectId, createProject, archiveProject, renameProject, setActiveProject]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

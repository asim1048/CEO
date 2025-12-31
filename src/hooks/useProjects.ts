import { useState, useEffect } from 'react';
import { Project } from '../types';
import { storage } from '../utils/storage';
import { sampleProjects } from '../utils/sampleData';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = storage.getProjects();
    if (stored.length === 0) {
      storage.setProjects(sampleProjects);
      setProjects(sampleProjects);
    } else {
      setProjects(stored);
    }
  }, []);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    storage.setProjects(updated);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    setProjects(updated);
    storage.setProjects(updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    storage.setProjects(updated);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
};

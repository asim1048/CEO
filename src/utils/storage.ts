import { Project, Task, TeamMember } from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'pm_projects',
  TASKS: 'pm_tasks',
  TEAM_MEMBERS: 'pm_team_members',
};

export const storage = {
  getProjects: (): Project[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [];
  },
  
  setProjects: (projects: Project[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },
  
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },
  
  setTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },
  
  getTeamMembers: (): TeamMember[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS);
    return data ? JSON.parse(data) : [];
  },
  
  setTeamMembers: (members: TeamMember[]): void => {
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
  },
};

import { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { storage } from '../utils/storage';
import { sampleTeamMembers } from '../utils/sampleData';

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const stored = storage.getTeamMembers();
    if (stored.length === 0) {
      storage.setTeamMembers(sampleTeamMembers);
      setTeamMembers(sampleTeamMembers);
    } else {
      setTeamMembers(stored);
    }
  }, []);

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
    };
    const updated = [...teamMembers, newMember];
    setTeamMembers(updated);
    storage.setTeamMembers(updated);
    return newMember;
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    const updated = teamMembers.map((m) =>
      m.id === id ? { ...m, ...updates } : m
    );
    setTeamMembers(updated);
    storage.setTeamMembers(updated);
  };

  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    storage.setTeamMembers(updated);
  };

  return {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};

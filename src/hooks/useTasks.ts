import { useState, useEffect } from 'react';
import { Task } from '../types';
import { storage } from '../utils/storage';
import { sampleTasks } from '../utils/sampleData';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = storage.getTasks();
    if (stored.length === 0) {
      storage.setTasks(sampleTasks);
      setTasks(sampleTasks);
    } else {
      setTasks(stored);
    }
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    storage.setTasks(updated);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updated);
    storage.setTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    storage.setTasks(updated);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
};

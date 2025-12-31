import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProjectCard } from './components/ProjectCard';
import { TaskCard } from './components/TaskCard';
import { ProjectModal } from './components/ProjectModal';
import { TaskModal } from './components/TaskModal';
import { useProjects } from './hooks/useProjects';
import { useTasks } from './hooks/useTasks';
import { useTeamMembers } from './hooks/useTeamMembers';
import { Project, Task } from './types';

type TabType = 'dashboard' | 'projects' | 'tasks';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string>('all');

  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { teamMembers } = useTeamMembers();

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setEditingProject(undefined);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(undefined);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setEditingProject(undefined);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setEditingTask(undefined);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterProject !== 'all' && task.projectId !== filterProject) return false;
    return true;
  });

  return (
    <>
      <Header
        onAddProject={() => setShowProjectModal(true)}
        onAddTask={() => setShowTaskModal(true)}
      />

      <main style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects ({projects.length})
            </button>
            <button
              className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks ({tasks.length})
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <Dashboard projects={projects} tasks={tasks} />
          )}

          {activeTab === 'projects' && (
            <>
              {projects.length === 0 ? (
                <div className="empty-state">
                  <h3>No projects yet</h3>
                  <p>Create your first project to get started</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowProjectModal(true)}
                    style={{ marginTop: '1rem' }}
                  >
                    + New Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      tasks={tasks}
                      onEdit={handleEditProject}
                      onDelete={deleteProject}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'tasks' && (
            <>
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ marginRight: '0.5rem', fontSize: '0.875rem' }}>Status:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as Task['status'] | 'all')}
                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                  >
                    <option value="all">All</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div>
                  <label style={{ marginRight: '0.5rem', fontSize: '0.875rem' }}>Project:</label>
                  <select
                    value={filterProject}
                    onChange={(e) => setFilterProject(e.target.value)}
                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                  >
                    <option value="all">All Projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <h3>No tasks found</h3>
                  <p>
                    {tasks.length === 0
                      ? 'Create your first task to get started'
                      : 'Try adjusting your filters'}
                  </p>
                  {tasks.length === 0 && projects.length > 0 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowTaskModal(true)}
                      style={{ marginTop: '1rem' }}
                    >
                      + New Task
                    </button>
                  )}
                  {projects.length === 0 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowProjectModal(true)}
                      style={{ marginTop: '1rem' }}
                    >
                      Create a project first
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-3">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={projects.find((p) => p.id === task.projectId)}
                      onEdit={handleEditTask}
                      onDelete={deleteTask}
                      onStatusChange={(id, status) => updateTask(id, { status })}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showProjectModal && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={handleCloseProjectModal}
        />
      )}

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          projects={projects}
          teamMembers={teamMembers}
          onSave={handleSaveTask}
          onClose={handleCloseTaskModal}
        />
      )}
    </>
  );
}

export default App;

import { Project, Task } from '../types';

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({ project, tasks, onEdit, onDelete }: ProjectCardProps) => {
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const completedTasks = projectTasks.filter(t => t.status === 'done').length;
  const progress = projectTasks.length > 0 
    ? Math.round((completedTasks / projectTasks.length) * 100) 
    : 0;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div
          style={{
            width: '4px',
            height: '60px',
            backgroundColor: project.color,
            borderRadius: '2px',
            flexShrink: 0
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: 'var(--gray-900)'
          }}>
            {project.name}
          </h3>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-600)', 
            marginBottom: '1rem' 
          }}>
            {project.description}
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--gray-600)' }}>
                {completedTasks} of {projectTasks.length} tasks completed
              </span>
              <span style={{ fontWeight: '600', color: 'var(--gray-900)' }}>
                {progress}%
              </span>
            </div>
            <div style={{
              height: '8px',
              backgroundColor: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: project.color,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-sm btn-secondary" onClick={() => onEdit(project)}>
              Edit
            </button>
            <button 
              className="btn btn-sm btn-danger" 
              onClick={() => {
                if (confirm(`Delete project "${project.name}"? This will not delete associated tasks.`)) {
                  onDelete(project.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Task, Project } from '../types';

interface TaskCardProps {
  task: Task;
  project?: Project;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard = ({ task, project, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const getPriorityClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'badge-low';
      case 'medium': return 'badge-medium';
      case 'high': return 'badge-high';
      case 'urgent': return 'badge-urgent';
      default: return 'badge-low';
    }
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--gray-900)' }}>
            {task.title}
          </h3>
          <span className={`badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {project && (
            <span 
              className="badge" 
              style={{ 
                backgroundColor: project.color + '20', 
                color: project.color 
              }}
            >
              {project.name}
            </span>
          )}
          {task.assignee && (
            <span className="badge" style={{ backgroundColor: 'var(--gray-200)', color: 'var(--gray-700)' }}>
              👤 {task.assignee}
            </span>
          )}
          {task.dueDate && (
            <span className="badge" style={{ backgroundColor: 'var(--gray-200)', color: 'var(--gray-700)' }}>
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Status:</label>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
            style={{ fontSize: '0.875rem', padding: '0.375rem 0.5rem' }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-sm btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button 
          className="btn btn-sm btn-danger" 
          onClick={() => {
            if (confirm(`Delete task "${task.title}"?`)) {
              onDelete(task.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

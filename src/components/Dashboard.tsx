import { Project, Task } from '../types';

interface DashboardProps {
  projects: Project[];
  tasks: Task[];
}

export const Dashboard = ({ projects, tasks }: DashboardProps) => {
  const stats = {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    urgentTasks: tasks.filter(t => t.priority === 'urgent' && t.status !== 'done').length,
  };

  const upcomingTasks = tasks
    .filter(t => t.dueDate && t.status !== 'done')
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--gray-900)' }}>
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {stats.totalProjects}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', fontWeight: '500' }}>
            Total Projects
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--success)', marginBottom: '0.5rem' }}>
            {stats.completedTasks}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', fontWeight: '500' }}>
            Completed Tasks
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--warning)', marginBottom: '0.5rem' }}>
            {stats.inProgressTasks}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', fontWeight: '500' }}>
            In Progress
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--gray-900)' }}>
            Task Status Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'To Do', count: tasks.filter(t => t.status === 'todo').length, color: 'var(--gray-400)' },
              { label: 'In Progress', count: stats.inProgressTasks, color: 'var(--primary)' },
              { label: 'Review', count: tasks.filter(t => t.status === 'review').length, color: 'var(--warning)' },
              { label: 'Done', count: stats.completedTasks, color: 'var(--success)' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--gray-700)' }}>{item.label}</span>
                  <span style={{ fontWeight: '600', color: 'var(--gray-900)' }}>{item.count}</span>
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
                      width: `${stats.totalTasks > 0 ? (item.count / stats.totalTasks) * 100 : 0}%`,
                      backgroundColor: item.color,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--gray-900)' }}>
            Upcoming Deadlines
          </h3>
          {upcomingTasks.length === 0 ? (
            <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
              No upcoming deadlines
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcomingTasks.map((task) => {
                const project = projects.find(p => p.id === task.projectId);
                return (
                  <div
                    key={task.id}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: '0.375rem',
                      borderLeft: `3px solid ${project?.color || 'var(--gray-400)'}`
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

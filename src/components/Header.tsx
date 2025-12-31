interface HeaderProps {
  onAddProject: () => void;
  onAddTask: () => void;
}

export const Header = ({ onAddProject, onAddTask }: HeaderProps) => {
  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid var(--gray-200)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--primary)'
          }}>
            Project Management
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            marginTop: '0.25rem'
          }}>
            Manage your projects and tasks efficiently
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onAddProject}>
            + New Project
          </button>
          <button className="btn btn-primary" onClick={onAddTask}>
            + New Task
          </button>
        </div>
      </div>
    </header>
  );
};

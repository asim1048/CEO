# Project Management App

A modern, feature-rich project management application built with React and TypeScript.

## Features

- **Dashboard Overview**: View key metrics and statistics at a glance
- **Project Management**: Create, edit, and delete projects with custom colors
- **Task Management**: Organize tasks with status, priority, assignees, and due dates
- **Team Members**: Manage team members and assign them to tasks
- **Filtering**: Filter tasks by status and project
- **Data Persistence**: All data is stored in browser localStorage

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS (Custom styling)

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

Build the app for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Dashboard.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectModal.tsx
│   ├── TaskCard.tsx
│   └── TaskModal.tsx
├── hooks/           # Custom React hooks
│   ├── useProjects.ts
│   ├── useTasks.ts
│   └── useTeamMembers.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── utils/           # Utility functions
│   ├── storage.ts
│   └── sampleData.ts
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Features in Detail

### Projects
- Create projects with custom names, descriptions, and color themes
- View progress based on completed tasks
- Edit and delete projects

### Tasks
- Create detailed tasks with title, description, and metadata
- Assign tasks to team members
- Set priority levels (low, medium, high, urgent)
- Track status (todo, in-progress, review, done)
- Set due dates
- Quick status updates directly from task cards

### Dashboard
- Overview of total projects and tasks
- Task status distribution visualization
- Upcoming deadlines section
- Real-time statistics

## Data Storage

The app uses browser localStorage to persist data. Sample data is automatically loaded on first use.

## License

MIT

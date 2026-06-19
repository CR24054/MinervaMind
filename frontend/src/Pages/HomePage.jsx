import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Dashboard from './Dashboard';
import SleepPage from './SleepPage';
import TasksPage from './TasksPage';
import Calendar from './Calendar';
import MoodPage from '../Components/Mood';
import '../Styles/HomePage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'sleep': return <SleepPage />;
      case 'study': return <Calendar />;
      case 'tasks': return <TasksPage />;
      case 'mood': return <MoodPage />;
      default: return (
        <main className="main-wrapper">
          <div className="dashboard-header">
            <h1>Próximamente</h1>
          </div>
          <div className="wireframe-box box-full-page">
            <h2>Esta sección está en construcción.</h2>
            <p className="p-max">Las páginas que aún no tienen diseño se verán aquí.</p>
          </div>
        </main>
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}
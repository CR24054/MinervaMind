import Sidebar from '../Components/Sidebar';
import Dashboard from './Dashboard';
import '../Styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <Dashboard />
    </div>
  );
}

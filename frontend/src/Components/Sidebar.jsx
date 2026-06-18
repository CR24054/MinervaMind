import { useEffect, useRef, useState } from 'react';
import { Home, Moon, Smile, BookOpen, CheckSquare, User, Settings, GraduationCap } from 'lucide-react';
import '../Styles/Sidebar.css';

export default function Sidebar({ activeTab = 'dashboard', setActiveTab = () => {} }) {
  const menuRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translate3d(0, 0, 0)', width: '48px', height: '48px' });

  const handleTabClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const activeItem = menu.querySelector('.sidebar-item.active');
    if (!activeItem) return;

    const offsetTop = activeItem.offsetTop;
    const offsetLeft = activeItem.offsetLeft;
    const width = activeItem.offsetWidth;
    const height = activeItem.offsetHeight;

    setIndicatorStyle({
      transform: `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`,
      width: `${width}px`,
      height: `${height}px`,
    });
  }, [activeTab]);

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu" ref={menuRef}>
        <div className="bg-flota" style={indicatorStyle} aria-hidden="true" />
        <a href="#" className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} title="Inicio" onClick={(e) => handleTabClick(e, 'dashboard')}>
          <Home size={24} />
        </a>
        <a href="#" className={`sidebar-item ${activeTab === 'sleep' ? 'active' : ''}`} title="Registro de Sueño" onClick={(e) => handleTabClick(e, 'sleep')}>
          <Moon size={24} />
        </a>
        <a href="#" className={`sidebar-item ${activeTab === 'mood' ? 'active' : ''}`} title="Estado Anímico" onClick={(e) => handleTabClick(e, 'mood')}>
          <Smile size={24} />
        </a>
        <a href="#" className={`sidebar-item ${activeTab === 'study' ? 'active' : ''}`} title="Estudio y Clases" onClick={(e) => handleTabClick(e, 'study')}>
          <BookOpen size={24} />
        </a>
        <a href="#" className={`sidebar-item ${activeTab === 'tasks' ? 'active' : ''}`} title="Tareas" onClick={(e) => handleTabClick(e, 'tasks')}>
          <CheckSquare size={24} />
        </a>
        <a href="#" className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} title="Perfil" onClick={(e) => handleTabClick(e, 'profile')}>
          <User size={24} />
        </a>
        <a href="#" className="sidebar-item" title="Cerrar Sesión" onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem('token');
          window.location.href = '/login';
        }} style={{marginTop: 'auto', color: '#f87171'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </a>
      </nav>
    </aside>
  );
}

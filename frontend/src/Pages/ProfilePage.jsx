import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api/axiosConfig';
import { 
  User, Mail, Calendar as CalendarIcon, MapPin, 
  CheckCircle, BookOpen, Clock, Activity, Target
} from 'lucide-react';
import '../Styles/Profile.css';

export default function ProfilePage() {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  
  // Simulated stats for the read-only dashboard
  const [userStats] = useState({
    horasEnfoque: 24,
    nivel: 'Intermedio'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, tasksResponse] = await Promise.all([
          api.get(`/usuarios/${userId}`),
          api.get('/api/tasks')
        ]);
        
        // Combinamos la data del backend con la que guardamos en localStorage previamente (si existe)
        const localProfile = JSON.parse(localStorage.getItem(`profile_ext_${userId}`) || '{}');
        
        setUserData({
          ...userResponse.data,
          ...localProfile
        });

        // Tareas del backend
        setTasks(tasksResponse.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const formatTaskDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    const diff = (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24);
    if (diff > 0 && diff < 1) return 'Hoy';
    if (diff >= 1 && diff < 2) return 'Ayer';
    return formatDate(dateString);
  }

  if (loading) {
    return (
      <main className="main-wrapper" style={{ padding: 0 }}>
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#64748b' }}>Cargando perfil...</p>
        </div>
      </main>
    );
  }

  const tareasCompletadas = tasks.filter(t => t.completed).length;
  const tareasPendientes = tasks.filter(t => !t.completed).length;
  // Sorting tasks to get the most recent ones (by ID descending assuming higher ID is newer)
  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <main className="main-wrapper profile-page">
      <div className="profile-header-container">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-title-block">
            <h1>{userData?.nombreCompleto || userData?.usuario || 'Usuario'}</h1>
            <p>
              <CalendarIcon size={16} /> 
              Miembro desde {formatDate(userData?.fechaRegistro)}
            </p>
            <span className="status-badge">Nivel: {userStats.nivel}</span>
          </div>
        </div>
      </div>

      <div className="profile-main-content">
        
        {/* Estadísticas Globales */}
        <section>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-icon-wrapper blue">
                <CheckCircle size={26} />
              </div>
              <div className="stat-info">
                <span className="stat-val">{tareasCompletadas}</span>
                <span className="stat-lbl">Tareas Completadas</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper orange">
                <Target size={26} />
              </div>
              <div className="stat-info">
                <span className="stat-val">{tareasPendientes}</span>
                <span className="stat-lbl">Tareas Pendientes</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper purple">
                <Clock size={26} />
              </div>
              <div className="stat-info">
                <span className="stat-val">{userStats.horasEnfoque}h</span>
                <span className="stat-lbl">Tiempo de Enfoque</span>
              </div>
            </div>
          </div>
        </section>

        {/* Información Personal y Actividad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="info-card">
            <h3><User size={22} color="#3b82f6" /> Acerca de Mí</h3>
            <div className="info-grid">
              
              <div className="info-row">
                <span className="info-label"><User size={16}/> Usuario (Alias)</span>
                <span className="info-value">{userData?.usuario || <span className="empty-value">No definido</span>}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label"><Mail size={16}/> Correo Electrónico</span>
                <span className="info-value">{userData?.email || <span className="empty-value">No definido</span>}</span>
              </div>

              <div className="info-row full-width">
                <span className="info-label"><MapPin size={16}/> Ubicación</span>
                <span className="info-value">{userData?.ubicacion || <span className="empty-value">No especificada</span>}</span>
              </div>
              
              <div className="info-row full-width">
                <span className="info-label"><BookOpen size={16}/> Biografía</span>
                <div className="info-value" style={{ minHeight: '80px', whiteSpace: 'pre-wrap' }}>
                  {userData?.biografia || <span className="empty-value">Este usuario aún no ha escrito una biografía.</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3><Activity size={22} color="#8b5cf6" /> Actividad Reciente</h3>
            
            {recentTasks.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', margin: '40px 0' }}>No tienes actividad reciente. ¡Crea una tarea para empezar!</p>
            ) : (
              <div className="activity-list">
                {recentTasks.map(task => (
                  <div className="activity-item" key={task.id}>
                    <div className="activity-icon blue" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                      {task.completed ? <CheckCircle size={20}/> : <Target size={20}/>}
                    </div>
                    <div className="activity-content">
                      <h4>{task.title}</h4>
                      <p>{task.completed ? 'Tarea Completada' : 'Tarea Pendiente'}</p>
                    </div>
                    <span className="activity-time">{formatTaskDate(task.dueDate)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}

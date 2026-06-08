import '../Styles/MainContent.css';

export default function DashboardView() {
  return (
    <main className="main-wrapper">
      <div className="dashboard-header">
        <h1>Resumen de tu Día</h1>
        <p className="design-note">
          *Nota de diseño: El popup de "¿Cómo te sientes hoy?" (Estado Anímico) saltará en el centro de la pantalla al entrar aquí.
        </p>
      </div>
      
      <div className="dashboard-grid">
        <div className="wireframe-box box-small box-col-1">
          <h3>Sueño de anoche</h3>
          <p>Ej: 6.5 hrs registradas</p>
        </div>
        
        <div className="wireframe-box box-small box-col-2">
          <h3>Tareas para hoy</h3>
          <p>Ej: 3 pendientes urgentes</p>
        </div>

        <div className="wireframe-box box-small box-col-3">
          <h3>Clases / Estudio</h3>
          <p>Ej: 2 bloques programados</p>
        </div>

        <div className="wireframe-box box-pomodoro">
          <div className="pomodoro-timer-section">
            <h2>Temporizador Pomodoro</h2>
            <p>Herramienta principal para iniciar sesiones de enfoque</p>
            <div className="pomodoro-time">25:00</div>
            <button className="pomodoro-btn">
              Iniciar Concentración
            </button>
          </div>
          
          <div className="pomodoro-summary-section">
            <h3>Resumen de Sesiones Hoy</h3>
            <div className="pomodoro-stats-grid">
              <div className="pomodoro-stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Completadas</span>
              </div>
              <div className="pomodoro-stat-item">
                <span className="stat-number">2h</span>
                <span className="stat-label">Tiempo Enfocado</span>
              </div>
              <div className="pomodoro-stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Meta Diaria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import '../Styles/MainContent.css';

export default function MainContent() {
  return (
    <main className="main-wrapper">
      <div className="dashboard-header">
        <h1>Resumen de tu Día</h1>
      </div>
      
      <div className="dashboard-grid">
        <div className="wireframe-box box-sleep">
          <h3>Registro de Sueño</h3>
          <p>Gráfica de horas dormidas anoche</p>
        </div>
        
        <div className="wireframe-box box-mood">
          <h3>Estado Anímico</h3>
          <p>Selector de emociones del día</p>
        </div>

        <div className="wireframe-box box-stats">
          <h3>Racha de Estudio</h3>
          <p>Días seguidos cumpliendo metas</p>
        </div>

        <div className="wireframe-box box-schedule">
          <h3>Calendario de Estudio</h3>
          <p>Bloques de horarios para materias del ciclo</p>
        </div>

        <div className="wireframe-box box-pomodoro">
          <h3>Temporizador Pomodoro</h3>
          <p>Reloj para enfocarse y evitar burnout</p>
        </div>

        <div className="wireframe-box box-tasks">
          <h3>Gestor de Tareas (To-Do)</h3>
          <p>Lista de entregas y exámenes próximos</p>
        </div>
      </div>
    </main>
  );
}

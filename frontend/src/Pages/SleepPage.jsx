import '../Styles/MainContent.css';

export default function SleepTrackerView() {
  return (
    <main className="main-wrapper">
      <div className="dashboard-header">
        <h1>Análisis de Sueño y Bienestar</h1>
      </div>
      <div className="wireframe-box box-full-page border-purple">
        <h2>Historial y Gráficas de Hábitos</h2>
        <p className="p-max">
          En esta página exclusiva se mostrará el historial completo de tu sueño a lo largo del tiempo, 
          gráficas comparativas semanales, y cómo ha impactado tu descanso en tu rendimiento académico (luego lo implementaremos).
        </p>
      </div>
    </main>
  );
}

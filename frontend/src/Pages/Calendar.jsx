import '../Styles/MainContent.css';

export default function CalendarView() {
  return (
    <main className="main-wrapper">
      <div className="dashboard-header">
        <h1>Calendario</h1>
      </div>
      <div className="wireframe-box box-full-page border-blue">
        <h2>Vista de Calendario mensual</h2>
        <p className="p-max">
          Aquí se construirá la página dedicada al calendario. Se hara con una libreria llamada react-calendar, y estas sera como un planificador de materias y examenes para que puedan ver y tener un registro de sus horas de estudio
        </p>
      </div>
    </main>
  );
}

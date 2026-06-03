import '../Styles/MainContent.css';

export default function TasksView() {
  return (
    <main className="main-wrapper">
      <div className="dashboard-header">
        <h1>Gestor de Tareas y Entregas</h1>
      </div>
      <div className="wireframe-box box-full-page border-yellow">
        <h2>Lista de Tareas To-Do List </h2>
        <p className="p-max">
          Esta página completa estará dedicada a gestionar todas tus tareas, exámenes y proyectos. 
          Aquí se podran marcar como completadas, asignarles fechas de entrega y prioridades.
        </p>
      </div>
    </main>
  );
}

// Christopher: Componente TaskList
// Muestra la lista de tareas filtradas por categoría
// Cada tarea se muestra como una card con opciones de editar y eliminar

function TaskList({ tasks, onEdit, onDelete }) {
  // Christopher: Si no hay tareas, mostrar estado vacío
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h3>No hay tareas</h3>
        <p>Agrega una nueva tarea para comenzar</p>
      </div>
    );
  }

  // Christopher: Función para obtener el nombre legible de la categoría
  const getCategoryName = (category) => {
    const names = {
      study: 'Estudio',
      sleep: 'Sueño',
      wellness: 'Bienestar'
    };
    return names[category] || category;
  };

  // Christopher: Función para obtener el nombre legible de la prioridad
  const getPriorityName = (priority) => {
    const names = {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja'
    };
    return names[priority] || priority;
  };

  // Christopher: Función para obtener el nombre legible del estado
  const getStatusName = (status) => {
    const names = {
      pending: 'Pendiente',
      'in-progress': 'En progreso',
      completed: 'Completado'
    };
    return names[status] || status;
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-card-content">
            <div className="task-card-header">
              <h3 className="task-card-title">{task.title}</h3>
              <span className={`task-card-category category-${task.category}`}>
                {getCategoryName(task.category)}
              </span>
            </div>
            
            <p className="task-card-description">{task.description}</p>
            
            <div className="task-card-meta">
              <span className={`priority-badge priority-${task.priority}`}>
                Prioridad: {getPriorityName(task.priority)}
              </span>
              <span className={`status-badge status-${task.status}`}>
                {getStatusName(task.status)}
              </span>
              {task.date && (
                <span>📅 {task.date}</span>
              )}
            </div>
          </div>
          
          <div className="task-card-actions">
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(task)}
            >
              ✏️ Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task.id)}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

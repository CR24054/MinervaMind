// Christopher: Componente TaskForm
// Formulario para crear o editar tareas/hábitos
// Se usa tanto para POST (crear) como para PUT (editar)

import { useState, useEffect } from 'react';

function TaskForm({ task, onSubmit, onCancel, title }) {
  // Christopher: Estado del formulario con valores iniciales
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'study',
    priority: 'medium',
    date: '',
    status: 'pending'
  });

  // Christopher: Si estamos editando, cargar los datos de la tarea
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'study',
        priority: task.priority || 'medium',
        date: task.date || '',
        status: task.status || 'pending'
      });
    }
  }, [task]);

  // Christopher: Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Christopher: Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Christopher: Validación básica
    if (!formData.title.trim()) {
      alert('El título es obligatorio');
      return;
    }
    
    // Christopher: Si estamos editando, incluir el ID
    const submitData = task 
      ? { ...formData, id: task.id }
      : formData;
    
    onSubmit(submitData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Christopher: Campo para el nombre/título */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Nombre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Estudiar programación"
              required
            />
          </div>

          {/* Christopher: Campo para la categoría */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Categoría *
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="study">Tarea de estudio</option>
              <option value="sleep">Hábito de sueño</option>
              <option value="wellness">Hábito de bienestar</option>
            </select>
          </div>

          {/* Christopher: Campo para la prioridad */}
          <div className="form-group">
            <label className="form-label" htmlFor="priority">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          {/* Christopher: Campo para la fecha */}
          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* Christopher: Campo para la descripción */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Escribe detalles importantes..."
              rows="4"
            ></textarea>
          </div>

          {/* Christopher: Si estamos editando, mostrar campo de estado */}
          {task && (
            <div className="form-group">
              <label className="form-label" htmlFor="status">
                Estado
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          )}

          {/* Christopher: Botones de acción */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {task ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

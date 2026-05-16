// Christopher: Componente principal de MinervaMind
// Aquí manejo el estado global y las operaciones CRUD con mock data

import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategoryCards from './components/CategoryCards';
import './App.css';

// Christopher: Datos mock iniciales - estructura vacía para que Oscar agregue los datos reales
const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Estudiar Java',
    description: 'Repasar clases, objetos y métodos para la práctica de programación.',
    category: 'study',
    priority: 'high',
    status: 'pending',
    date: '2026-05-15'
  },
  {
    id: 2,
    title: 'Dormir 8 horas',
    description: 'Registrar el cumplimiento del descanso diario para mejorar el bienestar.',
    category: 'sleep',
    priority: 'high',
    status: 'pending',
    date: '2026-05-15'
  },
  {
    id: 3,
    title: 'Tomar agua',
    description: 'Meta diaria: 8 vasos de agua.',
    category: 'wellness',
    priority: 'medium',
    status: 'in-progress',
    date: '2026-05-15'
  }
];

function App() {
  // Christopher: Estados principales de la aplicación
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);

  // Christopher: Filtrar tareas por categoría seleccionada
  const filteredTasks = tasks.filter(task => {
    if (currentCategory === 'all') return true;
    return task.category === currentCategory;
  });

  // Christopher: Contar tareas por categoría para mostrar en las cards
  const categoryCounts = {
    study: tasks.filter(t => t.category === 'study').length,
    sleep: tasks.filter(t => t.category === 'sleep').length,
    wellness: tasks.filter(t => t.category === 'wellness').length,
    all: tasks.length
  };

  // Christopher: Función para mostrar mensajes tipo toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Christopher: CRUD - CREATE: Agregar nueva tarea
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(), // Christopher: ID único basado en timestamp
      status: 'pending'
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setShowForm(false);
    showToast('¡Tarea creada exitosamente!');
  };

  // Christopher: CRUD - UPDATE: Editar tarea existente
  const handleEditTask = (taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskData.id ? { ...taskData } : task
      )
    );
    setEditingTask(null);
    showToast('¡Tarea actualizada!');
  };

  // Christopher: CRUD - DELETE: Eliminar tarea
  const handleDeleteTask = (taskId) => {
    // Christopher: Aquí Oscar agregará el modal de confirmación
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    showToast('Tarea eliminada', 'error');
  };

  // Christopher: Abrir modal de edición con los datos de la tarea
  const openEditModal = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="app-container">
      {/* Christopher: Header con título y descripción */}
      <Header />

      {/* Christopher: Cards de categorías para navegación rápida */}
      <CategoryCards
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
        counts={categoryCounts}
      />

      {/* Christopher: Botón para agregar nueva tarea */}
      <div className="tasks-section">
        <div className="section-header">
          <h2 className="section-title">
            {currentCategory === 'all' ? 'Todas las tareas' : 
             currentCategory === 'study' ? 'Tareas de estudio' :
             currentCategory === 'sleep' ? 'Hábitos de sueño' :
             'Hábitos de bienestar'}
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Agregar nueva
          </button>
        </div>

        {/* Christopher: Lista de tareas filtradas */}
        <TaskList
          tasks={filteredTasks}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Christopher: Modal para crear nueva tarea */}
      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
          title="Agregar nueva tarea o hábito"
        />
      )}

      {/* Christopher: Modal para editar tarea existente */}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleEditTask}
          onCancel={() => setEditingTask(null)}
          title="Editar tarea o hábito"
        />
      )}

      {/* Christopher: Toast para feedback visual */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Christopher: Footer */}
      <footer className="footer">
        <p>© 2026 MinervaMind - Organización académica y bienestar universitario</p>
      </footer>
    </div>
  );
}

export default App;

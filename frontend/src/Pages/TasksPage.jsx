import { useEffect, useState, useCallback, useContext } from "react";
import "../Styles/MainContent.css";
import logo from "../assets/images.png";

import api from "../api/axiosConfig";
import { AuthContext } from "../AuthContext";


const PRIORITY_CONFIG = {
  ALTA:  { label: "Alta",  class: "priority-alta",  icon: "🔴" },
  MEDIA: { label: "Media", class: "priority-media", icon: "🟡" },
  BAJA:  { label: "Baja",  class: "priority-baja",  icon: "🟢" },
};

const EMPTY_FORM = {
  title: "",
  description: "",
  dueDate: "",
  priority: "MEDIA",
  completed: false,
};

const isNearDue = (dueDate) => {
  if (!dueDate) return false;
  const diff = (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 2;
};

const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date();
};

export default function TasksView() {
  const { userId } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const loadTasks = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/api/tasks/user/${userId}`);
      setTasks(res.data);
    } catch {
      showToast("Error al cargar las tareas", "error");
    }
  }, [userId]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

  const cleanForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/tasks/${editingId}`, { ...form, userId });
      } else {
        await api.post('/api/tasks', { ...form, userId });
      }
      showToast(editingId ? "Tarea actualizada ✓" : "Tarea creada ✓");
      cleanForm();
      loadTasks();
    } catch {
      showToast("Error al guardar la tarea", "error");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => setDeletingId(id);

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/tasks/${deletingId}`);
      showToast("Tarea eliminada");
      setDeletingId(null);
      loadTasks();
    } catch {
      showToast("Error al eliminar", "error");
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      await api.put(`/api/tasks/${task.id}`, { ...task, completed: !task.completed });
      showToast(task.completed ? "Marcada como pendiente" : "¡Tarea completada! 🎉");
      loadTasks();
    } catch {
      showToast("Error al actualizar", "error");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "PENDING") return !task.completed;
    if (filter === "COMPLETED") return task.completed;
    return true;
  });

  return (
    <main className="main-wrapper tasks-page">

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Modal confirmación */}
      {deletingId && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon">🗑️</div>
            <h3>¿Eliminar tarea?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="tasks-btn-cancel" onClick={() => setDeletingId(null)}>
                Cancelar
              </button>
              <button className="tasks-btn-danger" onClick={confirmDelete}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topbar */}
      <section className="tasks-topbar">
        <div>
          <h1>Gestor de Tareas</h1>
          <p>Organiza tus pendientes de estudio sin sentirte abrumada.</p>
        </div>
        <div className="topbar-right">
          <div className="topbar-stats">
            <div className="topbar-stat">
              <span className="topbar-stat-number">{totalTasks}</span>
              <span className="topbar-stat-label">Total</span>
            </div>
            <div className="topbar-stat-divider" />
            <div className="topbar-stat">
              <span className="topbar-stat-number text-purple">{pendingCount}</span>
              <span className="topbar-stat-label">Pendientes</span>
            </div>
            <div className="topbar-stat-divider" />
            <div className="topbar-stat">
              <span className="topbar-stat-number text-green">{completedCount}</span>
              <span className="topbar-stat-label">Completadas</span>
            </div>
          </div>
          <div className="tasks-avatar">
            <img src={logo} alt="MinervaMind" />
          </div>
        </div>
      </section>

      {/* Progreso */}
      <section className="tasks-progress-card">
        <div>
          <h2>Progreso de hoy</h2>
          <p>{completedCount} de {totalTasks} tareas completadas</p>
        </div>
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>
      </section>

      {/* Layout */}
      <div className="tasks-layout">

        {/* Formulario */}
        <section className="tasks-card tasks-form-card">
          <h2>{editingId ? "✏️ Editar tarea" : " Nueva tarea"}</h2>
          <p className="section-subtitle">
            Agrega una actividad, fecha y prioridad para mantener tu día ordenado.
          </p>

          <form className="tasks-form" onSubmit={handleSubmit}>
            <label>
              Título
              <input
                type="text"
                name="title"
                placeholder="Ej. Estudiar base de datos"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Descripción
              <input
                type="text"
                name="description"
                placeholder="Ej. Repasar consultas SQL"
                value={form.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Fecha de entrega
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Prioridad
              <select name="priority" value={form.priority} onChange={handleChange}>
                {Object.entries(PRIORITY_CONFIG).map(([val, { label, icon }]) => (
                  <option key={val} value={val}>{icon} {label}</option>
                ))}
              </select>
            </label>

            <div className="form-actions">
              <button className="tasks-btn-primary" type="submit">
                {editingId ? "Actualizar tarea" : "Guardar tarea"}
              </button>
              {editingId && (
                <button className="tasks-btn-cancel" type="button" onClick={cleanForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Lista */}
        <section className="tasks-card tasks-list-card">
          <div className="tasks-list-header">
            <div>
              <h2>Mis tareas</h2>
              <p className="section-subtitle">Pendientes, entregas y actividades importantes.</p>
            </div>
          </div>

          <div className="task-filters">
            {[
              { key: "ALL",       label: "Todas",       count: totalTasks },
              { key: "PENDING",   label: "Pendientes",  count: pendingCount },
              { key: "COMPLETED", label: "Completadas", count: completedCount },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                className={filter === key ? "active-filter" : ""}
                onClick={() => setFilter(key)}
              >
                {label}
                <span className={`filter-count ${filter === key ? "filter-count-active" : ""}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✨</div>
              <h3>¡Todo limpio por aquí!</h3>
              <p>Aún no tienes tareas. Empieza agregando una para organizar tu día.</p>
              <div className="empty-hint">← Usa el formulario de la izquierda</div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>
                {filter === "COMPLETED"
                  ? "Aún no hay completadas"
                  : "¡Todo al día!"}
              </h3>
              <p>
                {filter === "COMPLETED"
                  ? "Completa una tarea para verla aquí."
                  : "No hay tareas pendientes en este filtro."}
              </p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => {
                const priorityCfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.MEDIA;
                const nearDue = isNearDue(task.dueDate);
                const overdue = isOverdue(task.dueDate, task.completed);

                return (
                  <article
                    key={task.id}
                    className={`task-item ${priorityCfg.class} ${task.completed ? "task-completed" : ""} ${overdue ? "task-overdue" : nearDue ? "task-neardue" : ""}`}
                  >
                    {overdue && (
                      <div className="task-alert-banner banner-overdue">
                        ⚠️ Tarea vencida
                      </div>
                    )}
                    {!overdue && nearDue && (
                      <div className="task-alert-banner banner-neardue">
                        ⏰ Vence en menos de 2 días
                      </div>
                    )}

                    <div className="task-item-top">
                      <div className="task-info">
                        <h3>{task.title}</h3>
                        <p>{task.description || "Sin descripción"}</p>
                      </div>
                      <span className={`priority-chip chip-${task.priority.toLowerCase()}`}>
                        {priorityCfg.label}
                      </span>
                    </div>

                    <div className="task-item-bottom">
                      <div className="task-date-row">
                        <small className={overdue ? "date-overdue" : nearDue ? "date-near" : ""}>
                          {overdue ? "⚠️ Vencida: " : nearDue ? "⏰ Vence pronto: " : "📅 "}
                          {task.dueDate || "Sin fecha"}
                        </small>
                      </div>
                      <span className={`status-badge ${task.completed ? "status-done" : "status-pending"}`}>
                        {task.completed ? "✓ Completada" : "· Pendiente"}
                      </span>
                    </div>

                    <div className="task-actions">
                      <button className="tasks-btn-secondary" onClick={() => handleToggleCompleted(task)}>
                        {task.completed ? "↩ Reabrir" : "✓ Completar"}
                      </button>
                      <button className="tasks-btn-secondary" onClick={() => handleEdit(task)}>
                        ✏️ Editar
                      </button>
                      <button className="tasks-btn-danger" onClick={() => handleDelete(task.id)}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
import { useEffect, useState, useCallback, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/MainContent.css";
import "../Styles/Calendar.css";
import { AuthContext } from "../AuthContext";
import api from "../api/axiosConfig";

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  time: "",
  eventType: "EVENTO",
};

export default function CalendarView() {
  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingType, setDeletingType] = useState(null);
  const [toast, setToast] = useState(null);
  const [taskForm, setTaskForm] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const formatLocal = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const loadItems = useCallback(async () => {
    if (!userId) return;
    try {
      const [tasksRes, eventsRes] = await Promise.all([
        api.get(`/api/tasks/user/${userId}`),
        api.get(`/api/calendar-events/user/${userId}`),
      ]);
      setTasks(tasksRes.data);
      setEvents(eventsRes.data);
    } catch {
      showToast("Error al cargar datos", "error");
    }
  }, [userId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const loadSelectedDay = useCallback(async () => {
    if (!userId) return;
    const dateStr = formatLocal(date);
    try {
      const [tasksRes, eventsRes] = await Promise.all([
        api.get(`/api/tasks/user/${userId}/date/${dateStr}`),
        api.get(`/api/calendar-events/user/${userId}/date/${dateStr}`),
      ]);
      setSelectedTasks(tasksRes.data);
      setSelectedEvents(eventsRes.data);
    } catch {
      showToast("Error al cargar datos del día", "error");
    }
  }, [userId, date]);

  useEffect(() => {
    loadSelectedDay();
  }, [loadSelectedDay]);

  const hasItems = (dateStr) => {
    const hasTask = tasks.some((t) => t.dueDate === dateStr);
    const hasEvent = events.some((e) => e.date === dateStr);
    return { hasTask, hasEvent };
  };

  const tileContent = ({ date: tileDate, view }) => {
    if (view !== "month") return null;
    const dateStr = formatLocal(tileDate);
    const { hasTask, hasEvent } = hasItems(dateStr);
    if (!hasTask && !hasEvent) return null;

    return (
      <div className="calendar-day-dot">
        {hasTask && <span className="calendar-dot calendar-dot-task" />}
        {hasEvent && <span className="calendar-dot calendar-dot-event" />}
      </div>
    );
  };

  const tileClassName = ({ date: tileDate, view }) => {
    if (view !== "month") return null;
    const dateStr = formatLocal(tileDate);
    const { hasTask, hasEvent } = hasItems(dateStr);
    if (hasTask || hasEvent) return "react-calendar__tile--hasItems";
    return null;
  };

  const openAddModal = (isTask = false) => {
    setTaskForm(isTask);
    setEditingItem(null);
    setForm({ ...EMPTY_FORM, date: formatLocal(date) });
    setShowModal(true);
  };

  const openEditModal = (item, isTask) => {
    setTaskForm(isTask);
    setEditingItem(item);
    if (isTask) {
      setForm({
        title: item.title,
        description: item.description || "",
        date: item.dueDate,
        time: "",
        eventType: "EVENTO",
      });
    } else {
      setForm({
        title: item.title,
        description: item.description || "",
        date: item.date,
        time: item.time || "",
        eventType: item.eventType || "EVENTO",
      });
    }
    setShowModal(true);
  };

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskForm) {
        const payload = {
          title: form.title,
          description: form.description,
          dueDate: form.date,
          priority: "MEDIA",
          completed: false,
          userId,
        };
        if (editingItem) {
          await api.put(`/api/tasks/${editingItem.id}`, payload);
        } else {
          await api.post("/api/tasks", payload);
        }
      } else {
        const payload = {
          title: form.title,
          description: form.description,
          date: form.date,
          time: form.time || null,
          eventType: form.eventType,
          userId,
        };
        if (editingItem) {
          await api.put(`/api/calendar-events/${editingItem.id}`, payload);
        } else {
          await api.post("/api/calendar-events", payload);
        }
      }

      showToast(editingItem ? "Elemento actualizado ✓" : "Elemento creado ✓");
      setShowModal(false);
      loadItems();
      loadSelectedDay();
    } catch {
      showToast("Error al guardar", "error");
    }
  };

  const promptDelete = (id, type) => {
    setDeletingId(id);
    setDeletingType(type);
  };

  const confirmDelete = async () => {
    try {
      if (deletingType === "task") {
        await api.delete(`/api/tasks/${deletingId}`);
      } else {
        await api.delete(`/api/calendar-events/${deletingId}`);
      }
      showToast("Elemento eliminado");
      setDeletingId(null);
      setDeletingType(null);
      loadItems();
      loadSelectedDay();
    } catch {
      showToast("Error al eliminar", "error");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await api.put(`/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      showToast(task.completed ? "Marcada como pendiente" : "¡Tarea completada! 🎉");
      loadItems();
      loadSelectedDay();
    } catch {
      showToast("Error al actualizar", "error");
    }
  };

  const formatDateDisplay = (d) => {
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (t) => {
    if (!t) return null;
    const [h, m] = t.split(":");
    return `${h}:${m}`;
  };

  return (
    <main className="main-wrapper calendar-page">
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="calendar-confirm-overlay">
          <div className="calendar-confirm-card">
            <div className="calendar-confirm-icon">🗑️</div>
            <h3>¿Eliminar elemento?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="calendar-confirm-actions">
              <button className="calendar-modal-btn calendar-modal-btn-cancel" onClick={() => setDeletingId(null)}>
                Cancelar
              </button>
              <button className="calendar-modal-btn calendar-modal-btn-danger" onClick={confirmDelete}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showModal && (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal">
            <h3>{editingItem ? "✏️ Editar elemento" : taskForm ? "➕ Nueva tarea" : "➕ Nuevo evento"}</h3>
            <form className="calendar-modal-form" onSubmit={handleSubmit}>
              {!editingItem && (
                <label>
                  Tipo
                  <select
                    name="eventType"
                    value={taskForm ? "TASK" : form.eventType}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "TASK") {
                        setTaskForm(true);
                      } else {
                        setTaskForm(false);
                        setForm((prev) => ({ ...prev, eventType: val }));
                      }
                    }}
                  >
                    <option value="EVENTO">Evento</option>
                    <option value="TASK">Tarea</option>
                  </select>
                </label>
              )}

              <label>
                Título
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ej. Examen de programación"
                  required
                />
              </label>

              <label>
                Descripción
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Descripción opcional"
                  rows={2}
                />
              </label>

              <label>
                Fecha
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </label>

              {!taskForm && (
                <label>
                  Hora
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />
                </label>
              )}

              <div className="calendar-modal-actions">
                <button type="submit" className="calendar-modal-btn calendar-modal-btn-primary">
                  {editingItem ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" className="calendar-modal-btn calendar-modal-btn-cancel" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Topbar */}
      <section className="tasks-topbar">
        <div>
          <h1>Calendario</h1>
          <p>Visualiza tus tareas y eventos organizados por día.</p>
        </div>
        <div className="topbar-right">
          <div className="topbar-stats">
            <div className="topbar-stat">
              <span className="topbar-stat-number">{tasks.length + events.length}</span>
              <span className="topbar-stat-label">Total</span>
            </div>
            <div className="topbar-stat-divider" />
            <div className="topbar-stat">
              <span className="topbar-stat-number text-purple">{tasks.filter((t) => !t.completed).length}</span>
              <span className="topbar-stat-label">Pendientes</span>
            </div>
            <div className="topbar-stat-divider" />
            <div className="topbar-stat">
              <span className="topbar-stat-number text-green">{tasks.filter((t) => t.completed).length}</span>
              <span className="topbar-stat-label">Completadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Layout */}
      <div className="calendar-layout">
        {/* Calendar */}
        <section className="calendar-card">
          <Calendar
            onChange={setDate}
            value={date}
            locale="es-ES"
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        </section>

        {/* Selected day panel */}
        <section className="calendar-card calendar-sidebar">
          <div className="calendar-day-header">
            <div>
              <h3>{formatDateDisplay(date)}</h3>
              <span className="calendar-day-date">
                {selectedTasks.length + selectedEvents.length} elemento(s)
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="calendar-add-btn" onClick={() => openAddModal(true)}>
                + Tarea
              </button>
              <button className="calendar-add-btn" onClick={() => openAddModal(false)}>
                + Evento
              </button>
            </div>
          </div>

          <div className="calendar-items-list">
            {selectedTasks.length === 0 && selectedEvents.length === 0 ? (
              <div className="calendar-empty">
                <div className="calendar-empty-icon">📅</div>
                <h4>Sin actividades</h4>
                <p>No hay tareas ni eventos para esta fecha.</p>
              </div>
            ) : (
              <>
                {selectedTasks.map((task) => (
                  <div key={`task-${task.id}`} className={`calendar-item calendar-item-task ${task.completed ? "task-completed" : ""}`}>
                    <div className="calendar-item-header">
                      <h4 className="calendar-item-title">{task.title}</h4>
                      <span className="calendar-item-type calendar-item-type-task">
                        Tarea
                      </span>
                    </div>
                    {task.description && (
                      <p className="calendar-item-desc">{task.description}</p>
                    )}
                    <div className="calendar-item-actions">
                      {!task.completed && (
                        <button className="calendar-item-btn calendar-item-btn-complete" onClick={() => handleToggleComplete(task)}>
                          ✓ Completar
                        </button>
                      )}
                      <button className="calendar-item-btn calendar-item-btn-edit" onClick={() => openEditModal(task, true)}>
                        ✏️ Editar
                      </button>
                      <button className="calendar-item-btn calendar-item-btn-delete" onClick={() => promptDelete(task.id, "task")}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                {selectedEvents.map((event) => (
                  <div key={`event-${event.id}`} className="calendar-item calendar-item-event">
                    <div className="calendar-item-header">
                      <h4 className="calendar-item-title">{event.title}</h4>
                      <span className="calendar-item-type calendar-item-type-event">
                        {event.eventType || "Evento"}
                      </span>
                    </div>
                    {event.description && (
                      <p className="calendar-item-desc">{event.description}</p>
                    )}
                    {event.time && (
                      <p className="calendar-item-time">🕐 {formatTime(event.time)}</p>
                    )}
                    <div className="calendar-item-actions">
                      <button className="calendar-item-btn calendar-item-btn-edit" onClick={() => openEditModal(event, false)}>
                        ✏️ Editar
                      </button>
                      <button className="calendar-item-btn calendar-item-btn-delete" onClick={() => promptDelete(event.id, "event")}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

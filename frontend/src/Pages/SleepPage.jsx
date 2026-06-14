import { useEffect, useState } from "react";
import { Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import SleepForm from "../Components/SleepForm";
import { SLEEP_QUALITY_OPTIONS } from "../Components/sleepOptions";
import {
  getSleepSummary,
  getSleepRecommendation,
  getSleepByUser,
  deleteSleep,
} from "../api/sleepApi";
import "../Styles/Sleep.css";

// TODO: reemplazar cuando exista login real
const CURRENT_USER_ID = 146;

export default function SleepTrackerView() {
  const [showForm, setShowForm] = useState(false);
  const [editingSleep, setEditingSleep] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);
  const [hasRecords, setHasRecords] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const summaryData = await getSleepSummary(CURRENT_USER_ID);
      setSummary(summaryData);

      const historyData = await getSleepByUser(CURRENT_USER_ID);
      const sorted = [...historyData].sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(sorted);

      if (summaryData.totalRecords === 0) {
        setHasRecords(false);
        setRecommendation(null);
      } else {
        setHasRecords(true);
        const recommendationData = await getSleepRecommendation(CURRENT_USER_ID);
        setRecommendation(recommendationData);
      }
    } catch (err) {
      setError(err.message || "No se pudo cargar tu información de sueño.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleFormClose() {
    setShowForm(false);
    setEditingSleep(null);
    loadData();
  }

  function handleEdit(record) {
    setEditingSleep(record);
    setShowForm(true);
  }

  function handleDeleteClick(id) {
    setConfirmDeleteId(id);
  }

  async function confirmDelete() {
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setDeletingId(id);
    try {
      await deleteSleep(id);
      await loadData();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el registro.");
    } finally {
      setDeletingId(null);
    }
  }

  const recommendedQuality = recommendation
    ? SLEEP_QUALITY_OPTIONS.find((q) => q.value === recommendation.sleepQuality)
    : null;

  return (
      <main className="sleep-page-wrapper">
      <div className="sleep-shape sleep-shape--1" aria-hidden="true" />
      <div className="sleep-shape sleep-shape--2" aria-hidden="true" />
      <div className="sleep-shape sleep-shape--3" aria-hidden="true" />
      <div className="sleep-shape sleep-shape--4" aria-hidden="true" />

      <div className="sleep-page-content">
        <div className="sleep-page-header">
          <div>
            <p className="sleep-page-eyebrow">Registro de sueño</p>
            <h1 className="sleep-page-title">Tu descanso</h1>
          </div>
          <button className="sleep-page-add-btn" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Registrar sueño
          </button>
        </div>

        {loading && (
          <div className="sleep-page-loading">
            <Loader2 size={24} className="sleep-spin" />
            <span>Cargando tu información...</span>
          </div>
        )}

        {!loading && error && (
          <div className="sleep-page-error">
            <p>{error}</p>
            <button onClick={loadData} className="sleep-page-retry-btn">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && !hasRecords && (
          <div className="sleep-page-empty">
            <p>Aún no tienes registros de sueño.</p>
            <p className="sleep-page-empty-sub">
              Registra tus horarios para ver tu resumen y recomendaciones personalizadas.
            </p>
          </div>
        )}

        {!loading && !error && hasRecords && summary && (
          <section className="sleep-summary-grid">
            <div className="sleep-summary-card">
              <p className="sleep-summary-label">Horas de sueño promedio</p>
              <p className="sleep-summary-value">{summary.averageHoursSlept.toFixed(1)}</p>
              <p className="sleep-summary-scale">horas</p>
            </div>

            <div className="sleep-summary-card">
              <p className="sleep-summary-label">Registros totales</p>
              <p className="sleep-summary-value">{summary.totalRecords}</p>
              <p className="sleep-summary-scale">
                {summary.totalRecords === 1 ? "entrada" : "entradas"}
              </p>
            </div>
          </section>
        )}

        {!loading && !error && hasRecords && recommendation && recommendedQuality && (
          <section
            className="sleep-recommendation-card"
            style={{ "--quality-color": recommendedQuality.color }}
          >
            <div className="sleep-recommendation-icon">
              <recommendedQuality.icon size={28} strokeWidth={1.75} />
            </div>
            <div className="sleep-recommendation-text">
              <p className="sleep-recommendation-eyebrow">
                Según tu último registro: {recommendedQuality.label}
              </p>
              <p className="sleep-recommendation-message">{recommendation.recommendation}</p>
            </div>
          </section>
        )}

        {!loading && !error && history.length > 1 && (
          <section className="sleep-chart">
            <h2 className="sleep-chart-title">Tendencia</h2>
            <div className="sleep-chart-container">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={[...history]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((r) => ({
                      date: new Date(r.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      }),
                      Horas: r.hoursSlept,
                    }))}
                  margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE4DA" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6F6A78" }} />
                  <YAxis domain={[0, 12]} tick={{ fontSize: 12, fill: "#6F6A78" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Horas" stroke="#6E8DB5" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {!loading && !error && history.length > 0 && (
          <section className="sleep-history">
            <h2 className="sleep-history-title">Historial</h2>
            <div className="sleep-history-list">
              {history.map((record) => {
                const qualityInfo = SLEEP_QUALITY_OPTIONS.find((q) => q.value === record.sleepQuality);
                return (
                  <div
                    className="sleep-history-item"
                    key={record.id}
                    style={{ "--quality-color": qualityInfo?.color ?? "#6E8DB5" }}
                  >
                    <div className="sleep-history-icon">
                      {qualityInfo && <qualityInfo.icon size={20} strokeWidth={1.75} />}
                    </div>

                    <div className="sleep-history-info">
                      <div className="sleep-history-top">
                        <span className="sleep-history-label">{qualityInfo?.label ?? record.sleepQuality}</span>
                        <span className="sleep-history-date">
                          {new Date(record.date).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="sleep-history-stats">
                        <span>{record.bedTime?.slice(0, 5)} - {record.wakeTime?.slice(0, 5)}</span>
                        <span>{record.hoursSlept?.toFixed(1)} hrs</span>
                      </div>
                      {record.note && <p className="sleep-history-note">{record.note}</p>}
                    </div>

                    <div className="sleep-history-actions">
                      <button
                        type="button"
                        className="sleep-history-action-btn"
                        onClick={() => handleEdit(record)}
                        aria-label="Editar registro"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="sleep-history-action-btn sleep-history-action-btn--danger"
                        onClick={() => handleDeleteClick(record.id)}
                        disabled={deletingId === record.id}
                        aria-label="Eliminar registro"
                      >
                        {deletingId === record.id ? (
                          <Loader2 size={16} className="sleep-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {showForm && <SleepForm onClose={handleFormClose} editingSleep={editingSleep} />}
      </div>

      {confirmDeleteId !== null && (
        <div className="sleep-confirm-overlay">
          <div className="sleep-confirm-card">
            <h2 className="sleep-confirm-title">Eliminar registro</h2>
            <p className="sleep-confirm-text">
              Esta acción no se puede deshacer. ¿Seguro que quieres eliminar este registro de tu historial?
            </p>
            <div className="sleep-confirm-actions">
              <button
                type="button"
                className="sleep-confirm-btn sleep-confirm-btn--cancel"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="sleep-confirm-btn sleep-confirm-btn--danger"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
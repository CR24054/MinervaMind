import { useEffect, useState } from "react";
import { Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import MoodForm from "./MoodForm";
import { MOOD_OPTIONS } from "./moodOptions";
import { getMoodSummary, getMoodRecommendation, getMoodByUser, deleteMood } from "../api/moodApi";
import "../Styles/Mood.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Sun, Cloud, Moon, Droplet } from "lucide-react";

import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function MoodPage() {
  const { userId } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [editingMood, setEditingMood] = useState(null);
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
      const summaryData = await getMoodSummary(userId);
      setSummary(summaryData);

      const historyData = await getMoodByUser(userId);
      const sorted = [...historyData].sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(sorted);

      if (summaryData.totalRecords === 0) {
        setHasRecords(false);
        setRecommendation(null);
      } else {
        setHasRecords(true);
        const recommendationData = await getMoodRecommendation(userId);
        setRecommendation(recommendationData);
      }
    } catch (err) {
      setError(err.message || "No se pudo cargar tu información emocional.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleFormClose() {
    setShowForm(false);
    setEditingMood(null);
    loadData();
  }

  function handleEdit(mood) {
    setEditingMood(mood);
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
      await deleteMood(id);
      await loadData();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el registro.");
    } finally {
      setDeletingId(null);
    }
  }

  const recommendedMood = recommendation
    ? MOOD_OPTIONS.find((m) => m.value === recommendation.mood)
    : null;

  return (
    <main className="mood-page-wrapper">
      <Sun className="mood-bg-icon mood-bg-icon--1" aria-hidden="true" />
      <Cloud className="mood-bg-icon mood-bg-icon--2" aria-hidden="true" />
      <Moon className="mood-bg-icon mood-bg-icon--3" aria-hidden="true" />
      <Droplet className="mood-bg-icon mood-bg-icon--4" aria-hidden="true" />

      <div className="mood-page-content">
      <div className="mood-page-header">
        <div>
          <p className="mood-page-eyebrow">Estado anímico</p>
          <h1 className="mood-page-title">Tu bienestar emocional</h1>
        </div>
        <button className="mood-page-add-btn" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Registrar estado
        </button>
      </div>

      {loading && (
        <div className="mood-page-loading">
          <Loader2 size={24} className="mood-spin" />
          <span>Cargando tu información...</span>
        </div>
      )}

      {!loading && error && (
        <div className="mood-page-error">
          <p>{error}</p>
          <button onClick={loadData} className="mood-page-retry-btn">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && !hasRecords && (
        <div className="mood-page-empty">
          <p>Aún no tienes registros de estado de ánimo.</p>
          <p className="mood-page-empty-sub">
            Registra cómo te sientes para ver tu resumen y recomendaciones personalizadas.
          </p>
        </div>
      )}

      {!loading && !error && hasRecords && summary && (
        <section className="mood-summary-grid">
          <div className="mood-summary-card">
            <p className="mood-summary-label">Nivel de estrés promedio</p>
            <p className="mood-summary-value">{summary.averageStress.toFixed(1)}</p>
            <p className="mood-summary-scale">de 10</p>
          </div>

          <div className="mood-summary-card">
            <p className="mood-summary-label">Nivel de energía promedio</p>
            <p className="mood-summary-value">{summary.averageEnergy.toFixed(1)}</p>
            <p className="mood-summary-scale">de 10</p>
          </div>

          <div className="mood-summary-card">
            <p className="mood-summary-label">Registros totales</p>
            <p className="mood-summary-value">{summary.totalRecords}</p>
            <p className="mood-summary-scale">
              {summary.totalRecords === 1 ? "entrada" : "entradas"}
            </p>
          </div>
        </section>
      )}

      {!loading && !error && hasRecords && recommendation && recommendedMood && (
        <section
          className="mood-recommendation-card"
          style={{ "--mood-color": recommendedMood.color }}
        >
          <div className="mood-recommendation-icon">
            <recommendedMood.icon size={28} strokeWidth={1.75} />
          </div>
          <div className="mood-recommendation-text">
            <p className="mood-recommendation-eyebrow">
              Según tu último registro: {recommendedMood.label}
            </p>
            <p className="mood-recommendation-message">{recommendation.recommendation}</p>
          </div>
        </section>
      )}

      {!loading && !error && history.length > 1 && (
        <section className="mood-chart">
          <h2 className="mood-chart-title">Tendencia</h2>
          <div className="mood-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={[...history]
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((r) => ({
                    date: new Date(r.date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                    }),
                    Estrés: r.stressLevel,
                    Energía: r.energyLevel,
                  }))}
                margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE4DA" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6F6A78" }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "#6F6A78" }} />
                <Tooltip />
                <Line type="monotone" dataKey="Estrés" stroke="#C75450" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Energía" stroke="#9D8EC7" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}


      {!loading && !error && history.length > 0 && (
        <section className="mood-history">
          <h2 className="mood-history-title">Historial</h2>
          <div className="mood-history-list">
            {history.map((record) => {
              const moodInfo = MOOD_OPTIONS.find((m) => m.value === record.moodType);
              return (
                <div
                  className="mood-history-item"
                  key={record.id}
                  style={{ "--mood-color": moodInfo?.color ?? "#9D8EC7" }}
                >
                  <div className="mood-history-icon">
                    {moodInfo && <moodInfo.icon size={20} strokeWidth={1.75} />}
                  </div>

                  <div className="mood-history-info">
                    <div className="mood-history-top">
                      <span className="mood-history-label">{moodInfo?.label ?? record.moodType}</span>
                      <span className="mood-history-date">
                        {new Date(record.date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mood-history-stats">
                      <span>Estrés: {record.stressLevel}/10</span>
                      <span>Energía: {record.energyLevel}/10</span>
                    </div>
                    {record.note && <p className="mood-history-note">{record.note}</p>}
                  </div>

                  <div className="mood-history-actions">
                    <button
                      type="button"
                      className="mood-history-action-btn"
                      onClick={() => handleEdit(record)}
                      aria-label="Editar registro"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="mood-history-action-btn mood-history-action-btn--danger"
                      onClick={() => handleDeleteClick(record.id)}
                      disabled={deletingId === record.id}
                      aria-label="Eliminar registro"
                    >
                      {deletingId === record.id ? (
                        <Loader2 size={16} className="mood-spin" />
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

      {showForm && <MoodForm onClose={handleFormClose} editingMood={editingMood} />}
      </div>
      {confirmDeleteId !== null && (
        <div className="mood-confirm-overlay">
          <div className="mood-confirm-card">
            <h2 className="mood-confirm-title">Eliminar registro</h2>
            <p className="mood-confirm-text">
              Esta acción no se puede deshacer. ¿Seguro que quieres eliminar este registro de tu historial?
            </p>
            <div className="mood-confirm-actions">
              <button
                type="button"
                className="mood-confirm-btn mood-confirm-btn--cancel"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="mood-confirm-btn mood-confirm-btn--danger"
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
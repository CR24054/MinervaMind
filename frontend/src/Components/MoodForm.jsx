import { useState } from "react";
import { Loader2, Check, AlertCircle, X } from "lucide-react";
import { MOOD_OPTIONS } from "./moodOptions";
import { createMood, updateMood } from "../api/moodApi";
import "../Styles/MoodForm.css";

// TODO: reemplazar cuando exista login real
const CURRENT_USER_ID = 107;

const STRESS_LABELS = ["Muy bajo", "Bajo", "Moderado", "Alto", "Muy alto"];
const ENERGY_LABELS = ["Agotado", "Bajo", "Estable", "Alto", "Lleno de energía"];

function levelLabel(value, labels) {
  const index = Math.min(labels.length - 1, Math.floor((value - 1) / 2));
  return labels[index];
}

export default function MoodForm({ onClose, editingMood }) {
  const isEditing = Boolean(editingMood);

  const [moodType, setMoodType] = useState(editingMood?.moodType ?? null);
  const [stressLevel, setStressLevel] = useState(editingMood?.stressLevel ?? 5);
  const [energyLevel, setEnergyLevel] = useState(editingMood?.energyLevel ?? 5);
  const [note, setNote] = useState(editingMood?.note ?? "");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedMood = MOOD_OPTIONS.find((m) => m.value === moodType);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!moodType) {
      setErrorMessage("Elige cómo te sientes antes de guardar.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      moodType,
      stressLevel,
      energyLevel,
      note: note.trim(),
      userId: CURRENT_USER_ID,
    };

    try {
      if (isEditing) {
        await updateMood(editingMood.id, payload);
      } else {
        await createMood(payload);
      }

      setStatus("success");

      setTimeout(() => {
        onClose?.();
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || "No se pudo guardar tu registro. Intenta de nuevo.");
      setStatus("error");
    }
  }

  return (
    <div className="mood-overlay">
      <form className="mood-card" onSubmit={handleSubmit}>
        <button
          type="button"
          className="mood-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <header className="mood-header">
          <p className="mood-eyebrow">{isEditing ? "Editar registro" : "Registro diario"}</p>
          <h1 className="mood-title">
            {isEditing ? "Actualiza tu registro" : "¿Cómo te sientes hoy?"}
          </h1>
          <p className="mood-subtitle">
            {isEditing
              ? "Ajusta los valores y guarda los cambios."
              : "Tómate un momento. Cada registro te ayuda a entender mejor tus patrones."}
          </p>
        </header>

        <section className="mood-section">
          <div className="mood-grid">
            {MOOD_OPTIONS.map((option) => {
              const isSelected = moodType === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  className={`mood-option ${isSelected ? "mood-option--selected" : ""}`}
                  style={{ "--mood-color": option.color }}
                  onClick={() => setMoodType(option.value)}
                  aria-pressed={isSelected}
                >
                  <option.icon className="mood-option-icon" size={22} strokeWidth={1.75} />
                  <span className="mood-option-label">{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mood-section mood-sliders">
          <div className="mood-slider-group">
            <div className="mood-slider-header">
              <label htmlFor="stressLevel">Nivel de estrés</label>
              <span className="mood-slider-value">{levelLabel(stressLevel, STRESS_LABELS)}</span>
            </div>
            <input
              id="stressLevel"
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="mood-slider mood-slider--stress"
            />
          </div>

          <div className="mood-slider-group">
            <div className="mood-slider-header">
              <label htmlFor="energyLevel">Nivel de energía</label>
              <span className="mood-slider-value">{levelLabel(energyLevel, ENERGY_LABELS)}</span>
            </div>
            <input
              id="energyLevel"
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="mood-slider mood-slider--energy"
            />
          </div>
        </section>

        <section className="mood-section">
          <label htmlFor="note" className="mood-note-label">
            ¿Quieres añadir algo más? <span className="mood-optional">(opcional)</span>
          </label>
          <textarea
            id="note"
            className="mood-note"
            placeholder="Escribe lo que tengas en mente..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={500}
          />
        </section>

        {status === "error" && (
          <div className="mood-feedback mood-feedback--error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === "success" && (
          <div className="mood-feedback mood-feedback--success">
            <Check size={18} />
            <span>
              {isEditing ? "Tu registro se actualizó correctamente." : "Tu registro se guardó correctamente."}
            </span>
          </div>
        )}

        <button
          type="submit"
          className="mood-submit"
          disabled={status === "loading"}
          style={selectedMood ? { "--mood-accent": selectedMood.color } : undefined}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="mood-spin" />
              Guardando...
            </>
          ) : isEditing ? (
            "Guardar cambios"
          ) : (
            "Guardar registro"
          )}
        </button>
      </form>
    </div>
  );
}
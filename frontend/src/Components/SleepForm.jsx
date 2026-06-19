import { useState } from "react";
import { Loader2, Check, AlertCircle, X } from "lucide-react";
import { SLEEP_QUALITY_OPTIONS } from "./sleepOptions";
import { createSleep, updateSleep } from "../api/sleepApi";
import "../Styles/SleepForm.css";

import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function SleepForm({ onClose, editingSleep }) {
  const { userId } = useContext(AuthContext);
  const isEditing = Boolean(editingSleep);

  const [bedTime, setBedTime] = useState(editingSleep?.bedTime?.slice(0, 5) ?? "23:00");
  const [wakeTime, setWakeTime] = useState(editingSleep?.wakeTime?.slice(0, 5) ?? "07:00");
  const [sleepQuality, setSleepQuality] = useState(editingSleep?.sleepQuality ?? null);
  const [note, setNote] = useState(editingSleep?.note ?? "");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedQuality = SLEEP_QUALITY_OPTIONS.find((q) => q.value === sleepQuality);

  function calculatePreviewHours() {
    const [bedH, bedM] = bedTime.split(":").map(Number);
    const [wakeH, wakeM] = wakeTime.split(":").map(Number);

    let bedMinutes = bedH * 60 + bedM;
    let wakeMinutes = wakeH * 60 + wakeM;

    if (wakeMinutes <= bedMinutes) {
      wakeMinutes += 24 * 60;
    }

    const diff = (wakeMinutes - bedMinutes) / 60;
    return diff.toFixed(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!sleepQuality) {
      setErrorMessage("Selecciona la calidad de tu sueño antes de guardar.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      bedTime: `${bedTime}:00`,
      wakeTime: `${wakeTime}:00`,
      sleepQuality,
      note: note.trim(),
      userId: userId,
    };

    try {
      if (isEditing) {
        await updateSleep(editingSleep.id, payload);
      } else {
        await createSleep(payload);
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
    <div className="sleep-overlay">
      <form className="sleep-card" onSubmit={handleSubmit}>
        <button
          type="button"
          className="sleep-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <header className="sleep-header">
          <p className="sleep-eyebrow">{isEditing ? "Editar registro" : "Registro de sueño"}</p>
          <h1 className="sleep-title">
            {isEditing ? "Actualiza tu descanso" : "¿Cómo dormiste?"}
          </h1>
          <p className="sleep-subtitle">
            {isEditing
              ? "Ajusta los valores y guarda los cambios."
              : "Registra tus horarios para llevar un seguimiento de tu descanso."}
          </p>
        </header>

        <section className="sleep-section sleep-times">
          <div className="sleep-time-group">
            <label htmlFor="bedTime">Hora de dormir</label>
            <input
              id="bedTime"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="sleep-time-input"
            />
          </div>

          <div className="sleep-time-group">
            <label htmlFor="wakeTime">Hora de despertar</label>
            <input
              id="wakeTime"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="sleep-time-input"
            />
          </div>
        </section>

        <p className="sleep-hours-preview">
          Horas de sueño estimadas: <strong>{calculatePreviewHours()} hrs</strong>
        </p>

        <section className="sleep-section">
          <p className="sleep-section-label">¿Cómo fue la calidad de tu sueño?</p>
          <div className="sleep-quality-grid">
            {SLEEP_QUALITY_OPTIONS.map((option) => {
              const isSelected = sleepQuality === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  className={`sleep-quality-option ${isSelected ? "sleep-quality-option--selected" : ""}`}
                  style={{ "--quality-color": option.color }}
                  onClick={() => setSleepQuality(option.value)}
                  aria-pressed={isSelected}
                >
                  <option.icon className="sleep-quality-icon" size={22} strokeWidth={1.75} />
                  <span className="sleep-quality-label">{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="sleep-section">
          <label htmlFor="note" className="sleep-note-label">
            ¿Algo más que quieras anotar? <span className="sleep-optional">(opcional)</span>
          </label>
          <textarea
            id="note"
            className="sleep-note"
            placeholder="Escribe lo que tengas en mente..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={500}
          />
        </section>

        {status === "error" && (
          <div className="sleep-feedback sleep-feedback--error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === "success" && (
          <div className="sleep-feedback sleep-feedback--success">
            <Check size={18} />
            <span>
              {isEditing ? "Tu registro se actualizó correctamente." : "Tu registro se guardó correctamente."}
            </span>
          </div>
        )}

        <button
          type="submit"
          className="sleep-submit"
          disabled={status === "loading"}
          style={selectedQuality ? { "--quality-accent": selectedQuality.color } : undefined}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="sleep-spin" />
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
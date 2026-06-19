import { useState, useEffect, useRef, useContext } from 'react';
import '../Styles/Dashboard.css';
import MoodForm from '../Components/MoodForm';
import { AuthContext } from '../AuthContext';
import { getSleepSummary } from '../api/sleepApi';
import api from '../api/axiosConfig';
import {
  Sun, CloudSun, Moon, Smile, Timer, Flame, CheckCircle2, Target,
  Play, Pause, RotateCcw,
} from 'lucide-react';

const WORK_MINUTES = 25;
const WORK_SECONDS = WORK_MINUTES * 60;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const QUOTES = [
  "El éxito es la suma de pequeños esfuerzos repetidos cada día.",
  "Cada hora de enfoque te acerca a quien quieres ser.",
  "No tienes que ser perfecta, solo consistente.",
  "Tu mente es tu herramienta más poderosa.",
  "Un día a la vez. Un paso a la vez.",
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)  return { text: 'Buenos días',  Icon: Sun };
  if (hour >= 12 && hour < 18) return { text: 'Buenas tardes', Icon: CloudSun };
  return { text: 'Buenas noches', Icon: Moon };
}

function fmt(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function getDate() {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

export default function DashboardView() {
  const { userId } = useContext(AuthContext);
  const [showMood, setShowMood] = useState(false);
  const greeting = getGreeting();
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  const [sleepHrs, setSleepHrs]    = useState(null);
  const [pendingTasks, setPending] = useState(null);

  const [secs, setSecs]       = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    getSleepSummary(userId)
      .then(d => setSleepHrs(d.averageHoursSlept ?? null))
      .catch(() => setSleepHrs(null));
    api.get(`/api/tasks/user/${userId}`)
      .then(r => setPending(r.data.filter(t => !t.completed).length))
      .catch(() => setPending(null));

    // Revisar si han pasado 12 horas desde el último prompt de estado de ánimo
    const lastPrompt = localStorage.getItem(`lastMoodPrompt_${userId}`);
    const now = Date.now();
    if (!lastPrompt || (now - parseInt(lastPrompt, 10)) > 12 * 60 * 60 * 1000) {
      setShowMood(true);
      // Guardamos la hora inmediatamente para que si refrescan la página, no vuelva a salir
      localStorage.setItem(`lastMoodPrompt_${userId}`, now.toString());
    }
  }, [userId]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecs(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setSessions(s => s + 1);
            return WORK_SECONDS;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggleTimer = () => setRunning(r => !r);
  const resetTimer  = () => { setRunning(false); setSecs(WORK_SECONDS); };

  const progress     = (WORK_SECONDS - secs) / WORK_SECONDS;
  const strokeOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <main className="dash-wrapper">
      {showMood && <MoodForm onClose={() => {
        setShowMood(false);
        localStorage.setItem(`lastMoodPrompt_${userId}`, Date.now().toString());
      }} />}

      {/* ── BIENVENIDA ── */}
      <header className="dash-welcome">
        <div className="dash-welcome-text">
          <p className="dash-date">{getDate()}</p>
          <h1 className="dash-title">
            <greeting.Icon className="dash-title-icon" size={28} />
            {greeting.text}
          </h1>
          <p className="dash-quote">"{quote}"</p>
        </div>
        <button className="dash-mood-trigger" onClick={() => setShowMood(true)}>
          <Smile size={18} /> ¿Cómo te sientes hoy?
        </button>
      </header>

      {/* ── BENTO GRID ── */}
      <div className="dash-bento">

        {/* POMODORO — card grande, col izquierda */}
        <div className="dash-bento-pomo">
          <p className="dash-pomo-eyebrow"><Timer size={14} /> Temporizador Pomodoro</p>
          <p className="dash-pomo-hint">
            {running ? (
              <><Flame size={13} /> ¡Mantén el enfoque!</>
            ) : 'Concéntrate 25 min, descansa 5.'}
          </p>

          <div className="dash-pomo-ring-wrap">
            <svg className="dash-pomo-svg" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={RADIUS} className="pomo-track" />
              <circle
                cx="64" cy="64" r={RADIUS}
                className={`pomo-progress ${running ? 'pomo-progress--running' : ''}`}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <div className="dash-pomo-time">{fmt(secs)}</div>
          </div>

          <div className="dash-pomo-btns">
            <button className="dash-pomo-main" onClick={toggleTimer}>
              {running ? <><Pause size={15} /> Pausar</> : <><Play size={15} /> Iniciar</>}
            </button>
            {secs !== WORK_SECONDS && (
              <button className="dash-pomo-reset" onClick={resetTimer}>
                <RotateCcw size={17} />
              </button>
            )}
          </div>

          <div className="dash-pomo-dots">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`dash-pomo-dot ${i < sessions ? 'done' : ''}`} />
            ))}
          </div>
          <p className="dash-pomo-count">
            {sessions === 0
              ? 'Aún sin sesiones hoy'
              : `${sessions} de 8 sesiones`}
          </p>
        </div>

        {/* SUEÑO */}
        <div className="dash-bento-card dash-bento-sleep">
          <span className="dash-card-icon dash-card-icon--sleep"><Moon size={20} /></span>
          <p className="dash-card-label">Sueño promedio</p>
          <p className="dash-card-value">
            {sleepHrs !== null ? sleepHrs.toFixed(1) : '—'}
          </p>
          <p className="dash-card-unit">
            {sleepHrs !== null ? 'horas' : 'sin registros'}
          </p>
          <div className="dash-card-bar">
            <div
              className="dash-card-fill"
              style={{ width: sleepHrs ? `${Math.min((sleepHrs / 9) * 100, 100)}%` : '0%' }}
            />
          </div>
        </div>

        {/* TAREAS */}
        <div className="dash-bento-card dash-bento-tasks">
          <span className="dash-card-icon dash-card-icon--tasks"><CheckCircle2 size={20} /></span>
          <p className="dash-card-label">Tareas pendientes</p>
          <p className="dash-card-value">
            {pendingTasks !== null ? pendingTasks : '—'}
          </p>
          <p className="dash-card-unit">
            {pendingTasks === 1 ? 'tarea por hacer' : 'tareas por hacer'}
          </p>
          <div className="dash-card-bar">
            <div
              className="dash-card-fill"
              style={{ width: pendingTasks > 0 ? `${Math.min((pendingTasks / 10) * 100, 100)}%` : '0%' }}
            />
          </div>
        </div>

        {/* SESIONES — card ancha, fila 2 derecha */}
        <div className="dash-bento-card dash-bento-focus">
          <div className="dash-focus-row">
            <div>
              <span className="dash-card-icon dash-card-icon--focus"><Target size={20} /></span>
              <p className="dash-card-label">Meta de sesiones hoy</p>
              <p className="dash-card-value">
                {sessions}
                <span className="dash-focus-of"> / 8</span>
              </p>
              <p className="dash-card-unit">
                {Math.round((sessions / 8) * 100)}% de la meta diaria
              </p>
            </div>
            <div className="dash-focus-dots">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`dash-focus-dot ${i < sessions ? 'done' : ''}`} />
              ))}
            </div>
          </div>
          <div className="dash-card-bar dash-card-bar--wide">
            <div
              className="dash-card-fill"
              style={{ width: `${Math.min((sessions / 8) * 100, 100)}%` }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}

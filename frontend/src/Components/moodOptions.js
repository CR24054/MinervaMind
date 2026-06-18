import { Sun, Wind, Flame, Moon, AlertTriangle, Activity, CloudRain, Zap } from "lucide-react";

export const MOOD_OPTIONS = [
  { value: "HAPPY", label: "Feliz", icon: Sun, color: "#E0A458" },
  { value: "CALM", label: "Tranquilo", icon: Wind, color: "#7FA897" },
  { value: "MOTIVATED", label: "Motivado", icon: Flame, color: "#D9714E" },
  { value: "TIRED", label: "Cansado", icon: Moon, color: "#8C7BB8" },
  { value: "STRESSED", label: "Estresado", icon: AlertTriangle, color: "#C75450" },
  { value: "ANXIOUS", label: "Ansioso", icon: Activity, color: "#BD7280" },
  { value: "SAD", label: "Triste", icon: CloudRain, color: "#6E8DB5" },
  { value: "ANGRY", label: "Enojado", icon: Zap, color: "#B05A5A" },
];
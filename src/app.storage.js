import { state } from "./app.state.js";

const STORAGE_KEY = "appointment_data";

export function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    state.appointments = parsed.appointments || [];
  }
}

export function saveToStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      appointments: state.appointments,
    })
  );
}

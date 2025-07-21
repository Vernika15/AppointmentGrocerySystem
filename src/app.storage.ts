import { state } from "./app.state.ts";
import type { Appointment } from "./types.ts";

const STORAGE_KEY = "appointment_data";

export function loadFromStorage(): void {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as { appointments: Appointment[] };
      state.appointments = parsed.appointments || [];
    } catch (error) {
      console.error("Failed to load appointments from storage:", error);
    }
  }
}

export function saveToStorage(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      appointments: state.appointments,
    })
  );
}

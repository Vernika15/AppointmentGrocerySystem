import { state } from "./app.state.js";

export function getAvailableSlots(doctor, date) {
  if (!doctor || !date) return [];

  const bookedSlots = state.appointments
    .filter((app) => app.doctor === doctor && app.date === date)
    .map((app) => app.slot);

  return state.availableSlots.filter((slot) => !bookedSlots.includes(slot));
}

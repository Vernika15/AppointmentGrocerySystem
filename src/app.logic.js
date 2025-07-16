import { state } from "./app.state.js";

export function getAvailableSlots(doctor, date, excludeId = null) {
  // if (!doctor || !date) return [];

  const bookedSlots = state.appointments
    .filter(
      (app) =>
        app.doctor === doctor && app.date === date && app.id !== excludeId
    )
    .map((app) => app.slot);

  return state.availableSlots.filter((slot) => !bookedSlots.includes(slot));
}

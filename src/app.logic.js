import { state } from "./app.state.js";

// Computes available time slots for a given doctor and date
// Parameters:
// - doctor: selected doctor's name
// - date: selected appointment date
// - excludeId (optional): used when editing an appointment, so the current appointment's slot is not excluded
export function getAvailableSlots(doctor, date, excludeId = null) {
  // If doctor or date is missing, return [] to avoid errors
  // if (!doctor || !date) return [];

  // Get all slots already booked by this doctor on the same date
  // Exclude the current appointment ID (useful when editing)
  const bookedSlots = state.appointments
    .filter(
      (app) =>
        app.doctor === doctor && app.date === date && app.id !== excludeId
    )
    .map((app) => app.slot); // Extract just the slot values

  // Return only those slots which are not yet booked
  return state.availableSlots.filter((slot) => !bookedSlots.includes(slot));
}

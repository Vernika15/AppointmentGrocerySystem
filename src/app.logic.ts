import { state } from "./app.state.ts";
import type { Appointment } from "./types.ts";

// Computes available time slots for a given doctor and date
// Parameters:
// - doctor: selected doctor's name
// - date: selected appointment date
// - excludeId (optional): used when editing an appointment, so the current appointment's slot is not excluded
export function getAvailableSlots(
  doctor: string,
  date: string,
  excludeId: string | null = null
): string[] {
  // If doctor or date is missing, return [] to avoid errors
  // if (!doctor || !date) return [];

  // Get all slots already booked by this doctor on the same date
  // Exclude the current appointment ID (useful when editing)

  const bookedSlots = state.appointments
    .filter(
      (app: Appointment) =>
        app.doctor === doctor && app.date === date && app.id !== excludeId
    )
    .map((app: Appointment) => app.slot); // Extract just the slot values

  return state.availableSlots.filter(
    (slot: string) => !bookedSlots.includes(slot)
  );
}

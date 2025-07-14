import { state } from "../app.state.js";

export function Counter() {
  const div = document.createElement("div");
  div.className = "counter-card";
  div.textContent = `Total Appointments: ${state.appointments.length}`;
  return div;
}

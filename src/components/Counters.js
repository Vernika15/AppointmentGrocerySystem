import { state } from "../app.state.js";

// 📊 Counter component that displays the total number of appointments
export function Counter() {
  // Create a container div for the counter card
  const div = document.createElement("div");
  div.className = "counter-card";

  // Display the count using state.appointments.length
  div.textContent = `Total Appointments: ${state.appointments.length}`;

  // Return the DOM element to be mounted
  return div;
}

import { state } from "../app.state.ts";

// Counter component that displays the total number of appointments
export function Counter(): HTMLElement {
  // Create a container div for the counter card
  const div: HTMLDivElement = document.createElement("div");
  div.className = "counter-card";

  // Display the count using state.appointments.length
  div.textContent = `Total Appointments: ${state.appointments.length}`;

  // Return the DOM element to be mounted
  return div;
}

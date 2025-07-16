import { state } from "../app.state.js";
import { Counter } from "./Counters.js";
import { Form } from "./Form.js";
import { Table } from "./Table.js";

// Root render function that constructs the entire UI
export function renderApp() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous DOM content before re-rendering

  // Top summary counter card (shows total appointments)
  const counterCard = Counter();

  // Create main horizontal layout container
  const layout = document.createElement("div");
  layout.className = "layout";

  // Left section: contains the appointment booking form
  const left = document.createElement("div");
  left.className = "left";
  left.appendChild(Form()); // Always shows blank form for new booking

  // Right section: contains the list of existing appointments
  const right = document.createElement("div");
  right.className = "right";
  right.appendChild(Table()); // Renders appointment table with Edit/Delete

  // Append left and right panels to layout container
  layout.appendChild(left);
  layout.appendChild(right);

  // Add counter and layout to the DOM
  root.appendChild(counterCard); // Total Appointments card at top
  root.appendChild(layout); // Horizontal split: form + table

  // Conditionally render modal if editing an appointment
  if (state.form.id) {
    const modal = document.createElement("div");
    modal.className = "modal-overlay"; // Transparent dark backdrop

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.appendChild(Form(true)); // Pass `true` to render pre-filled modal form

    modal.appendChild(modalContent);
    root.appendChild(modal); // Modal appears above layout
  }
}

import { state } from "../app.state.js";
import { renderApp } from "./App.js";
import { saveToStorage } from "../app.storage.js";

// Renders the appointments table with Edit and Delete actions
export function Table() {
  const section = document.createElement("section");

  // Create the table layout and inject appointment rows dynamically
  section.innerHTML = `
    <h3>📅 Appointments Table</h3>
    <table class="appointment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Slot</th>
          <th>Purpose</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${state.appointments
          .map(
            (app) => `
          <tr>
            <td>${app.name}</td>
            <td>${app.doctor}</td>
            <td>${app.date}</td>
            <td>${app.slot}</td>
            <td>${app.purpose}</td>
            <td>
              <button class="edit-btn" data-id="${app.id}">Edit</button>
              <button class="delete-btn" data-id="${app.id}">Delete</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  // Handle Edit button click
  section.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      // Find the appointment to edit
      const found = state.appointments.find((app) => app.id === id);

      // Store it in state.form to pre-fill the modal
      state.form = { ...found };

      // Trigger modal rendering
      renderApp();
    });
  });

  // Handle Delete button click
  section.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const confirmDelete = confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (confirmDelete) {
        // Remove the appointment from global state
        state.appointments = state.appointments.filter((app) => app.id !== id);

        // Persist the updated state
        saveToStorage();

        // Re-render the UI (which also updates available slots)
        renderApp();
      }
    });
  });

  return section;
}

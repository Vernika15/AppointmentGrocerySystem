import { state } from "../app.state.js";
import { renderApp } from "./App.js";
import { saveToStorage } from "../app.storage.js";

export function Table() {
  const section = document.createElement("section");

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

  // Handle Edit
  section.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const found = state.appointments.find((app) => app.id === id);
      state.form = { ...found }; // populate form
      renderApp();
    });
  });

  // Handle Delete
  section.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const confirmDelete = confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (confirmDelete) {
        state.appointments = state.appointments.filter((app) => app.id !== id);
        saveToStorage();
        renderApp();
      }
    });
  });

  return section;
}

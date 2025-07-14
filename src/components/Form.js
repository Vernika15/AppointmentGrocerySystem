import { state } from "../app.state.js";
import { getAvailableSlots } from "../app.logic.js";
import { generateId } from "../utils/id.js";
import { saveToStorage } from "../app.storage.js";
import { renderApp } from "./App.js";

export function Form() {
  const form = document.createElement("form");
  form.className = "appointment-form";

  const isEditing = !!state.form.id;

  // Defaults for dropdowns
  const selectedDoctor = state.form.doctor || "";
  const selectedDate = state.form.date || "";
  const selectedSlot = state.form.slot || "";

  const availableSlots =
    selectedDoctor && selectedDate
      ? getAvailableSlots(selectedDoctor, selectedDate, state.form.id)
      : [];

  form.innerHTML = `
    <h3>📋 Appointment Form</h3>
    
    <label>Name:<br/>
      <input name="name" required value="${state.form.name || ""}" />
    </label><br/>

    <label>Date:<br/>
      <input type="date" name="date" required value="${selectedDate}" />
    </label><br/>

    <label>Doctor:<br/>
      <select name="doctor" required>
        <option value="">-- Select Doctor --</option>
        ${state.doctors
          .map(
            (doc) => `
          <option value="${doc}" ${
              doc === selectedDoctor ? "selected" : ""
            }>${doc}</option>
        `
          )
          .join("")}
      </select>
    </label><br/>

    <label>Slot:<br/>
      <select name="slot" required>
        <option value="">-- Select Slot --</option>
        ${availableSlots
          .map(
            (slot) => `
          <option value="${slot}" ${
              slot === selectedSlot ? "selected" : ""
            }>${slot}</option>
        `
          )
          .join("")}
      </select>
    </label><br/>

    <label>Purpose:<br/>
      <textarea name="purpose" required>${state.form.purpose || ""}</textarea>
    </label><br/>

    <button type="submit">${
      isEditing ? "Update Appointment" : "Book Appointment"
    }</button>
  `;

  // Re-render when doctor or date changes
  form
    .querySelector('select[name="doctor"]')
    .addEventListener("change", (e) => {
      state.form.doctor = e.target.value;
      renderApp();
    });

  form.querySelector('input[name="date"]').addEventListener("change", (e) => {
    state.form.date = e.target.value;
    renderApp();
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());

    if (isEditing) {
      const index = state.appointments.findIndex(
        (app) => app.id === state.form.id
      );
      state.appointments[index] = { ...formData, id: state.form.id };
    } else {
      state.appointments.push({ ...formData, id: generateId() });
    }

    state.form = {};
    saveToStorage();
    renderApp();
  });

  return form;
}

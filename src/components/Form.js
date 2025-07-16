import { state } from "../app.state.js";
import { getAvailableSlots } from "../app.logic.js";
import { generateId } from "../utils/id.js";
import { saveToStorage } from "../app.storage.js";
import { renderApp } from "./App.js";

export function Form(isModal = false) {
  const form = document.createElement("form");
  form.className = "appointment-form";

  const isEditing = !!(isModal && state.form.id);

  let formData = isEditing
    ? { ...state.form }
    : { name: "", date: "", doctor: "", slot: "", purpose: "" };

  let { name, date, doctor, slot, purpose } = formData;

  const availableSlots =
    doctor && date
      ? getAvailableSlots(doctor, date, isEditing ? state.form.id : null)
      : [];

  const heading = document.createElement("h3");

  if (isModal) {
    const closeIcon = document.createElement("span");
    closeIcon.innerHTML = "✖";
    closeIcon.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1.2rem;
      font-size: 1.2rem;
      cursor: pointer;
      color: #888;
    `;
    closeIcon.addEventListener("click", () => {
      state.form = {};
      renderApp();
    });
    form.appendChild(closeIcon);
  }

  heading.textContent = isEditing
    ? "✏️ Edit Appointment"
    : "📝 Appointment Form";
  form.appendChild(heading);

  function createField(labelText, inputEl) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.appendChild(inputEl);
    return label;
  }

  // Name field
  const nameInput = document.createElement("input");
  nameInput.name = "name";
  nameInput.required = true;
  nameInput.value = name;
  form.appendChild(createField("Name:", nameInput));

  // Date field
  const dateInput = document.createElement("input");
  dateInput.name = "date";
  dateInput.type = "date";
  dateInput.required = true;
  dateInput.value = date;
  form.appendChild(createField("Date:", dateInput));

  // Doctor dropdown
  const doctorSelect = document.createElement("select");
  doctorSelect.name = "doctor";
  doctorSelect.required = true;

  const defaultDocOpt = document.createElement("option");
  defaultDocOpt.value = "";
  defaultDocOpt.textContent = "-- Select Doctor --";
  doctorSelect.appendChild(defaultDocOpt);

  state.doctors.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc;
    option.textContent = doc;
    if (doc === doctor) option.selected = true;
    doctorSelect.appendChild(option);
  });

  form.appendChild(createField("Doctor:", doctorSelect));

  // Slot dropdown
  const slotSelect = document.createElement("select");
  slotSelect.name = "slot";
  slotSelect.required = true;
  slotSelect.disabled = !doctor || !date;

  const defaultSlotOpt = document.createElement("option");
  defaultSlotOpt.value = "";
  defaultSlotOpt.textContent =
    !doctor || !date ? "-- Select Doctor & Date First --" : "-- Select Slot --";
  slotSelect.appendChild(defaultSlotOpt);

  availableSlots.forEach((s) => {
    const option = document.createElement("option");
    option.value = s;
    option.textContent = s;
    if (s === slot) option.selected = true;
    slotSelect.appendChild(option);
  });

  form.appendChild(createField("Slot:", slotSelect));

  function updateSlotDropdown(newDoctor, newDate) {
    const slots =
      newDoctor && newDate ? getAvailableSlots(newDoctor, newDate, null) : [];

    // Clear old options
    slotSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent =
      !newDoctor || !newDate
        ? "-- Select Doctor & Date First --"
        : "-- Select Slot --";
    slotSelect.appendChild(defaultOption);

    slots.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      slotSelect.appendChild(opt);
    });

    slotSelect.disabled = !newDoctor || !newDate;
  }

  // Purpose field
  const purposeArea = document.createElement("textarea");
  purposeArea.name = "purpose";
  purposeArea.required = true;
  purposeArea.textContent = purpose;
  form.appendChild(createField("Purpose:", purposeArea));

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = isEditing ? "Update Appointment" : "Book Appointment";

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "form-actions";
  actionsDiv.appendChild(submitBtn);

  form.appendChild(actionsDiv);

  // Only modal form updates state.form
  if (isModal) {
    doctorSelect.addEventListener("change", (e) => {
      state.form.doctor = e.target.value;
      renderApp();
    });

    dateInput.addEventListener("change", (e) => {
      state.form.date = e.target.value;
      renderApp();
    });
  }

  if (!isModal) {
    doctorSelect.addEventListener("change", (e) => {
      doctor = e.target.value;
      updateSlotDropdown(doctor, date);
    });

    dateInput.addEventListener("change", (e) => {
      date = e.target.value;
      updateSlotDropdown(doctor, date);
    });
  }

  // Submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (isEditing) {
      const index = state.appointments.findIndex((a) => a.id === state.form.id);
      state.appointments[index] = { ...data, id: state.form.id };
    } else {
      state.appointments.push({ ...data, id: generateId() });

      alert("Appointment booked successfully!");
    }

    state.form = {};
    saveToStorage();
    renderApp();
  });

  return form;
}

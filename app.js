// =====================
// Doctor Data
// =====================
const doctors = [
  {
    id: "doc1",
    firstName: "A.P.J.",
    lastName: "Abdul",
    phone: "9876543210",
    profile: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "doc2",
    firstName: "Maya",
    lastName: "Rao",
    phone: "8765432190",
    profile: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "doc3",
    firstName: "Vikram",
    lastName: "Patel",
    phone: "7654321980",
    profile: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "doc4",
    firstName: "In",
    lastName: "Ho",
    phone: "7634521980",
    profile: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: "doc5",
    firstName: "Deepak",
    lastName: "Verma",
    phone: "9034500980",
    profile: "https://i.pravatar.cc/40?img=7",
  },
  {
    id: "doc6",
    firstName: "Prem",
    lastName: "Chand",
    phone: "8834521456",
    profile: "https://i.pravatar.cc/40?img=8",
  },
];

// =====================
// Slots Data
// =====================
const allSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

// =====================
// Navigation View Toggle
// =====================
document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.getAttribute("data-view");

    document.querySelectorAll(".view-section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(view + "View").classList.add("active");

    // When switching to "Manage", show doctor list
    if (view === "manage") renderDoctorList();

    // When switching to "List", render appointment table
    if (view === "list") renderAppointments();
  });
});

// Show Manage view and doctor list on page load
document.getElementById("manageView").classList.add("active");
renderDoctorList(); // render doctors initially

// =====================
// DOM Elements
// =====================
const appointmentForm = document.getElementById("appointmentForm");
const selectedDoctorName = document.getElementById("selectedDoctorName");
const dateInput = document.getElementById("appointmentDate");
const slotSelect = document.getElementById("timeSlotSelect");
const patientNameInput = document.getElementById("patientName");
const purposeInput = document.getElementById("purpose");
const bookBtn = document.getElementById("bookBtn");
const modal = document.getElementById("appointmentModal");
const closeModalBtn = document.getElementById("closeModal");
const modalDoctorName = document.getElementById("modalDoctorName");

let selectedDoctorId = null;
let editingIndex = null; // null = not editing, number = appointment index

// =====================
// Render available slots
// =====================
function getAvailableSlots(doctorId, date) {
  const appointments = getAppointments();
  const booked = appointments
    .filter((a) => a.doctorId === doctorId && a.date === date)
    .map((a) => a.slot);
  return allSlots.filter((slot) => !booked.includes(slot));
}

// =====================
// Render Doctor Table
// =====================
function renderDoctorList() {
  const tbody = document.getElementById("doctorList");
  tbody.innerHTML = "";

  doctors.forEach((doc) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${doc.profile}" alt="profile" class="doc-pic"/></td>
      <td>${doc.firstName}</td>
      <td>${doc.lastName}</td>
      <td>${doc.phone}</td>
      <td><button class="arrow-btn" data-id="${doc.id}">➡️</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// =====================
// Modal Handling (Book or Edit)
// =====================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrow-btn")) {
    const docId = e.target.getAttribute("data-id");
    const doctor = doctors.find((d) => d.id === docId);
    if (!doctor) return;

    editingIndex = null;
    selectedDoctorId = doctor.id;
    modalDoctorName.textContent = `${doctor.firstName} ${doctor.lastName}`;

    // Reset form fields
    patientNameInput.value = "";
    purposeInput.value = "";
    dateInput.value = "";
    slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
    bookBtn.textContent = "Book Appointment";

    // Show modal
    modal.style.display = "block";
  }
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  editingIndex = null;
  bookBtn.textContent = "Book Appointment";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    editingIndex = null;
    bookBtn.textContent = "Book Appointment";
  }
});

// =====================
// Load Slots on Date Change
// =====================
dateInput.addEventListener("change", () => {
  const date = dateInput.value;
  if (!date || !selectedDoctorId) return;

  const slots = getAvailableSlots(selectedDoctorId, date);
  slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
  slots.forEach((slot) => {
    const opt = document.createElement("option");
    opt.value = slot;
    opt.textContent = slot;
    slotSelect.appendChild(opt);
  });
});

// =====================
// Book or Update Appointment
// =====================
bookBtn.addEventListener("click", () => {
  const date = dateInput.value;
  const slot = slotSelect.value;
  const patientName = patientNameInput.value.trim();
  const purpose = purposeInput.value.trim();
  const doctor = doctors.find((d) => d.id === selectedDoctorId);

  if (!selectedDoctorId || !date || !slot || !patientName || !purpose) {
    alert("Please fill all fields.");
    return;
  }

  let appointments = getAppointments();

  // If editing, remove old record
  if (editingIndex !== null) {
    appointments.splice(editingIndex, 1);
    editingIndex = null;
  }

  // Check for slot conflicts
  const available = getAvailableSlots(selectedDoctorId, date);
  if (!available.includes(slot)) {
    alert("Slot already booked. Please choose another.");
    return;
  }

  const newAppointment = {
    doctorId: selectedDoctorId,
    doctorName: `${doctor.firstName} ${doctor.lastName}`,
    date,
    slot,
    patientName,
    purpose,
  };

  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("Appointment saved successfully!");
  modal.style.display = "none";
  bookBtn.textContent = "Book Appointment";
  renderAppointments();
});

// =====================
// Placeholder Appointment Renderer (For List View)
// =====================
function getAppointments() {
  return JSON.parse(localStorage.getItem("appointments")) || [];
}

// =====================
// Render Appointments in List View
// =====================
function renderAppointments() {
  const tbody = document.querySelector("#appointmentTable tbody");
  const appointments = getAppointments();
  tbody.innerHTML = "";

  appointments.forEach((app, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${app.patientName}</td>
      <td>${app.doctorName}</td>
      <td>${app.date}</td>
      <td>${app.slot}</td>
      <td>${app.purpose}</td>
      <td>
        <span class="edit-btn" data-index="${index}" style="color:blue;cursor:pointer">Edit</span> |
        <span class="delete-btn" data-index="${index}" style="color:red;cursor:pointer">Delete</span>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// =====================
// Handle Delete Click
// =====================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    const confirmed = confirm(
      "Are you sure, you want to cancel this appointment?"
    );
    if (confirmed) {
      const appointments = getAppointments();
      appointments.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      renderAppointments();
    }
  }
});

// =====================
// Handle Edit Click
// =====================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const index = e.target.getAttribute("data-index");
    const appointments = getAppointments();
    const appointment = appointments[index];
    const doctor = doctors.find((d) => d.id === appointment.doctorId);

    if (!doctor) return;

    // Set current edit state
    editingIndex = index;
    selectedDoctorId = doctor.id;

    // Pre-fill form
    modalDoctorName.textContent = `${doctor.firstName} ${doctor.lastName}`;
    patientNameInput.value = appointment.patientName;
    purposeInput.value = appointment.purpose;
    dateInput.value = appointment.date;

    // Populate available slots for this date+doctor
    const slots = getAvailableSlots(selectedDoctorId, appointment.date);
    slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
    slots.push(appointment.slot); // Ensure existing is included even if booked
    const uniqueSlots = [...new Set(slots)]; // avoid duplicates

    uniqueSlots.forEach((slot) => {
      const opt = document.createElement("option");
      opt.value = slot;
      opt.textContent = slot;
      slotSelect.appendChild(opt);
    });

    slotSelect.value = appointment.slot;

    modal.style.display = "block";
    bookBtn.textContent = "Update Appointment";
  }
});

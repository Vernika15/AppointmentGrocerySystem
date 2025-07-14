// ========== Doctor & Slot Data ==========
const doctors = [
  { id: "doc1", name: "Dr. A.P.J. Abdul" },
  { id: "doc2", name: "Dr. Maya Rao" },
  { id: "doc3", name: "Dr. Vikram Patel" },
  { id: "doc4", name: "Dr. In Ho" },
  { id: "doc5", name: "Dr. Deepak Verma" },
  { id: "doc6", name: "Dr. Prem Chand" },
];

const allSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

// ========== DOM Elements ==========
const doctorSelect = document.getElementById("doctorSelect");
const dateInput = document.getElementById("appointmentDate");
const slotSelect = document.getElementById("timeSlotSelect");
const nameInput = document.getElementById("patientName");
const purposeInput = document.getElementById("purpose");
const bookBtn = document.getElementById("bookBtn");
const appointmentTable = document
  .getElementById("appointmentTable")
  .querySelector("tbody");
const totalCountEl = document.getElementById("totalCount");

let editingIndex = null;

// ========== Initialization ==========
populateDoctorDropdown();
renderAppointments();

// ========== Doctor Dropdown ==========
function populateDoctorDropdown() {
  doctors.forEach((doc) => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = doc.name;
    doctorSelect.appendChild(opt);
  });
}

// ========== Load Available Slots ==========
function getAvailableSlots(doctorId, date) {
  const appointments = getAppointments();
  const booked = appointments
    .filter((appt) => appt.doctorId === doctorId && appt.date === date)
    .map((appt) => appt.slot);
  return allSlots.filter((slot) => !booked.includes(slot));
}

dateInput.addEventListener("change", updateSlots);
doctorSelect.addEventListener("change", updateSlots);

function updateSlots() {
  const doctorId = doctorSelect.value;
  const date = dateInput.value;
  slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
  if (!doctorId || !date) return;
  const available = getAvailableSlots(doctorId, date);
  available.forEach((slot) => {
    const opt = document.createElement("option");
    opt.value = slot;
    opt.textContent = slot;
    slotSelect.appendChild(opt);
  });
}

// ========== Save to Local Storage ==========
function getAppointments() {
  return JSON.parse(localStorage.getItem("appointments") || "[]");
}

function saveAppointments(data) {
  localStorage.setItem("appointments", JSON.stringify(data));
}

// ========== Render Table & Count ==========
function renderAppointments() {
  const appointments = getAppointments();
  appointmentTable.innerHTML = "";
  totalCountEl.textContent = appointments.length;

  appointments.forEach((appt, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${appt.patientName}</td>
      <td>${appt.doctorName}</td>
      <td>${appt.date}</td>
      <td>${appt.slot}</td>
      <td>${appt.purpose}</td>
      <td>
        <span class="edit-btn" data-index="${index}" style="color:blue;cursor:pointer;">Edit</span> |
        <span class="delete-btn" data-index="${index}" style="color:red;cursor:pointer;">Delete</span>
      </td>
    `;
    appointmentTable.appendChild(row);
  });
}

// ========== Book / Update Appointment ==========
bookBtn.addEventListener("click", () => {
  const patientName = nameInput.value.trim();
  const doctorId = doctorSelect.value;
  const doctorName = doctors.find((d) => d.id === doctorId)?.name;
  const date = dateInput.value;
  const slot = slotSelect.value;
  const purpose = purposeInput.value.trim();

  if (!patientName || !doctorId || !date || !slot || !purpose) {
    alert("Please fill in all fields.");
    return;
  }

  const appointments = getAppointments();

  // If editing, remove the old appointment first
  if (editingIndex !== null) {
    appointments.splice(editingIndex, 1);
    editingIndex = null;
    bookBtn.textContent = "Book Appointment";
  }

  // Check for slot conflict
  const isSlotTaken = appointments.some(
    (a) => a.doctorId === doctorId && a.date === date && a.slot === slot
  );

  if (isSlotTaken) {
    alert("This slot is already booked.");
    return;
  }

  const newAppointment = {
    patientName,
    doctorId,
    doctorName,
    date,
    slot,
    purpose,
  };

  appointments.push(newAppointment);
  saveAppointments(appointments);
  renderAppointments();
  resetForm();
});

// ========== Edit Appointment ==========
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const index = e.target.dataset.index;
    const appt = getAppointments()[index];
    editingIndex = index;

    nameInput.value = appt.patientName;
    doctorSelect.value = appt.doctorId;
    dateInput.value = appt.date;
    purposeInput.value = appt.purpose;

    // Manually populate dropdown including current slot
    let availableSlots = getAvailableSlots(appt.doctorId, appt.date);
    if (!availableSlots.includes(appt.slot)) {
      availableSlots.push(appt.slot);
    }
    availableSlots = [...new Set(availableSlots)];

    slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
    availableSlots.forEach((slot) => {
      const opt = document.createElement("option");
      opt.value = slot;
      opt.textContent = slot;
      slotSelect.appendChild(opt);
    });

    slotSelect.value = appt.slot;
    bookBtn.textContent = "Update Appointment";
  }
});

// ========== Delete Appointment ==========
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Are you sure, you want to cancel this appointment?")) {
      const appointments = getAppointments();
      appointments.splice(index, 1);
      saveAppointments(appointments);
      renderAppointments();
    }
  }
});

// ========== Reset Form ==========
function resetForm() {
  nameInput.value = "";
  doctorSelect.value = "";
  dateInput.value = "";
  slotSelect.innerHTML = '<option value="">-- Select Slot --</option>';
  purposeInput.value = "";
  editingIndex = null;
  bookBtn.textContent = "Book Appointment";
}

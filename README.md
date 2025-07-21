# 🗓️ Appointment Booking System

This is a single-page **Appointment Booking System** built using **HTML, CSS, and Vanilla TypeScript** (modularized using Vite). It allows users to select doctors, choose available time slots, book appointments, and manage them with full **CRUD (Create, Read, Update, Delete)** functionality — all backed by `localStorage`.

Live Demo: [appointment-booking-system](https://appointment-booking-system-git-vi-f3f108-vernika-gargs-projects.vercel.app)

---

## 🚀 Features

- 🧍 Book appointments with patient name, doctor, date, time slot, and purpose
- 📆 Slot availability updates dynamically based on selected doctor and date
- 🗃 View all appointments in a clean tabular format
- ✏️ Edit appointment via a modal with pre-filled data
- 🗑️ Delete appointment with confirmation and automatic slot re-availability
- 💾 All data is persisted in the browser using `localStorage`
- 🔄 Live UI updates using global state-driven rendering
- 🧭 Horizontal split layout: form on the left, appointment list on the right
- 🎉 Alerts shown on successful booking and deletion

---

## 🛠️ Getting Started

To run the project locally:

### 1. Clone the repo

```bash
git clone https://github.com/your-username/appointment-booking-system.git
cd appointment-booking-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

> Make sure you have **Node.js 18+** installed for Vite compatibility.

---

## 📁 Project Structure

The app uses a **modular, state-driven architecture** inspired by React — built purely in Vanilla TypeScript with Vite:

```
📦 project-root/
├── index.html             # HTML shell
└── src/
    ├── main.ts            # App entry point
    ├── app.state.ts       # Global reactive state
    ├── app.logic.ts       # Business logic (e.g., slot filtering)
    ├── app.storage.ts     # localStorage interaction
    ├── style.css          # Global styles
    ├── components/
    │   ├── App.ts         # Root layout (form + table + modal)
    │   ├── Form.ts        # New + edit form with modal support
    │   ├── Table.ts       # Appointment listing with Edit/Delete
    │   ├── Counters.ts    # Total appointment card at top
    └── utils/
        └── id.ts          # Unique ID generator for appointments
└── README.md              # You're here!
```

## 🙋‍♀️ Author

**Vernika Garg**  
Front-end Developer | React Native Enthusiast

---

## 📃 License

This project is part of an academic assignment and intended for educational purposes only.

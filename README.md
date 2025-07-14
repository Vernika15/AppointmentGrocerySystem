# 🗓️ Appointment Booking System

This is a single-page **Appointment Booking System** built using **HTML, CSS, and Vanilla JavaScript**. It allows users to view doctors, book appointments based on available time slots, and manage existing bookings with full CRUD support — all backed by `localStorage`.

Live Demo: [appointment-booking-system](https://appointment-booking-system-7brrmsbr8-vernika-gargs-projects.vercel.app/)

---

## 🚀 Features

- 🧑‍⚕️ View list of doctors with profile picture and contact details
- 📅 Select a doctor and book an appointment using a modal form
- ⏰ Dynamic slot availability (no double booking)
- 💾 Data persists using `localStorage`
- ✏️ Edit existing appointments (except doctor)
- ❌ Delete with confirmation
- 🧭 Dashboard UI with sidebar navigation
- 📦 Fully deployed using **Vercel**

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage (no backend)
- [http-server](https://www.npmjs.com/package/http-server) (for local dev)
- Vercel (for deployment)

---

## 🧪 How to Run Locally

### 1. 📦 Install `http-server` (only once)

```bash
npm install -g http-server
```

### 2. ▶️ Start the server

From the project root (where `index.html` is):

```bash
http-server
```

It will run at [http://localhost:8080](http://localhost:8080) or a similar port.

---

## 🌐 Deployment

This project is deployed using [Vercel](https://vercel.com):

#### 🔍 To View Preview Deployments

1. Go to [vercel.com](https://vercel.com)
2. Select your project: [`appointment-booking-system`](https://vercel.com/vernika-gargs-projects/appointment-booking-system)
3. Open the **Deployments** tab
4. Find your preview branches and URLs

---

## 📁 Project Structure

```
📦 appointment-booking-system/
├── index.html          # Main HTML page
├── styles.css          # CSS styles
├── app.js              # JavaScript logic
└── README.md           # You're here!
```

---

## 🙋‍♀️ Author

**Vernika Garg**  
Front-end Developer | React Native Enthusiast

---

## 📃 License

This project is part of an academic assignment and intended for educational purposes only.

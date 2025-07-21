import { loadFromStorage } from "./app.storage.ts";
import { renderApp } from "./components/App.ts";

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage(); // Loads appointments from localStorage
  renderApp(); // Renders initial UI
});

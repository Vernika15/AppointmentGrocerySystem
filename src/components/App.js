import { Counter } from "./Counters.js";
import { Form } from "./Form.js";
import { Table } from "./Table.js";

export function renderApp() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear existing DOM

  // Card on top
  const counterCard = Counter();

  // Horizontal layout
  const layout = document.createElement("div");
  layout.className = "layout";

  // Left side: Form + Counter
  const left = document.createElement("div");
  left.className = "left";
  left.appendChild(Form());

  // Right side: Table
  const right = document.createElement("div");
  right.className = "right";
  right.appendChild(Table());

  layout.appendChild(left);
  layout.appendChild(right);

  root.appendChild(counterCard); // Insert card above layout
  root.appendChild(layout);
}

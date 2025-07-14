export function Form() {
  const form = document.createElement("form");
  form.innerHTML = `
      <h3>Book Appointment</h3>
      <p>(Form fields)</p>
    `;
  return form;
}

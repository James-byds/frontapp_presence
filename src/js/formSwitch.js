import { mailform, checkinForm } from "./variables";


if (window.location.pathname === '/checkin') {
  checkinForm.classList.add('is-active'); // Ensure the checkin form is active
}

if (window.location.pathname === '/checkout') {
  checkinForm.classList.remove('is-active'); // Ensure the checkin form is not active
  checkinForm.classList.add('is-inactive'); // Optionally add an inactive class
}
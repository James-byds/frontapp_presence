import { mailform, checkinForm } from "./variables";


if (window.location.pathname === '/checkin') {
  checkinForm.classList.add('active'); // Ensure the checkin form is active
}

if (window.location.pathname === '/checkout') {
  checkinForm.classList.remove('active'); // Ensure the checkin form is not active
  checkinForm.classList.add('inactive'); // Optionally add an inactive class
}
import { baseApiUrl } from './checkin.js'; // Import the base API URL
import './mail_search.js'; // Import the mail search functionality
const currentTime = new Date().toLocaleTimeString([] {hours: '2-digit', minutes: '2-digit'});

let apiUrl = baseApiUrl + `item/entries?filter={visitor._id:"${userId}"`; // API URL for user creation

fetch(apiUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

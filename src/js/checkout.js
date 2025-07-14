import { baseApiUrl, mai } from './variables.js'; // Import the base API URL
import './mail_search.js'; // Import the mail search functionality


const currentTime = new Date().toLocaleTimeString([], {hours: '2-digit', minutes: '2-digit'});

let filter = `?filter={visitor._id:"${userId}"`

let apiUrl = baseApiUrl + "item/entries"; // API URL for user" creation

fetch(apiUrl + filter, {//get entry ID by user ID
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const entryId = data[0]._id; // Get the entry ID from the fetched data
      console.log('Entry found:', data[0]);
      // Update the entry with the departure time
      fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: {
          "_id": entryId,
          "departure": currentTime, // Set the departure time
        }
      })
      .then(response => response.json())
      .then(updatedEntry => {
        console.log('Entry updated successfully:', updatedEntry);
        alert(`Check-out successful for user ID: ${userId} at ${currentTime}`);
      })
      .catch(error => console.error('Error updating entry:', error));
    }
    else {
      console.log('No entry found for user:', userId);
      alert('No entry found for this user.');
    }
  })
  .catch(error => console.error('Error fetching entry:', error));

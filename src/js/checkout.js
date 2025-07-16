import { baseApiUrl, checkoutForm } from './variables.js'; // Import the base API URL
import {mailSearch} from './mail_search.js'; // Import the mail search functionality


//need to add an event or a link to enable script execution
checkoutForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  //get user mail and search for user ID
  const mail = checkoutForm.querySelector('#mail').value;
  try {
    const fetchedData = await mailSearch(mail);
    const currentTime = new Date().toLocaleTimeString([], {timeStyle: 'short'});
  
    //then get entry by user ID
  let filter = `?filter={"visitor._id":"${fetchedData._id}"}`;
  
  let apiUrl = baseApiUrl + "item/entries"+filter; // API URL for entry finding
  
  fetch(apiUrl , {//get entry ID by user ID
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Entry data:', data);
      console.log('Entry data length:', data.length);
      if (data) {
        const entryId = data._id; // Get the entry ID from the fetched data
        console.log('Entry found:', data);
        // Update the entry with the departure time
        apiUrl = baseApiUrl + "item/entries";
        fetch(apiUrl, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
          body:  JSON.stringify({
            "data": {
              "_id": entryId,
              "departure": currentTime, // Set the departure time
            }
          })
        })
        .then(response => response.json())
        .then(updatedEntry => {
          alert(`Check-out successful for user ID: ${fetchedData._id} at ${currentTime}`);
        })
        .catch(error => console.error('Error updating entry:', error));
      }
      else {
        console.log('No entry found for user:', fetchedData._id);
        alert('No entry found for this user.');
      }
    })
    .catch(error => console.error('Error fetching entry:', error));
  } catch (error) {
    console.error('Error fetching user:', error);
  }
})

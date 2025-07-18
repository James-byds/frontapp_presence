import { generateLabel } from './printlabel.js';
import { checkinForm, baseApiUrl } from './variables.js';

document.addEventListener('DOMContentLoaded', () => {
//console.log('checkin.js loaded'); debug
//dynamic select options
      // This script will dynamically populate the upper select element
      //global variable
      //console.log('checkinForm', checkinForm);
      const typeOfVisitSelect = checkinForm.querySelector('#typeOfVisit');
      //console.log(typeOfVisitSelect);
      let typeOfVisit = typeOfVisitSelect.value;
      const choiceOfVisitSelect = checkinForm.querySelector('#choiceOfVisit');
      let userId = null;
      
      //CARE TO ADD ITEMS OR ITEM DEPENDING ON USAGE (items for multiple get, item for single get or post)
      let apiUrl = baseApiUrl+"items/"+typeOfVisit; // Replace with your API URL

      typeOfVisitSelect.addEventListener('change', function() { 
       choiceOfVisitSelect.innerHTML = ''; // Clear previous options
        //fetch api data based on typeOfVisitSelect value
        typeOfVisit = typeOfVisitSelect.value;//formations or staff
        apiUrl = baseApiUrl+"items/"+typeOfVisit; // Update API URL based on selection
         // Fetch data from the API
        //console.log('Fetching data from:', apiUrl);
        //correct until here

         fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Assuming data is an array of visit objects
            data.forEach(visit => {
              const option = document.createElement('option');
              option.value = visit._id;
              option.textContent = typeOfVisit === 'formations' ? visit.subject + " - " + visit.name : visit.name + " " + visit.firstname; // Adjust based on typeOfVisit
              choiceOfVisitSelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error fetching visits:', error));
      });
      typeOfVisitSelect.dispatchEvent(new Event('change'));// Trigger change event on page load

//create new user and entry checkin
    //api send data
    checkinForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      const formData = new FormData(checkinForm);
      const data = Object.fromEntries(formData.entries());
      const choice =  data.choiceOfVisit;
      const type = data.typeOfVisit;

      console.log('Choice:', choice);
      console.log(data);

      const user = {//data sent to api user model
        "data": {
          firstname: data.firstname,
          lastname: data.lastname,
          mail: data.email
        }
      };
      //console.log('User data:', user);
      //check if user already exists
      let apiUrl = baseApiUrl+"item/users?filter={'mail':'"+data.email+"'}";

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            console.log('User already exists:', data[0]);
            userId = data[0]._id; // Pass user ID
          }
        })
        .catch(error => console.error('Error fetching user:', error));

        //ready for post sending
      apiUrl = baseApiUrl+"item/users";
      if (userId!=null) {
        apiUrl += "/" + userId;
      }
      //console.log('Sending data to:', apiUrl);
      fetch(apiUrl, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        //check if user already exists
        .then(data => {
          if (data.error) {
            console.log('Error creating user:', data.error);
            return; // Stop further processing if user already exists
          }
          // If user creation is successful, proceed with the rest of the logic
          console.log('User created successfully:', data);
           // Now proceed to create the entry
          userId = data._id; // Pass user ID
          console.log('User ID:', userId);
          console.log("sent data", JSON.stringify(user));

          const today = new Date()//get checkin time
          //get current date in format dd/mm/yyyy
          //getcurrent hh:mm
          const currentTime = today.toLocaleTimeString(
            'fr-FR', // French locale
            { hour: '2-digit', minute: '2-digit' }
          );
          const day = today.toLocaleDateString(
            'fr-FR', // French locale
            { year: 'numeric', month: '2-digit', day: '2-digit' }
          );
          const entry_type = type==="formations" ? "Formation" : "Visit"; // Set the entry type
          const entry = {
            "data": {//data sent to api entry model
              "entry_type": entry_type, // "Visit" or "Formation"
              "motif": {
                "visit": {
                  "_model": type, // Reference to the selected model
                  "_id": choice
                }
              },
              "date": day, //date in dd/mm/yyyy format
              "arrival": currentTime, //hour of arrival
              "visitor": {
                "_model": "users", // Reference to the user model
                "_id": userId // Reference to the user ID
              }
            }
          };

          apiUrl = baseApiUrl + "item/entries"; // Replace with your API URL
          console.log('Sending data to:', apiUrl);
          console.log('Data entry:', entry);
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              console.log("sent data", JSON.stringify(entry));
              alert('Check-in successful!');

              //select the option text content
              const selectedOption = choiceOfVisitSelect.options[choiceOfVisitSelect.selectedIndex].textContent;
              const local = data.local ? data.local : "N/A"; // Handle local if it exists, otherwise set to "N/A"

              generateLabel(user.data, entry.data, selectedOption);
              checkinForm.reset(); // Reset the form after successful submission
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Check-in failed. Please try again.');
            });
        })
        .catch((error) => {
          console.log(JSON.stringify(user));
          console.error('Error:', error);
          alert('Creating a user failed. Please try again.');
        });


      
    });
  });

import { mailform, baseApiUrl } from './variables.js'; // Import the mailform variable
let userId = null; // Variable to store user ID
mailform.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  const mail = mailform.querySelector('#mail').value;

  // Construct the API URL for searching by email
  const apiUrl = `${baseApiUrl}items/users?filter={mail:"${mail}"}`;

  // Fetch data from the API
  fetch(apiUrl, {
    method: 'GET',
    headers: {  
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        // Handle the case where user is found
        console.log('User found:', data[0]);
        alert(`User found: ${data[0].firstname} ${data[0].lastname}`);
        //populate the form with user data
        const form = document.querySelector('#checkin');
        form.querySelector('#firstname').value = data[0].firstname;
        form.querySelector('#lastname').value = data[0].lastname;
        form.querySelector('#email').value = data[0].mail;
        userId= data[0]._id; // Store user ID for further processing
      } else {
        // Handle the case where no user is found
        alert('No user found with that email.');
        console.log('mail: ', mail);
      }
    })
    .catch(error => console.error('Error fetching user:', error));
});

export { userId }; // Export userId for use in other modules
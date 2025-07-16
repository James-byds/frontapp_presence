import { mailForm, baseApiUrl } from './variables.js'; // Import the mailForm variable
let userId = null; // Variable to store user ID

const mailSearch = (mail) => {
   // Construct the API URL for searching by email
  const apiUrl = `${baseApiUrl}items/users?filter={mail:"${mail}"}`;

  // Fetch data from the API
  return fetch(apiUrl, {
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
        userId= data[0]._id; // Store user ID for further processing
        return data[0];
      } else {
        // Handle the case where no user is found
        alert('No user found with that email.');
        console.log('mail: ', mail);
        return null;
      }
    })
    .catch(error => console.error('Error fetching user:', error));
}

mailForm.addEventListener('submit', async function(event) {//populate the form with user data
  event.preventDefault(); // Prevent the default form submission
  const mail = mailForm.querySelector('#mail').value;
  // Fetch data from the API
  try {
    const fetchedData = await mailSearch(mail);
    console.log('userId', userId);
    console.log('fetchedData', fetchedData);
    //populate the form with user data
    const form = document.querySelector('#checkin');
    form.querySelector('#firstname').value = fetchedData.firstname;
    form.querySelector('#lastname').value = fetchedData.lastname;
    form.querySelector('#email').value = fetchedData.mail;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
});

export { mailSearch }; // Export mailSearch function for use in other modules
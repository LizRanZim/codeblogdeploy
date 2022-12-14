//from 14-24 

const loginFormHandler = async (event) => {
  // Stops the page from refreshing after you enter user and pw, you'll lose the data if you don't event prevent default so the front end won't show
  event.preventDefault();


  // Gets the email and pw fields and trimmed to remove space at the end
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Sends login data to data to the back end to attempt to login
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
}
};




document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);


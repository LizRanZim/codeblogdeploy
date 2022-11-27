const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
  
  
  // checks to see if user, email, and password entered
    if (user_name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
  
      });
  console.log(response)
      if (response.ok) {
       
          // Sends login data to the back end to attempt to login
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
    }
  };

  document
  .querySelector('#signup-btn')
  .addEventListener('click', signupFormHandler);

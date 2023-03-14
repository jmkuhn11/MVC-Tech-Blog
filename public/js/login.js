const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
      //document.getElementById("test").innerHTML = "<font color='red'>SUCCESS!<font/>";
    } else {
      alert(response.statusText);
    }
  }
};

 document
   .querySelector('.login-form')
   .addEventListener('submit', loginFormHandler);


  const signup = async () => {
    document.location.replace('/signup');
  };
  
  document.querySelector('#signup').addEventListener('click', signup);
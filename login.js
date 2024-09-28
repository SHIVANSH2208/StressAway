loginButton.addEventListener("click", () => {
    const emailInput = document.getElementById("loginEmail").value.trim();
    const passwordInput = document.getElementById("loginPassword").value.trim();
  
    if (emailInput === "" || passwordInput === "") {
      const emptyFieldsAlert = document.getElementById("emptyFieldsAlert");
      emptyFieldsAlert.style.display = "block";
      setTimeout(() => {
        emptyFieldsAlert.style.display = "none";
      }, 3000);
    } else {
      // Send login data to the backend
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message.includes("Welcome")) {
          alert(data.message);  // Handle login success
          // Optionally redirect the user to the homepage or dashboard
        } else {
          alert(data.message);  // Handle login failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });
  
  signupButton.addEventListener("click", () => {
    const usernameInput = document.getElementById("signupUsername").value.trim();
    const emailInput = document.getElementById("signupEmail").value.trim();
    const passwordInput = document.getElementById("signupPassword").value.trim();
  
    if (usernameInput === "" || emailInput === "" || passwordInput === "") {
      const emptyFieldsAlert = document.getElementById("emptyFieldsAlert");
      emptyFieldsAlert.style.display = "block";
      setTimeout(() => {
        emptyFieldsAlert.style.display = "none";
      }, 3000);
    } else {
      // Send registration data to the backend
      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          email: emailInput,
          password: passwordInput,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "User registered successfully") {
          alert(data.message);  // Handle registration success
          // Optionally redirect the user to the login page
        } else {
          alert(data.message);  // Handle registration failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });
  
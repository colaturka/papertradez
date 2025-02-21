document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html"; // Redirect after registration
    } else {
      alert(data.error);
    }
  });
  
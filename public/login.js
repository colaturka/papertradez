
 document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "dashboard"; // Redirect after login
    } else {
      alert(data.error);
    }
  });
  
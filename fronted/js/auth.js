const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
      "https://newslens-backend-rk90.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    alert(data.message);

    if (data.message === "Login Successful") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user_id,
          name: data.name,
        }),
      );

      window.location.href = "/home.html";
    }
  });
}
// REGISTER

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const registerBtn = document.getElementById("registerBtn");
  const registerText = document.getElementById("registerText");
  const registerSpinner = document.getElementById("registerSpinner");

  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Show Spinner
    registerBtn.disabled = true;
    registerText.style.display = "none";
    registerSpinner.style.display = "inline-block";

    try {
      const response = await fetch(
        "https://newslens-backend-rk90.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullname,
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (data.message === "User Registered Successfully") {
        alert("Registration Successful 🎉");

        window.location.href = "/index.html";
      } else {
        alert(data.message);

        // Restore button
        registerBtn.disabled = false;
        registerText.style.display = "inline";
        registerSpinner.style.display = "none";
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");

      // Restore button
      registerBtn.disabled = false;
      registerText.style.display = "inline";
      registerSpinner.style.display = "none";
    }
  });
}
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch(
      "https://newslens-backend-rk90.onrender.com/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          new_password: newPassword,
        }),
      },
    );

    const data = await response.json();

    alert(data.message);
  });
}

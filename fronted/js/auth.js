const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

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

      window.location.href = "/";
    }
  });
}
// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
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

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.message === "User Registered Successfully") {
        alert("Registration Successful 🎉");

        window.location.href = "/login-page";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  });
}
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    alert(data.message);
  });
}

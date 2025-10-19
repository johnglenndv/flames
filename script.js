const API_BASE = "https://flames-8mk6.onrender.com";

function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

async function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    role: form.role.value
  };

  const res = await fetch("${API_BASE}/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert(await res.text());
    window.location.href = "index.html"; // back to login after registration
  } else {
    alert(await res.text());
  }
}

async function loginUser(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    email: form.email.value,
    password: form.password.value
  };

  const res = await fetch("${API_BASE}/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const user = await res.json();
    alert(`Welcome, ${user.name}!`);

    // Save user info (optional — to show in profile)
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Redirect to profile page
    window.location.href = "profile.html";
  } else {
    const error = await res.text();
    alert(error);
  }
}

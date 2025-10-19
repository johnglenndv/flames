const API_BASE = "https://flames-server.onrender.com";

function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

async function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    username: form.username.value,
    password: form.password.value,
    node_id: form.node_id.value
  };

  const res = await fetch("https://flames-server.onrender.com/register", {
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
    username: form.username.value,
    password: form.password.value
  };

  const res = await fetch("https://flames-server.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const user = await res.json();

    // Save user info (optional — to show in profile)
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Mark user as logged in
    localStorage.setItem("loggedIn", "true");

    // ✅ Redirect to profile page
    const url = new URL("flames/dashnode.html", window.location.origin);
    url.searchParams.set("node_id", user.node_id);
    window.location.href = url;

  } else {
    const error = await res.text();
    alert(error);
  }
}

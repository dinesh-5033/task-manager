const API = "https://task-manager-api-maiu.onrender.com/api/tasks";
const AUTH = "https://task-manager-api-maiu.onrender.com/api/auth";

let token = localStorage.getItem("token");

// ---------------- AUTH ----------------

async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  document.getElementById("authMsg").innerText = data.message;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    token = data.token;

    document.getElementById("authBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    loadTasks();
  }
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// ---------------- TASKS ----------------

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  document.getElementById("taskList").innerHTML =
    tasks.map(t => `
      <li>
        ${t.title}
        <button onclick="deleteTask('${t._id}')">❌</button>
      </li>
    `).join("");
}

async function addTask() {
  const title = document.getElementById("title").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ title })
  });

  document.getElementById("title").value = "";
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { "Authorization": token }
  });

  loadTasks();
}

// INIT
document.getElementById("addBtn").addEventListener("click", addTask);

if (token) {
  document.getElementById("authBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  loadTasks();
}
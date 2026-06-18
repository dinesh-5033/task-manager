const API = "https://task-manager-api-maiu.onrender.com/api/tasks";

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  document.getElementById("taskList").innerHTML =
    tasks.map(t => `<li>${t.title}</li>`).join("");
}

async function addTask() {
  const title = document.getElementById("title").value;

  if (!title) return alert("Enter task first");

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  loadTasks();
}

loadTasks();
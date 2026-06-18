const API = "https://task-manager-api-maiu.onrender.com/api/tasks";

// LOAD TASKS
async function loadTasks() {
  try {
    const res = await fetch(API);
    const tasks = await res.json();

    document.getElementById("taskList").innerHTML =
      tasks.map(task => `
        <li>
          <span>${task.title}</span>
          <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
        </li>
      `).join("");

  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

// ADD TASK
async function addTask() {
  const title = document.getElementById("title").value.trim();

  if (!title) {
    alert("Please enter a task");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  document.getElementById("title").value = "";
  loadTasks();
}

// DELETE TASK
async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// EVENTS
document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("title").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// INIT
loadTasks();
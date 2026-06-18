const API = "https://task-manager-api-maiu.onrender.com/api/tasks";

// Load tasks
async function loadTasks() {
  try {
    const res = await fetch(API);
    const tasks = await res.json();

    document.getElementById("taskList").innerHTML =
      tasks.map(t => `<li>${t.title}</li>`).join("");

  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

// Add task
async function addTask() {
  const title = document.getElementById("title").value;

  if (!title) {
    alert("Enter task first");
    return;
  }

  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    document.getElementById("title").value = "";
    loadTasks();

  } catch (err) {
    console.error("Error adding task:", err);
  }
}

// Button event listener (IMPORTANT FIX)
document.getElementById("addBtn").addEventListener("click", addTask);

// Initial load
loadTasks();
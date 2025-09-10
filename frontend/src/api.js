const API_URL = "http://localhost:5000/api";

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks/`);
  return res.json();
}

export async function addTask(title) {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function updateTask(id, title) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  return res.json();
}

export async function fetchComments(taskId) {
  const res = await fetch(`${API_URL}/comments/${taskId}`);
  return res.json();
}

export async function addComment(taskId, content) {
  const res = await fetch(`${API_URL}/comments/${taskId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function updateComment(id, content) {
  const res = await fetch(`${API_URL}/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function deleteComment(id) {
  const res = await fetch(`${API_URL}/comments/${id}`, { method: "DELETE" });
  return res.json();
}

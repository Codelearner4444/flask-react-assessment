/* TaskList component code */ import React, {
  useEffect,
  useState,
} from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api";
import CommentSection from "./CommentSection";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    const t = await addTask(newTask);
    setTasks([...tasks, t]);
    setNewTask("");
  };

  const handleUpdate = async (id, title) => {
    const updated = await updateTask(id, title);
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              value={t.title}
              onChange={(e) => handleUpdate(t.id, e.target.value)}
            />
            <button onClick={() => handleDelete(t.id)}>Delete</button>
            <CommentSection taskId={t.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import '../css/all.css';
import api from '../api';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/allTask", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
  }
};

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="all-page">
      <div className="all-container">
        <h1>All Tasks</h1>
        {tasks.length === 0 ? (
          <p>No tasks available! 🎉</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id}>
                <span>
                  {task.title} (Due: {task.dueDate.split("T")[0]})
                  {/* {task.completed ? " ✅ Completed" : " ❌ Pending"} */}
                </span>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

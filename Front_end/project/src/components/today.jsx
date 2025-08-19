import React, { useEffect, useState } from 'react';


import '../css/today.css';
import API from '../api';


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Today1() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(formatDate(new Date()));
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const today = formatDate(new Date());

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await API.get('/todaytask');
        setTasks(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await API.post('/add', { title: newTitle, dueDate: newDate });
      setTasks([...tasks, res.data]);
      setNewTitle('');
      setNewDate(today);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
  };

  const handleEditKeyDown = async (e, id) => {
    if (e.key === 'Enter') {
      try {
        const res = await API.patch(`/${id}`, { title: editedTitle });
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        setEditingId(null);
        setEditedTitle('');
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  };

  return (
    <div className='today1-page'>
      <div className='today1-container'>
        <h1>Today's Tasks</h1>

        <div className='task-input'>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task title" />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} min={today} />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul className='task-list'>
          {tasks.map((task) => (
            <li key={task._id}>
              {editingId === task._id ? (
                <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} onKeyDown={(e) => handleEditKeyDown(e, task._id)} autoFocus />
              ) : (
                <span>{task.title} (Due: {task.dueDate.split("T")[0]})</span>
              )}
              <div>
                <button onClick={() => startEditing(task._id, task.title)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

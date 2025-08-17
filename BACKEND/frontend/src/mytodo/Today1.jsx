import React, { useEffect, useState } from 'react';
import './today1.css';

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

    // Fetch today's tasks from backend
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch('https://your-api-url.com/tasks?dueDate=' + today);
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, [today]);

    const addTask = async () => {
        if (!newTitle.trim()) return;
        const taskToAdd = { title: newTitle, dueDate: newDate, completed: false };

        try {
            const response = await fetch('https://your-api-url.com/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskToAdd),
            });
            if (!response.ok) throw new Error('Failed to add task');
            const createdTask = await response.json();
            setTasks([...tasks, createdTask]);
            setNewTitle('');
            setNewDate(today);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://your-api-url.com/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const startEditing = (id, currentTitle) => {
        setEditingId(id);
        setEditedTitle(currentTitle);
    };

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditKeyDown = async (e, id) => {
        if (e.key === 'Enter') {
            try {
                const response = await fetch(`https://your-api-url.com/tasks/${id}`, {
                    method: 'PUT', // or PATCH depending on your API
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: editedTitle }),
                });
                if (!response.ok) throw new Error('Failed to update task');
                const updatedTask = await response.json();
                setTasks(tasks.map(task => task.id === id ? updatedTask : task));
                setEditingId(null);
                setEditedTitle('');
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    return (
        <div className='today1-page'>
            <div className='today1-container'>
                <h1>Today's Tasks</h1>

                <div className='task-input'>
                    <input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="Task title"
                        className="task-input-title"
                    />
                    <input
                        type="date"
                        value={newDate}
                        onChange={e => setNewDate(e.target.value)}
                        min={today}
                        className="task-input-date"
                    />
                    <button onClick={addTask}>Add Task</button>
                </div>

                <ul className='task-list'>
                    {tasks.length === 0 && <li>No tasks for today.</li>}
                    {tasks.map(task => (
                        <li key={task.id} className='task-item'>
                            {editingId === task.id ? (
                                <input
                                    value={editedTitle}
                                    onChange={handleEditChange}
                                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                                    className="edit-task-input"
                                    autoFocus
                                />
                            ) : (
                                <span>{task.title} (Due: {task.dueDate})</span>
                            )}
                            <div className="task-buttons">
                                <button onClick={() => startEditing(task.id, task.title)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

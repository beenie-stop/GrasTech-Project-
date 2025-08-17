import React, { useEffect, useState } from 'react';
import '../css/all.css';
import axios from 'axios';

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

    const today = formatDate(new Date());

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/allTask');  // Replace with actual API URL
                if (!response.ok) throw new Error('Failed to fetch tasks-under construction');
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, []);


    const overdueTasks = tasks.filter(
        (task) => task.dueDate < today && task.completed === false
    );

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://your-api-url.com/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            // Remove from state
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (err) {
            alert(`Error deleting task: ${err.message}`);
        }
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="all-page">
            <div className="all-container">
                <h1>All Due Tasks</h1>
                {overdueTasks.length === 0 ? (
                    <p>No due tasks! 🎉</p>
                ) : (
                    <ul className="task-list">
                        {overdueTasks.map((task) => (
                            <li key={task.id}>
                                <span>
                                    {task.title} (Due: {task.dueDate})
                                </span>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

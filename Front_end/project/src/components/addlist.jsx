import React, { useState } from 'react';
import '../css/addlist.css';

export default function AddList() {
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState('');

    function addList() {
        if (listName.trim() === '') {
            alert('Please enter a list name');
            return;
        }
        setLists([...lists, listName.trim()]);
        setListName('');
    }

    function deleteList(index) {
        const updatedList = lists.filter((_, i) => i !== index);
        setLists(updatedList);
        if (editIndex === index) {
            setEditIndex(null);
            setEditedName('');
        }
    }

    function startEditing(index) {
        setEditIndex(index);
        setEditedName(lists[index]);
    }

    function saveEdit(index) {
        if (editedName.trim() !== '') {
            const updatedList = [...lists];
            updatedList[index] = editedName.trim();
            setLists(updatedList);
        }
        setEditIndex(null);
        setEditedName('');
    }

    function handleEditKeyDown(e, index) {
        if (e.key === 'Enter') {
            saveEdit(index);
        }
    }

    return (
       
        <div className="addlist-page">
            <div className="addlist-container">
                <h2>Add List</h2>
                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Enter list"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <button onClick={addList}>Add List</button>
                </div>

                <h3>Your Lists</h3>
                <ul className="list-items">
                    {lists.length === 0 && <li>No lists yet.</li>}
                    {lists.map((list, index) => (
                        <li key={index}>
                            <input type="checkbox" />
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyDown(e, index)}
                                    autoFocus
                                    className="edit-input"
                                />
                            ) : (
                                <span>{list}</span>
                            )}

                            <div className="action-buttons">
                                <button
                                    className="edit-btn"
                                    onClick={() => startEditing(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteList(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

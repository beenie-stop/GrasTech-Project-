import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Header from './Header';
import '../css/todo.css'
export default function Todo() {
    const navigate = useNavigate();

    return (
        <div className='todo-page'>
            <Header />
            <div style={{ marginTop: '40px' }}></div>
            <div className='center-box'>
                <h2>Hii friend!!</h2>

                <div className='button-container'>
                    <button className='button' onClick={() => navigate('/Today')}>Today</button>
                    <button className='button' onClick={() => navigate('/Affirmation')}>Affirmation</button>
                    <button className='button' onClick={() => navigate('/All')}>All Due Task<br/>Will only show due-task</button>
                </div>
            </div>
            <Link to='/Addlist' className='list'>Add list</Link>
        </div>
    );
}

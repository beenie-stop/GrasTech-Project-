import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        if (!firstname || !lastname || !email || !password) {
            alert("Form is blank");
        } else {
            alert("Form submitted successfully");
            navigate('/todo');
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Create New Account</h1>
                <form onSubmit={submitHandler}>
                    <label>Firstname:</label>
                    <input
                        type="text"
                        placeholder="Enter your firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />

                    <label>Lastname:</label>
                    <input
                        type="text"
                        placeholder="Enter your lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Create Account</button>
                </form>
            </div>
        </div>
    );
}

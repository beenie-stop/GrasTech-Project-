import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/register.css';

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        if (!firstname || !lastname || !email || !password) {
            alert("Form is blank");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                firstname,
                lastname,
                email,
                password
            });

            if (response.status === 200 || response.status === 201) {
                alert("Registration successful!");
                navigate('/signin'); 
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert("Server error. Please try again later.");
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

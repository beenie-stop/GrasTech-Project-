import { useState } from 'react'
import Nav from './Nav'
import './signup.css';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault()
        if (email == "" || password == "") {
            alert("form is blank")
        } else {
            alert("form submitted succesfully")
            navigate('/Todo')
        }
        setEmail('')
        setPassword('')
    }
    return (
        <>
            <div className='signup-container'>
                <div className='leftside'>

                </div>
                <div className='rightside'>
                    <div className='form'>
                        <h1>Sign  In</h1>
                        <form onSubmit={submitHandler}>
                            <h2>Email:</h2>
                            <input type="text"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} >
                            </input>
                            <h2>Password:</h2>
                            <input type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} >
                            </input>
                            <br></br>
                            <br></br>
                            <button type='submit'>Submit</button>
                        </form>
                        <h3>Don't have an account?<Nav /></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

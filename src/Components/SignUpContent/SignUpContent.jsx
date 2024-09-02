import React, { useState } from 'react';
import './SignUpContent.css';
import { useNavigate } from 'react-router-dom';

export const Content = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setAgainPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, username, password, confirmPassword }
        console.log(user)
        fetch("http://localhost:9091/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then(response => {
            if (response.ok) {
                console.log('User registered successfully');
                return fetch("http://localhost:9091/validation", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
            } else {
                throw new Error('Email or username already exists!')
            }
        }).then(response => {
            if (response.ok) {
                console.log('Validation code sent successfully');
                navigate('/codeemail');
            } else {
                throw new Error('Failed to send validation code');
            }
        }).catch(error => {
            setErrorMessage(error.message);
        });
    }

    return (
        <main className='sign-up-main'>
            <div className="bg-image"></div>
            <div className="component-2">
                <img src="img/ico/Lock.png" alt="img" />
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <input type="email" name='email' placeholder="Email address" onChange={e => setEmail(e.target.value)} required/>
                    <input type="text" name='username' placeholder="Username" onChange={e => setUsername(e.target.value)} required/>
                    <input type="password" name='password' placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                    <input type="password" name='confirmPassword' placeholder="Confirm password" onChange={e => setAgainPassword(e.target.value)} required/>
                    <button type="submit">Sign Up</button>
                </form>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <hr />
                <p className='acc-create-2'>Already have an account? <a href="/#/signin">Sign In!</a></p>
            </div>
        </main>
    )
} 
 
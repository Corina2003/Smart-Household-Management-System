import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInContent.css';

export const Content = () => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user={email, password}
        console.log(user)
        fetch("http://localhost:9091/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then(response=>{
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Email or password is incorrect!')
            }
        }).then(data => {
            localStorage.setItem('jwtToken', data.token);
            console.log(data.token);
            console.log('User logged in successfully');
            navigate('/account');
        }).catch(error => {
            setErrorMessage(error.message);
        });
    }

    return (
        <main className='sign-in-main'>
            <div className="sign-in-bg-image"></div>
            <div className="component-1">
                <img src="img/ico/Lock.png" alt="img" />
                <form className='sign-in-form' onSubmit={handleSubmit}>
                    <input type="email" name='email' placeholder="Email address" onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" name='password' placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                    <button type="submit">Sign In</button>
                </form>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <p className='recover'>Can’t remember your password? <a href="#">Recover It!</a></p>
                <hr />
                <p className='acc-create'>Don’t have an account? <a href="/#/signup">Sign Up!</a></p>
            </div>
        </main>
    )
}
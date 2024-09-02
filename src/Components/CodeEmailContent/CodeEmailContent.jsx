import React, {useState} from 'react';
import './CodeEmailContent.css';
import { useNavigate } from 'react-router-dom';

export const CodeEmail = () => {
    const handleInput = (event) => {
        if (event.target.value.length > 6) {
            event.target.value = event.target.value.slice(0, 6);
        }
    };

    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSumbit = (e) => {
        e.preventDefault();
        const codeObj = {code: code}
        console.log(codeObj)
        fetch("http://localhost:9091/validation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(codeObj)
        }).then(response => {
            if (response.ok) {
                console.log('Code validated successfully');
                navigate('/signin');
            } else {
                throw new Error('Code is incorrect!')
            }
        }).catch(error => {
            setErrorMessage(error.message);
        });
    }

    return (
        <main className='code-email-main'>
            <div className="bg-image-code"></div>
            <div className="component-3">
                <h1>Introduce the code sent in the e-mail</h1>
                <form className='code-email-form' onSubmit={handleSumbit}>
                    <input type="text" name='code' maxLength="6" pattern="\d*" placeholder="Enter 6-digit code" onChange={e => setCode(e.target.value)} required/>
                    <button type="submit">Submit</button>
                </form>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </div>
        </main>
    );
};

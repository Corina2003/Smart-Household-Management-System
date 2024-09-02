import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import './AddHouseholdContent.css';
import { HouseholdContext } from '../../HouseholdContext';

export const Content = () => {
    const token = localStorage.getItem('jwtToken');
    const { addHousehold } = useContext(HouseholdContext);
    const [household, setHousehold] = useState({ 
        name: '', 
        address: '', 
        city: '', 
        country: '', 
        description: '' 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHousehold({ ...household, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //addHousehold(household);
        fetch('http://localhost:9091/api/v1/household/add-house', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(household)
        }).then(response => {
            if (response.ok) {
                console.log('Household added successfully');
                navigate('/household');
            } else {
                throw new Error('Household not added!');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <main>
            <div className="bg-img"></div>
            <div className="profile">
                <div className="content-info">
                    <img className='account-img' src="img/account/account.jpg" alt="account-img" />
                    <p id='name'>Zakur0</p>
                    <p id='role'>Family member</p>
                </div>
                <div className="content-2">
                    <div className="household">
                        <form className='household-form' onSubmit={handleSubmit}>
                            <div className="element e1">
                                <label>Name</label>
                                <input type="text" name="name" value={household.name} onChange={handleChange} placeholder="Zakur0's home" />
                            </div>
                            <div className="element e2">
                                <label>Address</label>
                                <input type="text" name="address" value={household.address} onChange={handleChange} placeholder='Undeva Departe 23 Bloc A' />
                            </div>
                            <div className="element e3">
                                <label>City</label>
                                <input type="text" name="city" value={household.city} onChange={handleChange} placeholder='Nu Iasi' />
                            </div>
                            <div className="element e4">
                                <label>Country</label>
                                <input type="text" name="country" value={household.country} onChange={handleChange} placeholder='Far Far Away' />
                            </div>
                            <div className="element full-width">
                                <textarea name="description" value={household.description} onChange={handleChange} placeholder='Description'></textarea>
                            </div>
                            <div className="buttons">
                                <Button text='Add Household' />
                                <button type="button" onClick={() => navigate('/household')} style={{ backgroundColor: '#969696', color: '#fff' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

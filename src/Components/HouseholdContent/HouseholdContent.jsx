
import { HouseholdContext } from "../../HouseholdContext";
import { Button } from "../Button/Button";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HouseholdContent = () => {
    const [user, setUser] = useState(null);
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [oldPassword, setOldPassword] = useState('');
    // const [password, setpassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    const { households } = useContext(HouseholdContext);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('household'); 
    const [household, setHousehold] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9091/account-security", {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
            fetch("http://localhost:9091/api/v1/household/get-house" , {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setHousehold(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleDelete = () => {
        fetch(`http://localhost:9091/api/v1/household/remove-house`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // If the delete was successful, remove the household from the state
            console.log(response);
            setHousehold(null);
        })
        .catch(error => console.error('Error:', error));
    };

    // const handleSumbit = (e) => {
    //     e.preventDefault();
    //     const sendUser = {email, username, password}
    //     const userUpdate = {user: sendUser, oldPassword}
    //     console.log(userUpdate)
    //     fetch("http://localhost:9091/account-security", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify(userUpdate)
    //     }).then(response => {
    //         if (response.ok) {
    //             console.log('User updated succesfully');
    //             localStorage.removeItem('jwtToken');
    //             navigate('/signin');
    //         } else {
    //             throw new Error('The username and mail are already registered or the oldPassword is inccorect!')
    //         }
    //     }).catch(error => {
    //         setErrorMessage(error.message);
    //     });
    // }

    const handleLogout = (e) => {
        e.preventDefault();
        if (token != null) {
            console.log('User logged out successfully');
            localStorage.removeItem('jwtToken');
            navigate('/signin');
        }
    };

    const handleTabClick = (tab) => {
        if (tab === 'settings') {
            navigate('/account');
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <main>
            <div className="bg-img"></div>
            <div className="profile">
                <div className="content-info">
                    <img className='account-img' src="img/account/account.jpg" alt="account-img" />
                    <p id='name'>{user?.username}</p>
                    <p id='role'>{user?.role}</p>
                    <a href="/#/signin" onClick={handleLogout}><Button text={"Log out"} /></a>
                </div>
                <div className="content-2">
                    <div className="chose">
                        <h4 onClick={() => handleTabClick('settings')}>Account Settings</h4>
                        <h4 onClick={() => handleTabClick('household')}>Household</h4>
                    </div>
                    <hr />
                    {activeTab === 'household' && (
                        <div className="household">
                            {household == null && (
                                <a href="/#/addhousehold"><Button text={"Add new household"} /></a>
                            )}
                            {household &&(
                                <div>
                                <div className="household-item" onClick={() => navigate('/household-manage')}>
                                    <h2>{household?.name}</h2>
                                    {/* <p>{household.address}</p>
                                    <p>{household.city}</p>
                                    <p>{household.country}</p> */}
                                    <p>{household?.description}</p>
                                </div>
                                <Button text="Delete" onClick={handleDelete} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

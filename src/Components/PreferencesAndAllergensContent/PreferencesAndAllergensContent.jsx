import "./PreferencesAndAllergensContent.css";
import { useNavigate } from 'react-router-dom';
import { CheckBox } from "../CheckBox/CheckBox";
import { Button } from "../Button/Button";
import React, { useEffect, useContext, useState} from 'react';

export function PreferencesAndAllergensContent() 
{
    const token = localStorage.getItem('jwtToken');
    //console.log(token);
    const [allergensAndPreferences, setAllergensAndPreferences] = useState({ allergens: [], preferences: [] });
    const [checkedAllergens, setCheckedAllergens] = useState({});
    const [checkedPreferences, setCheckedPreferences] = useState({});

    const allergens = ["Celery", "Mustard", "Milk", "Eggs", "Soy", "Fish", "Gluten", "Nuts", "Peanuts", "Sesame"];
    const preferences = ["Lidl", "Kaufland", "Mega", "Auchan", "Penny", "Carrefour", "Profi", "Dedeman"];

    useEffect(() => {

        if (!token) {
            console.error('Token is missing');
            return;
          }

        fetch("http://localhost:9091/allergenspreferences" , {
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
            setAllergensAndPreferences(data);
            
            // Crearea unei hărți de alergeni și preferințe
            const allergensMap = data.allergens.reduce((map, allergen) => {
                map[allergen] = true; // Setează toți alergenii ca fiind selectați
                return map;
            }, {});
            setCheckedAllergens(allergensMap);

            const preferencesMap = data.preferences.reduce((map, preference) => {
                map[preference] = true; // Setează toate preferințele ca fiind selectate
                return map;
            }, {});
            setCheckedPreferences(preferencesMap);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const navigate = useNavigate();
    const handleSumbit = (e) => {
        console.log('Submit');
        e.preventDefault();
        fetch("http://localhost:9091/allergenspreferences", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                allergens: Object.keys(checkedAllergens).filter(allergen => checkedAllergens[allergen]),
                preferences: Object.keys(checkedPreferences).filter(preference => checkedPreferences[preference])
            })
        }).then(response => {
            if (response.ok) {
                console.log('List updated succesfully');
                navigate('/preferences');
            } else {
                throw new Error('The username and mail are already registered or the oldPassword is inccorect!')
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    const handleAllergenChange = (allergen) => {
        setCheckedAllergens(prevState => ({
            ...prevState,
            [allergen]: !prevState[allergen]
        }));
    };

    const handlePreferenceChange = (preference) => {
        setCheckedPreferences(prevState => ({
            ...prevState,
            [preference]: !prevState[preference]
        }));
    };
    
    return (
        <main>
            <div className="alergy-list">
                <h2>List of Allergies</h2><br />
                <div className="list">
                {allergens.map(allergen => (
                        <CheckBox 
                            key={allergen} 
                            label={allergen} 
                            name={allergen} 
                            checked={!!checkedAllergens[allergen]}
                            onChange={() => handleAllergenChange(allergen)} 
                        />
                    ))}
                </div>
            </div>

            <div className="shop-preference-list">
                <h2>Shop Preference</h2>
                <div className="list">
                {preferences.map(preference => (
                        <CheckBox 
                            key={preference} 
                            label={preference} 
                            name={preference} 
                            checked={!!checkedPreferences[preference]}
                            onChange={() => handlePreferenceChange(preference)} 
                        />
                    ))}
                </div>
            </div>

            <div className="pref-btn">
                <Button text="Save Preferences" onClick={handleSumbit}/>
            </div>   

        </main>
    );
}
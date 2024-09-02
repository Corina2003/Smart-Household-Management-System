import React, { createContext, useState } from 'react';

export const HouseholdContext = createContext();

export const HouseholdProvider = ({ children }) => {
    const [households, setHouseholds] = useState([]);

    const addHousehold = (household) => {
        setHouseholds([...households, household]);
    };

    return (
        <HouseholdContext.Provider value={{ households, addHousehold }}>
            {children}
        </HouseholdContext.Provider>
    );
};

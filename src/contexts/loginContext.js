import React, { createContext, useContext, useState } from 'react';

// Create the context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to toggle the login status
    const toggleLoginStatus = () => {
        setIsLoggedIn((prevStatus) => !prevStatus);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, toggleLoginStatus }}>
            {children}
        </LoginContext.Provider>
    );
};

// Create a hook to use the context
export const useLoginContext = () => {
    return useContext(LoginContext);
};
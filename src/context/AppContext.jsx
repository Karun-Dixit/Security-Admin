
import { createContext, useEffect, useState } from "react";
import csrfService from '../services/csrfService';


export const AppContext = createContext()


const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Loading and auth state
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    // On mount: fetch CSRF token and check auth persistence
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                await csrfService.getCSRFToken(backendUrl);
                // Optionally, check auth by pinging a protected endpoint
                // For now, assume if CSRF fetch works, user is authenticated
                setIsAuthenticated(true);
            } catch (e) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [backendUrl]);

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
        loading,
        isAuthenticated,
        setIsAuthenticated,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect } from 'react';

// Functional component for user logout
export default function Logout() {

    // Access user context to manage user state
    const { unsetUser, setUser } = useContext(UserContext);

    // Unset user state on logout
    unsetUser();

    // Reset user state upon component mount
    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null
        });
    }, []);

    // Render redirection to login page after logout
    return (
        <Navigate to='/login'/>
    );
}

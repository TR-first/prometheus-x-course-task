import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOutButton() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('username');
        navigate('/signin');
    };

    return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOutButton;
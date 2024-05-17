// src/components/UserInfo.js
import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    {/* Add more user information here */}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserInfo;

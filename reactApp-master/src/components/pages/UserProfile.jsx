import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserProfile = ({ user }) => {
    const [editableUser, setEditableUser] = useState(user={
        userName:"",
        email:"",
        mobileNo:""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({ ...editableUser, [name]: value });
    };

    const handleUpdateProfile = () => {
        // Handle the update logic here, e.g., make an API request to update the user data.
        // You can use the editableUser state to send updated data to the server.
        // After a successful update, you can update the user state with the new data.

        // For demonstration purposes, we'll simply log the updated user data here.
        console.log('Updated User Data:', editableUser);
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form>
                <TextField
                    name="userName"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={editableUser.userName}
                    onChange={handleInputChange}
                />
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={editableUser.email}
                    onChange={handleInputChange}
                />
                <TextField
                    name="mobileNo"
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    value={editableUser.mobileNo}
                    onChange={handleInputChange}
                />
                {/* Add more input fields for other user data */}
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                    Update Profile
                </Button>
            </form>
        </div>
    );
};

export default UserProfile;

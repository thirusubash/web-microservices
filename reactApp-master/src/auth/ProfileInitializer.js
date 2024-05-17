import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@redux/actions/authActions';
import userApi from '@api/userApi';
import AuthService from '@auth/AuthService';

const ProfileInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            if (AuthService.isAuthenticated()) {
                try {
                    const userId = AuthService.getUserId();
                    const userProfile = await userApi.getUserData(userId);
                    console.log("Auth service:", userProfile);
                    dispatch(loginSuccess(userProfile));
                } catch (error) {
                    console.error("user not login yet ", error);
                }
            }
        };

        initializeAuth();
    }, [dispatch]);

    return null; // This component doesn't render anything
};

export default ProfileInitializer;

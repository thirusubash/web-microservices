import React, { useEffect } from 'react';
import { Typography, Container } from '@mui/material';

const NotificationReader = () => {
    useEffect(() => {
        const showNotification = async () => {
            try {
                // Check if the browser supports the Notification API
                if (!('Notification' in window)) {
                    console.log('Notifications are not supported in this browser.');
                    return;
                }

                // Request permission to display notifications
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    // If permission is granted, show the notification
                    const notificationOptions = {
                        body: 'This is a notification from your React app!',
                        icon: 'path/to/notification-icon.png', // You can set a custom icon for the notification
                    };

                    new Notification('React App Notification', notificationOptions);
                } else {
                    console.log('Permission for notifications denied by the user.');
                }
            } catch (error) {
                console.error('Error showing notification:', error);
            }
        };

        showNotification();
    }, []);

    return (
        <Container>
            <Typography variant="body1">
                This component displays a notification (if supported) when mounted.
            </Typography>
        </Container>
    );
};

export default NotificationReader;

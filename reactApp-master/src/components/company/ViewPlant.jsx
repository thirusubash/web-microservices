import React from 'react';
import {
    Typography,
    Divider,
    ListItem,
    List, Container
} from '@mui/material';

const ViewPlant = ({ plantData }) => {
    if (!plantData) {
        return <Typography variant="body1">No plant details available.</Typography>;
    }

    return (
        <Container>

            <Divider />
            <List>
                <ListItem>
                    <Typography variant="body1"><strong>Name:</strong> {plantData.name}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Operational Hours:</strong> {plantData.operationalHours}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Quality Standards:</strong> {plantData.qualityStandards}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Safety Standards:</strong> {plantData.safetyStandards}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Email:</strong> {plantData.email}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Contact Number:</strong> {plantData.contactNumber}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Storage Capacity:</strong> {plantData.storageCapacity}</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1"><strong>Regulations Compliance:</strong> {plantData.regulationsCompliance}</Typography>
                </ListItem>
                {/* Add more fields as needed */}
            </List>
        </Container>
    );
};

export default ViewPlant;

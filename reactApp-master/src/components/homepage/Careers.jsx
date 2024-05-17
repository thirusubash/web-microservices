import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

function Careers() {
    const jobOpenings = [
        {
            id: 1,
            title: 'Front-end Developer',
            location: 'New York',
            description: 'We are looking for a skilled front-end developer with experience in React.',
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            location: 'San Francisco',
            description: 'We are seeking a talented UI/UX designer to create beautiful and intuitive user interfaces.',
        },
        {
            id: 3,
            title: 'Software Engineer',
            location: 'Seattle',
            description: 'Join our software engineering team and contribute to the development of our cutting-edge products.',
        },
    ];

    const handleApply = (jobId) => {
        alert(`You have applied for the job with ID ${jobId}.`);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <Typography variant="h3" component="h4" sx={{ backgroundImage: 'linear-gradient(50deg, red, green)', padding: '10px', color: '#fff', marginBottom: '20px' }}>
                    Job Openings
                </Typography>
                {jobOpenings.map((job) => (
                    <Card key={job.id} sx={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h3" component="h3" style={{ marginBottom: '10px' }}>
                                {job.title}
                            </Typography>
                            <Typography variant="subtitle1" component="p" style={{ marginBottom: '10px' }}>
                                <strong>Location:</strong> {job.location}
                            </Typography>
                            <Typography variant="body1" component="p" style={{ marginBottom: '20px' }}>
                                {job.description}
                            </Typography>
                            <Button variant="contained" onClick={() => handleApply(job.id)} color="primary">
                                Apply
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Careers;

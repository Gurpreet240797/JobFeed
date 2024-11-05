import { Typography, Card, CardContent, CardHeader } from '@mui/material';

export default function Job({job}) {
    return (
        <Card className="job" sx={{ 
                maxWidth: '80%',    
                marginTop: 2,  
                mx: "auto",      
                boxShadow: 1
         }}>
            <CardHeader title={job.title} subheader={job.company} />
            <CardContent>
                <Typography>{job.description}</Typography>
            </CardContent>
        </Card>
    );
}
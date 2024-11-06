import express from 'express';
import Redis from 'ioredis';

const app = express();
const port = 3001;

const redis = new Redis();

// GET /api/jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await redis.get('jobs');

        // Set CORS headers to allow requests from localhost:3000
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.send(jobs);
    } catch (error) {
        console.error('Error fetching jobs from Redis:', error);
        return res.status(500).send('Error fetching jobs');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

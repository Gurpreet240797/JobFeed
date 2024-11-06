import fetch from 'node-fetch';
import Redis from 'ioredis';

const baseURL = 'https://www.themuse.com/api/public/jobs';
const redis = new Redis();

const fetchJobs = async () => {
  try {
    let resultEmpty = false, page = 1;
    let allJobs = [];
    const maxPages = 10;

    while (!resultEmpty && page <= maxPages) {
      const response = await fetch(`${baseURL}?page=${page}`);
      
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Push new jobs to allJobs
      allJobs.push(...data.results);

      // Check if we received any results
      resultEmpty = data.results.length === 0;
      page++;
    }

    // filter algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.levels[0].short_name;
        
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('internship') 
        ) {
            return false
        } 
        return true;
    })

    redis.set("jobs", jrJobs.map(job => JSON.stringify(job)));


    redis.get("jobs", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
});
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

fetchJobs();

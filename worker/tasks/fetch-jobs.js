import fetch from 'node-fetch';
import Redis from 'ioredis';

const baseURL = 'https://www.themuse.com/api/public/jobs';
const redis = new Redis();

const fetchJobs = async () => {
  try {

    console.log("Fetching Jobs...");

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
      const jobTitle = job.levels?.[0]?.short_name || '';
      return !jobTitle.includes('senior') && !jobTitle.includes('internship');
    });


    console.log("Fetching complete !");
    console.log("Storing jobs in Redis...");

    await redis.set("jobs", JSON.stringify(jrJobs));
    
    console.log("Jobs fetched and stored in Redis");
  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    redis.disconnect();
    console.log("Redis connection closed. Exiting process.");
  }
};

fetchJobs();

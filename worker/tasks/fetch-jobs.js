import fetch  from 'node-fetch';

const baseURL = 'https://www.themuse.com/api/public/jobs?page=1';

const fetchJobs = async () => {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export default fetchJobs;
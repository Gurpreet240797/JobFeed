var fetch = require('node-fetch');
var redis = require("redis"), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://www.themuse.com/api/public/jobs';

async function fetchJobs() {

    console.log('fetching jobs');

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    // fetch all pages
    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        onPage++;
    }

    console.log('got', allJobs.length, 'jobs total')

    // filter algo
    const jrJobs = allJobs.filter(job => {
      const jobTitle = job.levels?.[0]?.short_name || '';
      return !jobTitle.includes('senior') && !jobTitle.includes('internship');
    });

    console.log('filtered down to', jrJobs.length);

    // set in redis
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log({success});
}

export default fetchJobs;
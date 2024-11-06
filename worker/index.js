import { CronJob } from 'cron';
import fetchGithub from './tasks/fetch-jobs.js';

const job = new CronJob(
	'* * * * *',
	fetchGithub, 
	null,
	true,
	'America/Los_Angeles'
);

job.start();

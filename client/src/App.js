import { useEffect, useState } from 'react';
import './App.css';
import Jobs from './components/Jobs';

const JOB_API_URL = '/api/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();

  updateCb(json);
}

function App() {
  const [jobList, updateJobs] = useState([]);

  useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
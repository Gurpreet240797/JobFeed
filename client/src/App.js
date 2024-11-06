import './App.css';
import Jobs from './components/Jobs';
import useFetchJobs from './hooks/useFetchJobs';

function App() {
  const { jobs, loading, error } = useFetchJobs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Jobs jobs={jobs} />
    </div>
  );
}

export default App;

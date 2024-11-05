import './App.css';
import Jobs from './components/Jobs';

const mockJobs = [
  {
    'title': 'Software Engineer',
    'company': 'Google',
    'description': 'Work with a team of engineers to build software products.'
  },
  {
    'title': 'Software Engineer',
    'company': 'Microsoft',
    'description': 'Work with a team of engineers to build software products.'
  }
]

function App() {
  return (
    <div className="App"> 
        <Jobs jobs={mockJobs}/>
    </div> 
  );
}

export default App;

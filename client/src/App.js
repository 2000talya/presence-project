import './App.css';
import Router from './routes/Router';
import Copyright from './components/copyright/Copyright';
import GermanyDateTime from './components/time/GermanyDateTime';

function App() {
  return (
    <div className='main-fluid' style={{ paddingTop: '50px', paddingLeft: '50px'}}>
      <GermanyDateTime />
      <Router />
      <Copyright sx={{ marginRight: '10px', marginLeft: '10px' }} />
    </div>
  );
}

export default App;

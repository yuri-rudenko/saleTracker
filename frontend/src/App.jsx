import './styles/style.css';
import Header from './Components/Header';
import StatsBlock from './Components/Stats-Block';

function App() {
  return (
    <div className="App">

      <div className="wrapper">

        <div className='menu'>
            1233
        </div>

        <div className='main'>
            <Header/>
            <div className="body">
              <div className="dashboard">Dashboard</div>
              <div className="stats-blocks">
                <StatsBlock/>
                <StatsBlock/>
                <StatsBlock/>
                <StatsBlock/>
                <StatsBlock/>
              </div>
            </div>
        </div>

      </div>

    </div>
  );
}

export default App;

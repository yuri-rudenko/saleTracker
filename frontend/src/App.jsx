import './styles/style.css';
import './styles/header.css';
import './styles/stats-blocks.css';
import './styles/main-graphs.css';
import './styles/menu.css';
import Header from './Components/Header';
import StatsBlock from './Components/Stats-Block';
import RevenueGraph from './Components/RevenueGraph';
import ViewsGraph from './Components/ViewsGraph';
import RecentOrders from './Components/RecentOrders';
import Menu from './Components/Menu';

function App() {
  return (
    <div className="App">

      <div className="wrapper">

        <div className='menu'>
            <Menu/>
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
              <div className="graphs">
                <RevenueGraph/>
                <ViewsGraph/>
              </div>
              <div className="recent-orders">
                <RecentOrders/>
              </div>
            </div>
        </div>

      </div>

    </div>
  );
}

export default App;

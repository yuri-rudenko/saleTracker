import './styles/style.css';
import './styles/header.css';
import './styles/menu.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Dashboard from './Pages/Dashboard/Dashboard';
import Orders from './Pages/Orders/Orders';
import Items from './Pages/Items/Items';
import Buying from './Pages/Buying/Buying';
import Stats from './Pages/Stats/Stats';

function App() {
  return (
    <Router basename="/">
      <div className="App">

        <div className="wrapper">

          <div className='menu'>
            <Menu />
          </div>

          <div className='main'>
            <Header />

            <div className="body">
              <Routes>

                <Route path='/' element={
                  <Dashboard />
                } />

                <Route path='/orders' element={
                  <Orders />
                } />

                <Route path='/items' element={
                  <Items />
                } />

                <Route path='/buying' element={
                  <Buying />
                } />

                <Route path='/stats' element={
                  <Stats />
                } />

              </Routes>
            </div>
          </div>

        </div>

      </div>
    </Router>
  );
}

export default App;

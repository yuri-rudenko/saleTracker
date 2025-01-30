import './styles/style.css';
import { ReactComponent as Search } from './images/Search.svg';

function App() {
  return (
    <div className="App">

      <div className="wrapper">

        <div className='menu'>
            1233
        </div>

        <div className='main'>
            <div className="header">
              <div className="input">
                <Search className="search-icon"/>
                <input type="text" className="main-search"  placeholder='Search...'></input>
              </div>
            </div>
            <div className="body">
              body
            </div>
        </div>

      </div>

    </div>
  );
}

export default App;

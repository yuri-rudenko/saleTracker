import './styles/style.css';
import { ReactComponent as Search } from './images/Search.svg';
import { ReactComponent as Bell } from './images/Bell.svg';
import { ReactComponent as Arrow } from './images/Arrow.svg';

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
              <div className="right">
                <Bell className="bell-icon"/>
                <div className="user">
                  <img className='profile-picture' height="48px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="" />
                  <b className="name">James Hammet</b>
                  <Arrow className="arrow-icon"/>
                </div>
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

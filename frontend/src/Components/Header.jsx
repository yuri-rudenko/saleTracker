import { ReactComponent as Search } from '../images/Search.svg';
import { ReactComponent as Bell } from '../images/Bell.svg';
import { ReactComponent as Arrow } from '../images/Arrow.svg';

function Header() {
    return (
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
    )
}

export default Header
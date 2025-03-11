import { ReactComponent as Search } from '../images/Search.svg';
import { ReactComponent as Bell } from '../images/Bell.svg';
import { ReactComponent as Arrow } from '../images/Arrow.svg';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useState } from 'react';
import Register from './Popups/Register';

function Header() {

  const user = useSelector(state => state.user);

  const [openReigster, setOpenReigster] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClickOpenRegister = () => {
    setOpenReigster(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenReigster(false);
  };

  return (
    <>
      <Register open={openReigster} onClose={handleClose}/>
      <div className="header">
        <div className="input">
          <Search className="search-icon" />
          <input type="text" className="main-search" placeholder='Search...'></input>
        </div>
        <div className="right">
          <Bell className="bell-icon" />
          {user.isAuth ?
            <div className="user">
              <img className='profile-picture' height="48px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="" />
              <b className="name">{user.user.username}</b>
              <Arrow className="arrow-icon" />
            </div>
            :
            <div className="user">
              <Button onClick={handleClickOpenLogin} variant="outlined">Sign in</Button>
              <Button onClick={handleClickOpenRegister} variant="contained">Sign up</Button>
            </div>

          }
        </div>
      </div>
    </>
  )
}

export default Header
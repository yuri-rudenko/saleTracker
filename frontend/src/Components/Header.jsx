import { ReactComponent as Search } from '../images/Search.svg';
import { ReactComponent as Bell } from '../images/Bell.svg';
import { ReactComponent as Arrow } from '../images/Arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popover, Tooltip, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Register from './Popups/Register';
import { logOut } from '../Store/user/user.slice'
import Login from './Popups/Login.jsx';

function Header() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [openReigster, setOpenReigster] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.getBoundingClientRect().width);
    }
  }, []);

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (elementRef.current) {
      setWidth(elementRef.current.getBoundingClientRect().width);
    }
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [user.isAuth]);

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <>
      <Register open={openReigster} onClose={handleClose} />
      <Login open={openLogin} onClose={handleClose} />
      <div className="header">
        <div className="input">
          <Search className="search-icon" />
          <input type="text" className="main-search" placeholder='Search...'></input>
        </div>
        <div className="right">
          <Bell className="bell-icon" />
          {user.isAuth ?
            <>
              <div style={{ cursor: "pointer" }} ref={elementRef} className="user" onClick={handleClick}>
                <img className='profile-picture' height="48px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="" />
                <b className="name">{user.user.username}</b>
                <Arrow className="arrow-icon" />
              </div>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <Typography width={width} sx={{ p: 1 }}>
                  <Button onClick={handleLogOut} style={{ width: "100%" }} size='large'>Log out</Button>
                </Typography>
              </Popover>
            </>
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
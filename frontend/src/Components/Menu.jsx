import React from 'react';
import { ReactComponent as Logo } from '../images/Logo.svg';
import { ReactComponent as Box } from '../images/Box.svg';
import { ReactComponent as Cart } from '../images/Cart.svg';
import { ReactComponent as Dashboard } from '../images/Dashboard.svg';
import { ReactComponent as Sheet } from '../images/Sheet.svg';
import { ReactComponent as List } from '../images/List.svg';
import { ReactComponent as Arrow } from '../images/GreyArrow.svg';
import { useNavigate } from 'react-router';

const Menu = () => {

    const navigate = useNavigate();
    return (
        <div className='menu-container'>
            <div className="logo">
                <Logo/>
            </div>
            <div className="menu-list">
                <div className="menu-item dashboard" onClick={() => navigate('/')}>
                    <div className="left">
                        <Dashboard/>
                        <div className="menu-item-text">Dashboard</div>
                    </div>
                </div>
                <div className="menu-item orders" onClick={() => navigate('/orders')}>
                    <div className="left">
                        <Cart/>
                        <div className="menu-item-text">Orders</div>
                    </div>
                    <Arrow/>
                </div>
                <div className="menu-item items" onClick={() => navigate('/items')}>
                    <div className="left">
                        <Box/>
                        <div className="menu-item-text">Items</div>
                    </div>
                    <Arrow/>
                </div>
                <div className="menu-item buying" onClick={() => navigate('/buy')}>
                    <div className="left">
                        <List/>
                        <div className="menu-item-text">Buying orders</div>
                    </div>
                    <Arrow/>
                </div>
                <div className="menu-item stats" onClick={() => navigate('/stats')}>
                    <div className="left">
                        <Sheet/>
                        <div className="menu-item-text">Stats</div>
                    </div>
                    <Arrow/>
                </div>
            </div>
        </div>
    );
}

export default Menu;

import React, { useState } from 'react';
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

    const [opened, setOpened] = useState("dashboard");

    const changeActive = (newActive) => {
        if (newActive === "dashboard") {
            navigate("/");
        } else {
            navigate('/' + newActive);
        }
    
        setOpened(newActive); 
    };

    return (
        <div className='menu-container'>
            <div className="logo">
                <Logo style={{cursor: "pointer"}} onClick={() => changeActive("dashboard")}/>
            </div>
            <div className="menu-list">
                <div className={opened === "dashboard"? "menu-item dashboard active-item": "menu-item dashboard"} onClick={() => changeActive("dashboard")}>
                    <div className="left">
                        <Dashboard/>
                        <div className="menu-item-text">Dashboard</div>
                    </div>
                </div>
                <div className={opened === "orders"? "menu-item orders active-item": "menu-item orders"} onClick={() => changeActive("orders")}>
                    <div className="left">
                        <Cart/>
                        <div className="menu-item-text">Orders</div>
                    </div>
                    <Arrow/>
                </div>
                <div className={opened === "items"? "menu-item items active-item": "menu-item items"} onClick={() => changeActive("items")}>
                    <div className="left">
                        <Box/>
                        <div className="menu-item-text">Items</div>
                    </div>
                    <Arrow/>
                </div>
                <div className={opened === "buy"? "menu-item buying active-item": "menu-item buying"} onClick={() => changeActive("buy")}>
                    <div className="left">
                        <List/>
                        <div className="menu-item-text">Buying orders</div>
                    </div>
                    <Arrow/>
                </div>
                <div className={opened === "stats"? "menu-item stats active-item": "menu-item stats"} onClick={() => changeActive("stats")}>
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

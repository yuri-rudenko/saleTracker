import React from 'react';
import './orders.css'
import { ReactComponent as Arrow } from '../../images/GreyArrow.svg';
import Order from './Order';

const Orders = () => {
    return (
        <div className='orders-wrapper'>
            <div className="top">
                <div className="sort-orders">
                    <div className="sort-by">Sort by:</div>
                    <div className="sorting-parameters">
                        <div className="param">
                            <div className="param-text">Date</div>
                            <Arrow />
                        </div>
                        <div className="param">
                            <div className="param-text">Price</div>
                            <Arrow />
                        </div>
                        <div className="param">
                            <div className="param-text">Margin</div>
                            <Arrow />
                        </div>
                        <div className="param">
                            <div className="param-text">Name</div>
                            <Arrow />
                        </div>
                    </div>
                </div>
                <div className="create-order">
                    <div className="create-order-button">Create</div>
                </div>
            </div>
            <div className="orders-container">
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </div>
        </div>
    );
}

export default Orders;

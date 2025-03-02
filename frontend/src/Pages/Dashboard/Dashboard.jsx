import React from 'react';
import './stats-blocks.css';
import './main-graphs.css';
import StatsBlock from '../../Components/Stats-Block';
import RevenueGraph from '../../Components/RevenueGraph';
import ViewsGraph from '../../Components/ViewsGraph';
import RecentOrders from '../../Components/RecentOrders';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const {list: sales, totalRevenue, daysPerOrder} = useSelector(state => state.sales);

    const buys = useSelector(state => state.buys.list);
    const totalSpend = buys.reduce((acc, buy) => acc+=buy.price, 0);

    const products = useSelector(state => state.products.list);
    const totalSpendLeft = products.reduce((acc, prod) => acc+= prod.currentlyAvaliable * prod.averageBuyPriceLeft, 0); 

    return (
        <div>
            <div className="dashboard">

                <div className="dashboard-text">Dashboard</div>
                <div className="stats-blocks">
                    <StatsBlock name={"Total Revenue"} value={totalRevenue + "₴"}/>
                    <StatsBlock name={"Total Sum Spend"} value={totalSpend + "₴"}/>
                    <StatsBlock name={"Current Stock Price"} value={totalSpendLeft + "₴"}/>
                    <StatsBlock name={"Amount of Orders"} value = {sales.length || 0}/>
                    <StatsBlock name={"Average Order Time (30d)"} value={daysPerOrder + "d"} />
                </div>
                <div className="graphs">
                    <RevenueGraph />
                    <ViewsGraph />
                </div>
                <div className="recent-orders">
                    <RecentOrders />
                </div>

            </div>
        </div>
    );
}

export default Dashboard;

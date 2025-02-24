import React from 'react';
import './stats-blocks.css';
import './main-graphs.css';
import StatsBlock from '../../Components/Stats-Block';
import RevenueGraph from '../../Components/RevenueGraph';
import ViewsGraph from '../../Components/ViewsGraph';
import RecentOrders from '../../Components/RecentOrders';

const Dashboard = () => {

    return (
        <div>
            <div className="dashboard">

                <div className="dashboard-text">Dashboard</div>
                <div className="stats-blocks">
                    <StatsBlock />
                    <StatsBlock />
                    <StatsBlock />
                    <StatsBlock />
                    <StatsBlock />
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

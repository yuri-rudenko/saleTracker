import { LineChart } from '@mui/x-charts';
import React from 'react';

const RevenueGraph = () => {
    return (
        <div className='revenue-container'>

            <div className="revenue-text">

                <div className="top">
                    <div className="left">
                        Revenue
                    </div>
                    <div className="right">
                        <p className="scale">Day</p>
                        <p className="scale">Week</p>
                        <p className="scale">Month</p>
                    </div>
                </div>
                <div className="total-revenue">2873₴</div>
                <div className="increase">
                    <div className="percent-good">+3.3%</div>
                    <div className="period">from last period</div>
                </div>

            </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        curve: "linear",
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        color: "#0561FC"
                    },
                ]}
                height={400}
            />
        </div>
    );
}

export default RevenueGraph;

import { LineChart } from '@mui/x-charts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import getStandartDate from '../functions/getStandartDate';
import getStats from '../functions/getStats';

const RevenueGraph = () => {

    const sales = useSelector(state => state.sales.list);

    const [scale, setScale] = useState("days")

    const data = getStats(sales);

    return (
        <div className='revenue-container'>
            <div className="revenue-text">

                <div className="top">
                    <div className="left">
                        Revenue
                    </div>
                    <div className="right">
                        <p style={{ cursor: "pointer", color: scale === "days" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("days")}>Day</p>
                        <p style={{ cursor: "pointer", color: scale === "weeks" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("weeks")}>Week</p>
                        <p style={{ cursor: "pointer", color: scale === "months" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("months")}>Month</p>
                    </div>
                </div>
                <div className="total-revenue">2873₴</div>
                <div className="increase">
                    <div className="percent-good">+3.3%</div>
                    <div className="period">from last period</div>
                </div>

            </div>
            <LineChart
                xAxis={[
                    {
                        scaleType: "point",
                        data: Object.keys(data[scale])
                            .sort((a, b) => new Date(a) - new Date(b))
                            .map(date => new Date(new Date(date).setHours(0, 0, 0, 0)))
                    }
                ]}
                series={[
                    {
                        curve: "linear",
                        data: Object.keys(data[scale])
                            .sort((a, b) => new Date(a) - new Date(b))
                            .map(date => data[scale][date]) || [],
                        color: "#0561FC"
                    },
                ]}
                height={400}
            />
        </div>
    );
}

export default RevenueGraph;

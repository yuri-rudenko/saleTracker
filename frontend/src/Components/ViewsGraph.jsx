import { BarChart } from '@mui/x-charts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../functions/dates/formatDate';
import isSameDate from '../functions/dates/isSameDate';
import getViewsData from '../functions/graphs/getViewsData';


const ViewsGraph = () => {

    const products = useSelector(state => state.products.list);

    const [scale, setScale] = useState("days");
    const data = getViewsData(products);
    const labels = {
        days: [],
        weeks: [],
        months: []
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for(let i = 0; i < 7; i++) {

        let currentDay = new Date(now);
        let currentWeek = new Date(now);
        let currentMonth = new Date(now);

        currentDay.setDate(now.getDate() - i);
        currentWeek.setDate(now.getDate() - i*7);
        currentMonth.setDate(now.getDate() - i*30);

        labels["days"].unshift(formatDate(currentDay));
        labels["weeks"].unshift(formatDate(currentWeek));
        labels["months"].unshift(formatDate(currentMonth));

    }

    if(!data?.days || !data?.weeks || !data?.months) return;

    return (
        <div className='views-container'>
            <div className="views-text">
                <div className="top">
                    <div className="user-visits">User Visits</div>
                    <div className="right">
                        <p style={{ cursor: "pointer", color: scale === "days" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("days")}>D</p>
                        <p style={{ cursor: "pointer", color: scale === "weeks" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("weeks")}>W</p>
                        <p style={{ cursor: "pointer", color: scale === "months" ? "#0561FC" : "" }} className="scale" onClick={() => setScale("months")}>M</p>
                    </div>
                </div>
                <div className="increase">
                    <div className="percent-good">+3.3%</div>
                    <div className="period">from last period</div>
                </div>
            </div>
            <BarChart
                height={400}
                series={[
                    { data: data[scale], label: 'views', id: 'uvId', color: "#0561FC" },
                ]}
                slotProps={{ legend: { hidden: true } }}
                xAxis={[{ data: labels[scale], scaleType: 'band' }]}
            />
        </div>
    );
}

export default ViewsGraph;

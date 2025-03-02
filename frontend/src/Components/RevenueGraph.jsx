import { LineChart } from '@mui/x-charts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import getStandartDate from '../functions/getStandartDate';

const RevenueGraph = () => {

    const sales = useSelector(state => state.sales.list);

    const [scale, setScale] = useState("days")

    const getStats = (sales) => {

        const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));

        const days = {};
        const weeks = {};
        const months = {};

        const now = new Date();
        now.setDate(now.getDate() + 1);  // Make sure to get the "next day" midnight
        now.setHours(0, 0, 0, 0);


        for (let sale of sortedSales) {
            const saleDate = new Date(sale.date);

            // Calculate the difference in days
            const difference = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));

            // Calculate the difference in weeks
            const differenceWeek = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24 * 7));

            // Calculate the difference in months (in terms of total months)
            const differenceMonth =
                (now.getFullYear() - saleDate.getFullYear()) * 12 +
                (now.getMonth() - saleDate.getMonth());

            const profit = sale.products.reduce((acc, product) => acc + (product.price - product.averageBuyPrice) * product.amount, 0);

            if (difference < 10) {
                const date = new Date(now);
                date.setDate(now.getDate() - difference);
                days[date.toISOString().split('T')[0]] = (days[date.toISOString().split('T')[0]] || 0) + profit;
            }

            if (differenceWeek < 10) {
                const date = new Date(now);
                date.setDate(now.getDate() - differenceWeek * 7);
                weeks[date.toISOString().split('T')[0]] = (weeks[date.toISOString().split('T')[0]] || 0) + profit;
            }

            if (differenceMonth < 10) {
                const date = new Date(now);
                date.setMonth(now.getMonth() - differenceMonth);
                months[date.toISOString().split('T')[0]] = (months[date.toISOString().split('T')[0]] || 0) + profit;
            }

        }

        return { days, weeks, months };
    };

    const data = getStats(sales);

    return (
        <div className='revenue-container'>
            <div className="revenue-text">

                <div className="top">
                    <div className="left">
                        Revenue
                    </div>
                    <div className="right">
                        <p className="scale" onClick={() => setScale("days")}>Day</p>
                        <p className="scale" onClick={() => setScale("weeks")}>Week</p>
                        <p className="scale" onClick={() => setScale("months")}>Month</p>
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
                        scaleType: "time",
                        data: Object.keys(data[scale]).map(date => new Date(new Date(date).setHours(0, 0, 0, 0))),
                    }
                ]}
                series={[
                    {
                        curve: "linear",
                        data: Object.values(data[scale]) || [],
                        color: "#0561FC"
                    },
                ]}
                height={400}
            />
        </div>
    );
}

export default RevenueGraph;

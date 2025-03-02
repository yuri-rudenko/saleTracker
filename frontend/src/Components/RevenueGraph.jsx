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
        now.setDate(now.getDate() + 1);
        now.setHours(0, 0, 0, 0);


        for (let sale of sortedSales) {
            const saleDate = new Date(sale.date);

            const difference = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));

            const differenceWeek = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24 * 7));
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

        const getZeroDays = (intervals, type) => {

            const setZeroes = [];
            const newIntervals = { ...intervals }

            const dates = Object.keys(intervals).sort((a, b) => a - b);

            if (dates.length <= 1) return intervals;

            let notCrash = 0;

            const adjustDate = (date, type) => {
                const newDate = new Date(date);
                if (type === 'weeks') {
                    newDate.setDate(newDate.getDate() - 7);
                } else if (type === 'months') {
                    newDate.setMonth(newDate.getMonth() - 1);
                } else {
                    newDate.setDate(newDate.getDate() - 1);
                }
                return newDate.toISOString().split('T')[0];
            };

            for (let current = dates[0]; current !== dates[dates.length - 1];) {

                const checkDate = adjustDate(current, type);
                console.log(current, dates[dates.length - 1]);

                if (!dates.includes(checkDate)) {
                    setZeroes.push(checkDate);
                }

                current = checkDate;

                if (notCrash === 100) break;
                notCrash++;
            }

            setZeroes.forEach(zero => newIntervals[zero] = 0);
            return newIntervals;

        }

        console.log({ days, weeks, months }, getZeroDays(days, "days"))

        return { days: getZeroDays(days, "days"), weeks: getZeroDays(weeks, "weeks"), months: getZeroDays(months, "months") };
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

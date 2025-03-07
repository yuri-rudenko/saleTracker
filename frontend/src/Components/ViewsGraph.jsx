import { BarChart } from '@mui/x-charts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../functions/formatDate';
import isSameDate from '../functions/isSameDate';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];


const ViewsGraph = () => {

    const getViewsData = function (products) {

        if (!products || !products[0]) return;

        const views = products.map(product => [...product.views]);
        console.log(views[0]);

        let newDates = [];

        let dayViews = Array(7).fill(0);
        let weekViews = [];
        let monthViews = [];

        const now = new Date();
        const startDay = new Date(now);
        startDay.setDate(now.getDate() - 7);

        function findClosestPastDate(dates, target) {

            const targetDate = new Date(target);
            targetDate.setHours(0, 0, 0, 0);

            let left = 0, right = dates.length - 1;
            let closest = null;

            while (left <= right) {
                let mid = Math.floor((left + right) / 2);
                const midDate = new Date(dates[mid].date);

                midDate.setHours(0, 0, 0, 0);
                if (midDate <= targetDate) {
                    closest = dates[mid];
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            return closest;
        }


        for (let array of views) {

            console.log(array);

            const currentDate = new Date(startDay);
            let firsViews = findClosestPastDate(array, currentDate);

            if (firsViews === null) {
                if (!dayViews[0]) {
                    dayViews[0] = 0;
                }
            } else {

                if (!dayViews[0]) {
                    dayViews[0] = firsViews.views;
                } else {
                    dayViews[0] += firsViews.views;
                }
            }

            const index = firsViews === null ? -1 : array.findIndex(view => isSameDate(new Date(view.date), firsViews.date));
            let oldViews = firsViews === null ? 0 : firsViews.views;

            const firsViewsDatePlus = new Date(currentDate);

            let ajuster = 0;

            for (let i = 1; i <= 6; i++) {

                firsViewsDatePlus.setDate(firsViewsDatePlus.getDate() + 1);

                const nextView = array[index + i - ajuster];

                console.log(!!nextView, index + i - ajuster, index, i, ajuster);
                if (nextView && isSameDate(new Date(nextView.date), firsViewsDatePlus)) {
                    console.log("SUCCESS")
                    if (!dayViews[i]) {
                        dayViews[i] = nextView.views;
                    } else {
                        dayViews[i] += nextView.views;
                    }

                    oldViews = nextView.views;

                    ajuster = 1;

                } else {

                    if (!dayViews[i]) {
                        dayViews[i] = oldViews;
                    } else {
                        dayViews[i] += oldViews;
                    }
                    ajuster++;
                }

                if (index + i - ajuster >= array.length) {
                    console.log("Out of bounds for index:", index + i - ajuster, index, i, ajuster );
                } else {
                    console.log(i, dayViews[i], index + i - ajuster, index, i, ajuster);
                }
            }
        }

        console.log(dayViews);

    }

    const products = useSelector(state => state.products.list);

    const [scale, setScale] = useState("days");

    getViewsData(products);


    return (
        <div className='views-container'>
            <div className="views-text">
                <div className="top">
                    <div className="user-visits">User Visits</div>
                    <div className="right">
                        <p className="scale">D</p>
                        <p className="scale">W</p>
                        <p className="scale">M</p>
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
                    { data: uData, label: 'uv', id: 'uvId', color: "#0561FC" },
                ]}
                slotProps={{ legend: { hidden: true } }}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
        </div>
    );
}

export default ViewsGraph;

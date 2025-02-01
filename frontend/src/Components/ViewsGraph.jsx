import { BarChart } from '@mui/x-charts';
import React from 'react';

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
                { data: uData, label: 'uv', id: 'uvId', color: "#0561FC"},
              ]}
              slotProps={{ legend: { hidden: true } }}
              xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
        </div>
    );
}

export default ViewsGraph;

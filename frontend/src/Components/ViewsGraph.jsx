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
            <BarChart
              height={400}
              series={[
                { data: uData, label: 'uv', id: 'uvId', color: "#0561FC"},
              ]}
              xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
        </div>
    );
}

export default ViewsGraph;

import { LineChart } from '@mui/x-charts';
import React from 'react';

const RevenueGraph = () => {
    return (
        <div className='revenue-container'>
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

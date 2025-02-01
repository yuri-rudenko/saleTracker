import React from 'react';
import { ReactComponent as More } from '../images/More.svg';

const StatsBlock = () => {
    return (
        <div className='block'>
            <div className="top">

                <div className="total">Total Revenue</div>
                <More/>

            </div>
            <div className="amount">300₴</div>

        </div>
    );
}

export default StatsBlock;

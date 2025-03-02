import React from 'react';
import { ReactComponent as More } from '../images/More.svg';

const StatsBlock = (props) => {
    return (
        <div className='block'>
            <div className="top">

                <div className="total">{props.name}</div>
                <More/>

            </div>
            <div className="amount">{props.value}</div>

        </div>
    );
}

export default StatsBlock;

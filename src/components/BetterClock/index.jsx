import React from 'react';
import useClock from "../../hooks/useClock";

BetterClock.propTypes = {};

function BetterClock() {
    const {timeString} = useClock();

    return (
        <div className='better-clock'>
            <p style={{fontSize: '36px'}}>
                {timeString}
            </p>
        </div>
    );
}

export default BetterClock;
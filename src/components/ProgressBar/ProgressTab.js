import React from 'react';
import './styles.css';

function ProgressTab({ value }) {

    let MIN = 0;
    let MAX = 100;

    const clampedValue = Math.min(Math.max(value, MIN), MAX);
    
    return (
        <div className='progress'>
            <div 
                className='progress-bar'
                style={{ width: `${clampedValue}%` }}
                role="progressbar"
                aria-valuenow={clampedValue}
                aria-valuemin={MIN}
                aria-valuemax={MAX}
            >
                {clampedValue}%
            </div>
        </div>
    )
}

export default ProgressTab
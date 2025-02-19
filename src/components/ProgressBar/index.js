import React from 'react'
import ProgressTab from './ProgressTab'

function ProgressBar() {
    return (
        <div>
            <ProgressTab value={50} />
            <ProgressTab value={0} />
            <ProgressTab value={100} />
            <ProgressTab value={125} />
            <ProgressTab value={75} />
            <ProgressTab value={25} />
            <ProgressTab value={35} />
        </div>
    )
}

export default ProgressBar
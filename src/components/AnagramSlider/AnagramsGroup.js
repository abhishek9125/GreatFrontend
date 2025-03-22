import React from 'react'
import Slider from './Slider';

function AnagramsGroup({ group }) {

    const { title = "", words = [] } = group || {};

    return (
        <div>
            <h2>{title}</h2>
            <Slider items={words} />
        </div>
    )
}

export default AnagramsGroup
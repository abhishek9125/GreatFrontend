import React, { useState } from 'react';
import './styles.css';
import Rating from './Rating';

function StarRating() {

    const [rating, setRating] = useState(3);

    return (
        <Rating 
            rating={rating}
            maximumStars={5}
            onChange={setRating}
        />
    )
}

export default StarRating
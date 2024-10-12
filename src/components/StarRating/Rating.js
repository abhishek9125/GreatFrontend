import React, { useState } from 'react'
import { Star } from './assets/Icons';

function Rating({ rating, onChange, maximumStars }) {
    
    const [hoveredIndex, setHoveredIndex] = useState(null);

    let starMap = new Array(maximumStars).fill('_');

    const handleStarClick = (index) => {
        onChange(index + 1);
    }
    
    return (
        <div>
            {
                starMap.map((_, i) => (
                    <span 
                        key={i}
                        onClick={() => handleStarClick(i)}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Star filled={hoveredIndex != null ? i <= hoveredIndex : (i + 1) <= rating} />
                    </span>
                ))
            }
        </div>
    )
}

export default Rating
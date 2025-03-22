import React, { useState } from 'react';
import './styles.css';

function Slider({ items }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    if(!items || items.length === 0) return null;

    const goToPrev = () => {
        setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
    }

    const goToNext = () => {
        setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
    }

    return (
        <div className='slider'>
            <button className="slider-btn prev" onClick={goToPrev}>{"<"}</button>
            <div className='slider-content'>
                <div className='word-display'>{items[currentIndex]}</div>
                <div className="slider-dots">
                    {
                        items.map((_, i) => (
                            <span 
                                key={i}
                                className={`dot ${i === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))
                    }
                </div>
            </div>
            <button className="slider-btn next" onClick={goToNext}>{">"}</button>
        </div>
    )
}

export default Slider;
import React, { useState } from 'react';
import './styles.css';

const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
];

function GridLights() {

    const [isDeactivating, setIsDeactivating] = useState(false);
    const [order, setOrder] = useState([]);

    const deactivateCells = () => {
        setIsDeactivating(true);
        let intervalId = setInterval(() => {
            setOrder((prevOrder) => {
                let newOrder = [...prevOrder];
                newOrder.pop();
    
                if(newOrder.length === 0) {
                    clearInterval(intervalId);
                    setIsDeactivating(false);
                }

                return newOrder;
            })

        }, 300)
    }

    const handleClick = (index) => {
        const newOrder = [...order, index];
        setOrder(newOrder);
        if(newOrder.length === config.flat(1).filter(Boolean).length) {
            deactivateCells();
        }
    }

    return (
        <div className='wrapper'>
            <div className='grid'>
                {
                    config.flat(1).map((item, index) =>
                        item ?
                            <Cell 
                                key={index} 
                                label={`Cell ${index}`} 
                                onClick={() => handleClick(index)} 
                                isFilled={order.includes(index)} 
                                disabled={order.includes(index) || isDeactivating}
                            />
                            : <span key={index} />
                    )
                }
            </div>
            <div>
                {
                    order.join(', ')
                }
            </div>
        </div>
    )
}

function Cell({ onClick, isFilled, disabled }) {
    return (
        <button className={`grid-cell ${isFilled && "cell-activated"}`} onClick={onClick} disabled={disabled} />
    )
}

export default GridLights
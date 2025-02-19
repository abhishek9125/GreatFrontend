import React, { useState, useEffect } from 'react'

const RADIUS = 50;

const COLORS = ['lightcoral', 'lightblue', 'lightgreen', 'lightyellow', 'lightpink'];

function OverlappingCircles() {

    const [circleCords, setCircleCords] = useState([]);

    useEffect(() => {

        window.addEventListener('click', drawCircle);

        return () => {
            window.removeEventListener('click', drawCircle);
        }

    }, [])

    const drawCircle = (e) => {
        const { clientX, clientY } = e;

        let newCircleCords = {
            top: clientY - RADIUS,
            bottom: clientY + RADIUS,
            left: clientX - RADIUS,
            right: clientX + RADIUS,
            backgroundColor: COLORS[0]
        }

        setCircleCords((prevCords) => {   

            const overlappingCircles = prevCords.filter(circle => 
                areCirclesOverlapping(newCircleCords, circle)
            );

            if (overlappingCircles.length > 0) {
                const usedColors = new Set(overlappingCircles.map(circle => circle.backgroundColor));
                
                for (const color of COLORS) {
                    if (!usedColors.has(color)) {
                        newCircleCords.backgroundColor = color;
                        break;
                    }
                }
            }

            return [...prevCords, newCircleCords]
        });
    }

    const areCirclesOverlapping = (circle1, circle2) => {
        return !(circle1.top > circle2.bottom || circle2.top > circle1.bottom || circle1.left > circle2.right || circle2.left > circle1.right)
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            {
                circleCords.map((item) => {
                    return (
                        <Circle {...item} key={item.top + item.left + item.right} />
                    )
                })
            }
        </div>
    )
}

const Circle = ({ top, left, backgroundColor }) => {
    return (
        <div 
            style={{
                position: 'absolute',
                borderRadius: '50%',
                height: RADIUS*2,
                width: RADIUS*2,
                top,
                left,
                backgroundColor
            }}
        >

        </div>
    )
}

export default OverlappingCircles;
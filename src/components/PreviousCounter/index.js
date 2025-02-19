import React, { useState, useEffect, useRef } from 'react'

const usePrevious = (val) => {
    
    const prevRef = useRef();

    useEffect(() => {
        prevRef.current = val;
    }, [val])

    return prevRef.current;
}

function PreviousCounter() {

    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
        <div>
            <h1>
                Now: {count}, before: {prevCount}
            </h1>
            <button onClick={() => setCount((prev) => prev + 1)}>Decrement</button>
        </div>
    )
}

export default PreviousCounter
import React, { useState } from 'react';
import './styles.css';

function MemoryGame() {

    const [gridSize, setGridSize] = useState(4);
    const [cards, setCards] = useState([]);

    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    const handleGridSize = (e) => {
        const size = parseInt(e.target.value);
        if(size >= 2 && size <= 10) {
            setGridSize(size);
        }
    }

    const initializeGame = () => {
        const totalCards = gridSize * gridSize;
    }

    return (
        <div className='wrapper'>
            <h1>Memory Game</h1>

            <div>
                <label htmlFor='gridSize' >Grid Size: (Maximum 10)</label>
                <input 
                    type='number'
                    id='gridSize'
                    min={2}
                    max={10}
                    value={gridSize}
                    onChange={handleGridSize}
                    className='grid-size-input'
                />
            </div>
        </div>
    )
}

export default MemoryGame
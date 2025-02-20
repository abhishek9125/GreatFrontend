import React, { useState, useEffect } from 'react';

function MemoryGame() {

    const [gridSize, setGridSize] = useState(4);
    const [cards, setCards] = useState([]);

    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    const [maxMoves, setMaxMoves] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleGridSizeChange = (e) => {
        const size = parseInt(e.target.value);
        if(size >= 2 && size <= 10) {
            setGridSize(size);
        }
    }

    const handleMaxMovesChange = (e) => {
        const moves = parseInt(e.target.value);
        if(moves >= 0) {
            setMaxMoves(moves);
        }
    }

    const initializeGame = () => {
        const totalCards = gridSize * gridSize;
        const pairCount = Math.floor(totalCards/2);
        const numbers = [...Array(pairCount).keys()].map((index) => index + 1);
        const shuffleCards = [...numbers, ...numbers].sort(() => Math.random() - 0.5).slice(0, totalCards).map((number, index) => ({ id: index, number }));
        setCards(shuffleCards);
        setFlipped([]);
        setSolved([]);
        setWon(false);
        setMoves(0);
        setGameOver(false);
    }

    const checkMatch = (secondId) => {
        const [firstId] = flipped;
        if(cards[firstId].number == cards[secondId].number) {
            setSolved([...solved, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000)
        }
    }

    const hanleCardClick = (id) => {
        if(disabled || gameOver) return;
        if(flipped.length === 0) {
            setFlipped([id]);
            setMoves((prev) => prev + 1)
            return;
        }
        
        if(flipped.length === 1) {
            setDisabled(true);
            if(id !== flipped[0]) {
                setFlipped([...flipped, id]);
                setMoves((prev) => prev + 1)
                checkMatch(id);
            } else {
                setFlipped([]);
                setDisabled(false);
            }
        }
    }

    const isFlipped = (id) => flipped.includes(id);
    const isSolved = (id) => solved.includes(id);

    useEffect(() => {
        initializeGame()
    }, [gridSize, maxMoves])

    useEffect(() => {
        if(solved.length === cards.length) {
            setWon(true);
            setGameOver(true)
        }
        if(maxMoves > 0 && moves >= maxMoves) setGameOver(true);
    }, [solved, moves, maxMoves])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>

            <div className='mb-4 flex space-x-4'>
                <div>
                    <label htmlFor='gridSize' className='mr-2 mb-4'>Grid Size: (Maximum 10)</label>
                    <input 
                        type='number'
                        id='gridSize'
                        min={2}
                        max={10}
                        value={gridSize}
                        onChange={handleGridSizeChange}
                        className='border-2 border-gray-300 rounded px-2 py-1 w-16'
                    />
                </div>

                <div>
                    <label htmlFor='maxMoves' className='mr-2 mb-4'>Max Moves: (0 for unlimited)</label>
                    <input 
                        type='number'
                        id='maxMoves'
                        min={0}
                        value={maxMoves}
                        onChange={handleMaxMovesChange}
                        className='border-2 border-gray-300 rounded px-2 py-1 w-16'
                    />
                </div>
            </div>

            <div className='mb-4 text-xl'>
                Moves: {moves}{maxMoves > 0 && `/${maxMoves}`}
            </div>

            <div className='grid gap-2 mb-4' style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`, width: `min(100%, ${gridSize * 5.5}rem)` }}>
                {
                    cards.map((card) => {
                        return <div 
                            onClick={() => hanleCardClick(card.id)} 
                            className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer 
                                        transition-all duration-300 bg-gray-300 text-gray-400 
                                        ${isFlipped(card.id) && "bg-blue-500 text-white"}
                                        ${isSolved(card.id) && "bg-green-500 text-white"}
                                        ${gameOver && "pointer-events-none"}`}
                            key={card.key}>
                                {(isFlipped(card.id) || isSolved(card.id)) ? card.number : '?'}
                        </div>
                    })
                }
            </div>

           {    
                gameOver && 
                <div className={`mt-4 text-4xl font-bold text-green-600 ${gameOver && "text-red-600"} animate-bounce`}>
                    {won ? 'You Won!' : 'Game Over!'}
                </div>
            }

            <button className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors' onClick={initializeGame}>
                {won ? "Play Again" : "Reset"}
            </button>
        </div>
    )
}

export default MemoryGame
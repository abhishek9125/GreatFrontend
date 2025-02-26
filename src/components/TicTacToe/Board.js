import React from 'react'
import './styles.css';
import useTicTacToe from './useTicTacToe';

function Board({ boardSize = 4 }) {

    const { board, handleClick, getStatusMessage, resetGame } = useTicTacToe(boardSize);

    return (
        <div className='game' style={{ "--board-size": boardSize }}>
            <div className='status'>
                {getStatusMessage()}
                <button className='reset-button' onClick={resetGame}>
                    Reset Game
                </button>
            </div>
            <div className='board'>
                {
                    board.map((b, index) => {
                        return (
                            <button className='cell' key={index} onClick={() => handleClick(index)} disabled={b !== null}>
                                {b}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Board
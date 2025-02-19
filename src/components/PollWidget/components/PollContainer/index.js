import React, { useState, useEffect } from 'react';
import './styles.css';

function PollContainer({ pollId, title, options, isMultiple = false, onVote, onVoteRemove, styles = {} }) {

    const [currentOptions, setCurrentOptions] = useState(options);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const storedVotes = localStorage.getItem(`poll-${pollId}`);
        if(storedVotes) {
            setSelectedOptions(JSON.parse(storedVotes));
        }
    }, [pollId])

    const totalVotes = currentOptions.reduce((acc, option) => acc + option.votes, 0);

    const handleVotes = async (optionId) => {

    }

    const handleRemoveVoute = async (optionId) => {
        
    }

    return (
        <fieldset className='poll-wrapper' style={styles.container}>
            <legend style={styles.title}>
                {title}
            </legend>
            <div 
                className='options-container'
                style={{
                    ...styles.optionsContainer,
                    maxHeight: currentOptions.length > 4 ? '200px' : 'auto'
                }
            }>
                {
                    currentOptions.map((option, index) => {
                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
                        return (
                            <div>
                                <div>
                                    <label htmlFor='' style={styles.optionLabel} className='option-label'>
                                        <input 
                                            className='option-input'
                                            type={isMultiple ? 'checkbox' : 'radio'}
                                            style={styles.optionInput}
                                        />
                                        <span className='option-title'>{option.title}</span>
                                    </label>
                                    {
                                        selectedOptions.length > 0 && 
                                        <span style={styles.optionVotes} className='option-votes'>
                                            {option.votes} votes ({percentage.toFixed(1)}%)
                                        </span>
                                    }
                                </div>
                                <div className="progress-bar" style={styles.progressBar}>
                                    {selectedOptions.length > 0 && 
                                        <div 
                                            className='progress-bar-fill' 
                                            style={{
                                                ...styles.progressBarFill,
                                                transform: `scale(${percentage / 100})`
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                selectedOptions.length > 0 &&
                <button style={styles.removeButton}>
                    Remove Vote
                </button>
            }
        </fieldset>
    )
}

export default PollContainer
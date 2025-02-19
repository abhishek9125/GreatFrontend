import React, { useState, useEffect } from 'react';
import './styles.css';
import { fetchPoll, removeVote, submitVote } from './db/api';
import PollContainer from './components/PollContainer';

function PollWidget() {

    const [pollData, setPollData] = useState(null);

    useEffect(() => {
        const loadPoll = async () => {
            try {
                const data = await fetchPoll(41);
                setPollData(data);
            } catch(error) {
                console.log("Error Fetching Poll Data", error);
            }
        }

        loadPoll();
    }, [])

    if(!pollData) {
        return <div>Loading...</div>
    }

    return (
        <div className='poll-widget'>
            <PollContainer 
                pollId={pollData.id}
                title={pollData.question}
                options={pollData.options}
                onVote={submitVote}
                onVoteRemove={removeVote}
                styles={{}}
            />
        </div>
    )
}

export default PollWidget;
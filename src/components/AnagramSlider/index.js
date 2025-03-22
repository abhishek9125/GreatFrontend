import React, { useEffect, useState } from 'react'
import { groupAnagrams } from './helper';
import AnagramsGroup from './AnagramsGroup';

const words = ['cat', 'act', 'tac', 'dog', 'god', 'eat', 'tea', 'ate'];

function AnagramSlider() {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const groupedAnagrams = groupAnagrams(words);
        setGroups(groupedAnagrams);
    }, [])

    return (
        <div>
            {
                groups.map((group, index) => <AnagramsGroup group={group} key={index} />)
            }
        </div>
    )
}

export default AnagramSlider
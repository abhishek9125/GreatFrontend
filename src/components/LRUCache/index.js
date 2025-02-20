import React, { useState } from 'react'
import useLRUCache from './useLRUCache';

function LRUCache() {

    const [content, setContent] = useState([]);

    const loadContent = async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const loadedContent = {
            id, text: `Tab ${id} Data`
        }
        put(id, loadedContent);
        setContent((prev) => [...prev, loadedContent]);
    }

    const handleButtonClick = (id) => {
        const cachedContent = get(id);
        if(cachedContent) {
            console.log(`Cached Content for Tab ${id}`);
            setContent((prev) => [...prev, cachedContent]);
        } else {
            console.log(`Loading Content for Tab ${id}`);
            loadContent(id);
        }
    }

    const { get, put } = useLRUCache(3);

    return (
        <div>
            <h2>Dynamic Content Loader</h2>
            <button onClick={() => handleButtonClick(1)}>Tab 1</button>
            <button onClick={() => handleButtonClick(2)}>Tab 2</button>
            <button onClick={() => handleButtonClick(3)}>Tab 3</button>
            <button onClick={() => handleButtonClick(4)}>Tab 4</button>
            <button onClick={() => handleButtonClick(5)}>Tab 5</button>

            <div>
                <h3>Loaded Content</h3>
                <ul>
                    {
                        content.map((item,i) => <li key={i}>{item.text}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default LRUCache
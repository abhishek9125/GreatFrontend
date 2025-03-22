// App.js
import React from 'react';
import InfiniteScroll from './InfiniteScroll';
import './App.css';

const InfiniteScrollMain = () => {

    const generateItems = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            title: `Item ${i + 1}`,
            content: `This is content for Item Number ${i + 1}`
        }));
    };

    const allItems = generateItems(100);

    const renderItem = (item) => {
        return (
            <div key={item.id} className='item'>
                <div>{item.title}</div>
                <div>{item.content}</div>
            </div>
        )
    }

    return (
        <InfiniteScroll 
            itemsPerPage={10}
            allItems={allItems}
            renderItem={renderItem}
        />
    );
};

export default InfiniteScrollMain;
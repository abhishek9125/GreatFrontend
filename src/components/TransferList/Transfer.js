import React, { useState } from 'react'
import { DEFAULT_ITEMS_LEFT, DEFAULT_ITEMS_RIGHT } from './constants';
import ItemList from './ItemList';
import './styles.css';

function Transfer() {

    const [itemsLeft, setItemsLeft] = useState(DEFAULT_ITEMS_LEFT);
    const [itemsRight, setItemsRight] = useState(DEFAULT_ITEMS_RIGHT);
    const [selectedLeftItems, setSelectedLeftItems] = useState([]);
    const [selectedRightItems, setSelectedRightItems] = useState([]);

    const transferAllLeft = () => {
        setItemsLeft([...itemsLeft, ...selectedRightItems]);
        setSelectedRightItems([]);
    }

    const transferAllRight = () => {
        setItemsRight([...itemsRight, ...selectedLeftItems]);
        setSelectedLeftItems([]);
    }

    return (
        <div className='transfer-list-wrapper'>
            <ItemList items={itemsLeft} selectedItems={selectedLeftItems} setSelectedItems={setSelectedLeftItems} />
            <div className='action-buttons'>
                <button onClick={transferAllLeft}> &lt;&lt; </button>
                <button disabled={selectedRightItems.length == 0}> &lt;</button>
                <button disabled={selectedLeftItems.length == 0}> &gt; </button>
                <button onClick={transferAllRight}> &gt;&gt; </button>
            </div>
            <ItemList items={itemsRight} selectedItems={selectedRightItems} setSelectedItems={setSelectedRightItems} />
        </div>
    )
}

export default Transfer;
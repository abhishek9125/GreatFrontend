import React from 'react'
import CheckboxItem from './CheckboxItem';

function ItemList({ items, setSelectedItems, selectedItems }) {
    return (
        <ul>
            {
                items.map((item, index) => (
                    <li key={index}>
                        <CheckboxItem item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                    </li>
                ))
            }
        </ul>
    )
}

export default ItemList;
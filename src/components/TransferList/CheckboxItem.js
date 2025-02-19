import React from 'react';

function CheckboxItem({ item, selectedItems, setSelectedItems }) {
    const handleChange = (e) => {
        const element = e.target.value;
        if (selectedItems.includes(element)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== element));
        } else {
            setSelectedItems([...selectedItems, element]);
        }
    };

    const getChecked = () => {
        return selectedItems.includes(item);
    };

    return (
        <div>
            <input
                type="checkbox"
                onChange={handleChange}
                value={item}
                checked={getChecked()}
            />
            <label>{item}</label>
        </div>
    );
}

export default CheckboxItem;

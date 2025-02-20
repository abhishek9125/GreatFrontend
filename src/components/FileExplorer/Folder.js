import React, { useState } from 'react';
import './styles.css';

function Folder({ folder, handleInsertNode }) {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        isVisible: false,
        isFolder: null
    });

    const { name = "", isFolder = false, items = [] } = folder;

    const handleAddFolderOrFile = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })
    };

    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value) {
            handleInsertNode(folder.id, e.target.value, showInput.isFolder)
            setShowInput({
                visible: false,
                isFolder: null
            })
        }
    }

    return (
        <div className='folderWrapper'>
            <div 
                className='folderName'
                style={{ 
                    cursor: isFolder && 'pointer'
                }} 
                onClick={() => setExpand((prev) => !prev)}
            >
                <span>
                    {isFolder ? '📁' : '📝' } {name}
                </span>
                {
                    isFolder &&
                    <div>
                        <button onClick={(e) => handleAddFolderOrFile(e, true)}>Folder +</button>
                        <button onClick={(e) => handleAddFolderOrFile(e, false)}>File +</button>
                    </div>
                }
            </div>
            {
                showInput.visible && 
                <div className='inputContainer'>
                    <span>{showInput.isFolder ? '📁' : '📝' }</span>
                    <input 
                        className='inputContainer__input' 
                        autoFocus
                        onKeyDown={onAddFolder}
                        onBlur={() => setShowInput({ visible: false, isFolder: null })}
                        type='text'
                    />
                </div>
            }
            {
                expand && isFolder &&
                <>
                    {items.map((exp) => <Folder folder={exp} handleInsertNode={handleInsertNode} /> )}
                </>
            }
        </div>
    )
}

export default Folder
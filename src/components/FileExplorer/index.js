import React, { useState } from 'react';
import { EXPLORER_DATA } from './constant';
import Folder from './Folder';
import useTraverseTree from './useTraverseTree';

function FileExplorer() {

    const [explorerData, setExplorerData] = useState(EXPLORER_DATA);

    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(finalTree);
    }

    return (
        <div>
            <Folder folder={explorerData} handleInsertNode={handleInsertNode} />
        </div>
    )
}

export default FileExplorer
import { useState } from 'react';
import { NodeTree } from './NodeTree';
import './Tree.css';

function Tree({ tree }) {

    const [isExpendMode, setIsExpendMode] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    function onSetSelectedItem(nodeTree) { //Update the selected item state
        if (selectedItem) selectedItem.isSelected = false
        nodeTree.isSelected = true
        setSelectedItem(nodeTree)
    }

    function onHandleChange() { //Update the expend mode state
        setIsExpendMode(!isExpendMode)
        if (isExpendMode) closeBranches(tree)
    }

    function closeBranches(tree) { //Recursive function to close all branches if isExpendMode changed to false
        tree.forEach(father => {
            father.isOpen = false
            if (father.children) closeBranches(father.children)
        })
    }

    return (
        <section className='tree'>
            <div className='expended-option-container'>
                <label>Expending mode</label>
                <input type="checkbox" checked={isExpendMode} onChange={onHandleChange} />
            </div>
            {tree.map(nodeTree => (
                <li key={nodeTree.name}>
                    <NodeTree
                        nodeTree={nodeTree}
                        isExpendMode={isExpendMode}
                        onSetSelectedItem={onSetSelectedItem}
                        closeBranches={closeBranches}
                        childHierarchy={1} />
                </li>
            ))}
        </section>
    )
}

export default Tree
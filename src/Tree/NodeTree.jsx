import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faFolderClosed, faFile } from "@fortawesome/free-solid-svg-icons";

export function NodeTree({ nodeTree, isExpendMode, onSetSelectedItem, closeBranches, childHierarchy }) {

    const [isNodeTreeOpen, setIsNodeTreeOpen] = useState(isExpendMode && nodeTree.isOpen ? true : false)
    const [dynamicClass, setHelpClassAnim] = useState('')

    const type = nodeTree.children ? 'folder' : 'file'
    const isSelected = nodeTree.isSelected ? 'is-selected' : ''
    const stylePadding = type === 'file' ? childHierarchy * 30 + 20 + 'px' : childHierarchy * 30 + 'px'

    useEffect(() => { //If changed to not expending mode- close the tree's branches
        if (!isExpendMode) setIsNodeTreeOpen(false)
    }, [isExpendMode])

    useEffect(() => {
        if (dynamicClass === '') setHelpClassAnim('open')
    }, [dynamicClass])

    function onToggleClicked() {
        if (type === 'file') onSetSelectedItem(nodeTree) //If the user clicks on a file- this will be the selected file
        else {
            nodeTree.isOpen = !isNodeTreeOpen
            if (!isNodeTreeOpen) openNodeTree()
            else closeNodeTree()
        }
    }

    function openNodeTree() {
        setHelpClassAnim('') //The dynamic class state has changed - so the useEffect will be invoked, and this state will change to open. This will happen after the isNodeTreeOpen state changes; so the animation can work
        setIsNodeTreeOpen(!isNodeTreeOpen) //Update the isNodeTreeOpen state
    }

    function closeNodeTree() {
        if (!isExpendMode) closeBranches(nodeTree.children)
        setHelpClassAnim('close')
        setTimeout(() => setIsNodeTreeOpen(!isNodeTreeOpen), 500); //First the animation will happen- then the subTree will not be part of the DOM
    }

    return (
        <section className={`node-tree ${isSelected}`}>

            <div className='file-folder' onClick={onToggleClicked} style={{ paddingInlineStart: stylePadding }}>
                {type === 'folder' && isNodeTreeOpen && <FontAwesomeIcon icon={faChevronDown} />}
                {type === 'folder' && !isNodeTreeOpen && <FontAwesomeIcon icon={faChevronRight} />}
                {type === 'folder' && <FontAwesomeIcon icon={faFolderClosed} />}
                {type === 'file' && <FontAwesomeIcon icon={faFile} />}
                <p>{nodeTree.name}</p>
            </div>

            {isNodeTreeOpen && nodeTree.children && (
                <ul className={`sub-tree ${dynamicClass}`}>
                    {nodeTree.children.map(child => (
                        <li key={child.name} >
                            <NodeTree
                                nodeTree={child}
                                isExpendMode={isExpendMode}
                                onSetSelectedItem={onSetSelectedItem}
                                closeBranches={closeBranches}
                                childHierarchy={childHierarchy + 1} />
                        </li>
                    ))}
                </ul>
            )}

        </section>
    )
}
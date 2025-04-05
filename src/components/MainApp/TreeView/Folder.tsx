import { useState, memo, MouseEvent, useEffect, KeyboardEvent } from 'react'
import classes from './Folder.module.css'
import { darkFolderIcon } from '../../../utils/svgIcons'
import NestedFolders from './NestedFolders'
import { useAdaptData, useRemoveFiles } from '../../../utils/hooks'
import { BucketItemType } from '../../../utils/types'
import { useDirContext } from '../../../context/dirContext'
import { _Object } from '@aws-sdk/client-s3'


type Props = {
    content: BucketItemType[] | _Object[] | undefined;
    currentDir: string;
    root?: boolean;
    renderChild: boolean;
}

const {
    folder_container,
    folder_name,
    folder_box,
    show_btn,
    rotate_btn,
    triangle,
    folder_icon,
    clicked_btn
} = classes

const Folder = ({ currentDir, content, root, renderChild }: Props) => {

    const [showFolders, setShowFolders] = useState(root ? true : false)

    const {
        setCurrentDir,
        setCurrentDirItems,
        setDirMap,
        currentDir: openedDir
    } = useDirContext()


    const dirContent = useAdaptData(content, currentDir)
    const { foldersInDirectory, shouldRender } = useRemoveFiles(dirContent)

    useEffect(() => {
        const key = root ? '/' : currentDir
        setDirMap(prevState => {
            return {
                ...prevState,
                [key]: dirContent
            }
        })
        if (root && !openedDir) {
            setCurrentDir(currentDir)
            setCurrentDirItems(dirContent)
        }

    }, [openedDir, currentDir, root, dirContent, setCurrentDir, setCurrentDirItems, setDirMap])

    const onCLickTriangleHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowFolders(prevState => !prevState)
    }

    const onEnterPress = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            setCurrentDir(currentDir)
        }
    }

    const onDoubleClickHandler = () => {
        setCurrentDir(currentDir)
    }

    const currentDirArr = currentDir.split('/')
    const currentDirName = currentDirArr.length > 1 ? currentDirArr[currentDirArr.length - 1] : currentDir
    
    const childKeysArr = Object.keys(foldersInDirectory)
    const currentLevel = childKeysArr[0] ? childKeysArr[0].split('/').length : 0
    const openDirArr = openedDir.split('/')
    openDirArr.splice(currentLevel)
    const openDirSection = openDirArr.join('/')
    const isParentOfOpenDir = childKeysArr.some( dir => dir === openDirSection)
    
    const isChildOpen = 
        root 
        ? true 
        : currentDir === openedDir 
        ? true 
        : isParentOfOpenDir


    return (
        <li className={folder_container} >
            <div className={folder_box}>
                <div className={folder_icon}>
                    {darkFolderIcon}
                </div>
                <button
                    className={`${folder_name} ${currentDir === openedDir ? clicked_btn : ''}`}
                    onClick={onCLickTriangleHandler}
                    onDoubleClick={onDoubleClickHandler}
                    onKeyDown={onEnterPress}
                >
                    {root ? 'root' : currentDirName}
                {
                    shouldRender
                        ? <div className={show_btn}><div className={`${triangle} ${showFolders || isChildOpen  ? rotate_btn : ''}`}></div></div>
                        : []
                }
                </button>
            </div>
            {renderChild
                && <NestedFolders
                    folderObject={foldersInDirectory}
                    showFolders={showFolders || isChildOpen}
                    renderChild={showFolders || isChildOpen}
                    shouldRender={shouldRender}
                />
            }
        </li>
    )
}

export default memo(Folder)
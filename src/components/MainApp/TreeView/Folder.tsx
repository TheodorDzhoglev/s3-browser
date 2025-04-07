import { useState, memo, MouseEvent, useEffect, KeyboardEvent } from 'react'
import classes from './Folder.module.css'
import { darkFolderIcon } from '../../../utils/svgIcons'
import NestedFolders from './NestedFolders'
import { useAdaptData, useFindOpenDirParents, useRemoveFiles } from '../../../utils/hooks'
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
    folder_name_container,
    folder_name,
    folder_box,
    show_btn,
    rotate_btn,
    triangle,
    folder_icon,
    clicked_btn,
    loading_btn
} = classes

const Folder = ({ currentDir, content, root, renderChild }: Props) => {

    const [showFolders, setShowFolders] = useState(root ? true : false)

    const {
        setCurrentDir,
        setCurrentDirItems,
        setDirMap,
        loadingObj,
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
        if(shouldRender){
            setShowFolders(prevState => !prevState)
        }
    }

    const onEnterPress = (e: KeyboardEvent) => {
        if(e.key === 'Enter' && e.target === e.currentTarget){
            setCurrentDir(currentDir)
        }
    }

    const onDoubleClickHandler = () => {
        setCurrentDir(currentDir)
    }

    const currentDirArr = currentDir.split('/')
    const currentDirName = currentDirArr.length > 1 ? currentDirArr[currentDirArr.length - 1] : currentDir
    
    
    const loading = loadingObj.some( name => name === currentDir+'/')

    const isParentOfOpenDir = useFindOpenDirParents(foldersInDirectory)
    
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
                <div className={folder_name_container}>
                    <button
                        className={`${folder_name} ${currentDir === openedDir ? clicked_btn : ''} ${loading ? loading_btn : ''}`}
                        // onClick={onCLickTriangleHandler}
                        onDoubleClick={onDoubleClickHandler}
                        onKeyDown={onEnterPress}
                        disabled={loading}
                        inert={loading}
                        aria-label={root ? 'root' : currentDirName}
                    >
                        {root ? 'root' : currentDirName}
                    </button>
                        {
                            shouldRender
                                ? <button
                                    className={show_btn}
                                    onClick={onCLickTriangleHandler}
                                    aria-label={`${showFolders ? 'hide' : 'show'} nested folders`}
                                    title={`${showFolders ? 'hide' : 'show'} nested folders`}
                                    >
                                    <div
                                        className={`${triangle} ${showFolders || isChildOpen ? rotate_btn : ''}`}>
                                    </div>
                                </button>
                                : []
                        }
                </div>
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
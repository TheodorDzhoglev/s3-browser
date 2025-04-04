import { useState, memo, MouseEvent, useEffect, useMemo } from 'react'
import classes from './Folder.module.css'
import { darkFolderIcon } from '../../../utils/svgIcons'
import NestedFolders from './NestedFolders'
import { useAdaptData, useRemoveFiles } from '../../../utils/hooks'
import { BucketItemType } from '../../../utils/types'
import { useDirContext } from '../../../context/dirContext'
import { _Object } from '@aws-sdk/client-s3'

type Props = {
    content: BucketItemType[] | _Object[] | undefined;
    currentDir?: string;
    root?: boolean;
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

const Folder = ({ currentDir = '', content, root }: Props) => {

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

    const onDirClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        // setShowFolders(prevState => !prevState)
    }

    const onDoubleClickHandler = () => {
        setCurrentDir(currentDir)
    }

    const currentDirArr = currentDir.split('/')
    const currentDirName = currentDirArr.length > 1 ? currentDirArr[currentDirArr.length - 1] : currentDir

    return (
        <li className={folder_container} >
            <div className={folder_box}>
                <div className={folder_icon}>
                    {darkFolderIcon}
                </div>
                <button
                    className={`${folder_name} ${currentDir === openedDir ? clicked_btn : ''}`}
                    onClick={onDirClickHandler}
                    onDoubleClick={onDoubleClickHandler}
                >
                    {root ? 'root' : currentDirName}
                </button>
                {
                    shouldRender
                        ? <button
                            className={show_btn}
                            onClick={onCLickTriangleHandler}>
                            <div
                                className={
                                    `${triangle} ${showFolders
                                        ? rotate_btn
                                        : ''}`}
                            >
                            </div>
                        </button>
                        : []
                }
            </div>
            <NestedFolders
                folderObject={foldersInDirectory}
                showFolders={showFolders}
                shouldRender={shouldRender}
            />
        </li>
    )
}

export default memo(Folder)
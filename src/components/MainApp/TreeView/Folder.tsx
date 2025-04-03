import { useState, memo, MouseEvent, useEffect } from 'react'
import classes from './Folder.module.css'
import { darkFolderIcon } from '../../../utils/svgIcons'
import NestedFolders from './NestedFolders'
import { useAdaptData, useRemoveFiles } from '../../../utils/hooks'
import { BucketItemType } from '../../../utils/types'
import { useDirContext } from '../../../context/dirContext'
import { _Object } from '@aws-sdk/client-s3'

type Props = {
    content: BucketItemType[] | _Object[] | undefined;
    parent?: Record<string, BucketItemType[] | Date | undefined> | undefined;
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

const Folder = ({ currentDir = '', content, root, parent }: Props) => {

    const [showFolders, setShowFolders] = useState(false)
    const [clicked, setClicked] = useState(false)
    const { setCurrentDir, setCurrentDirItems, setParentDir, setDirMap, currentDir: currDir } = useDirContext()
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
        if (root && !currDir) {
            setCurrentDir(currentDir)
            setCurrentDirItems(dirContent)
        }
    }, [setDirMap, currentDir, root, dirContent, setCurrentDir, setCurrentDirItems, currDir])

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowFolders(prevState => !prevState)
    }

    const onDoubleClickHandler = () => {
        setParentDir(parent)
        setCurrentDir(currentDir)
        setCurrentDirItems(dirContent)
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
                    className={`${folder_name} ${clicked ? clicked_btn : ''}`}
                    onClick={() => setClicked(prevState => !prevState)}
                    onDoubleClick={onDoubleClickHandler}
                >
                    {root ? 'root' : currentDirName}
                </button>
                {
                    shouldRender
                        ? <button
                            className={show_btn}
                            onClick={onCLickHandler}>
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
                parent={dirContent}
            />
        </li>
    )
}

export default memo(Folder)
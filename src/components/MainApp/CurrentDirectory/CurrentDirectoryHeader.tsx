import classes from './CurrentDirectory.module.css'
import uiClasses from '../../../assets/styles/uiElements.module.css'
import { ReactNode, useRef, useState } from 'react'
import { binIcon, plusIcon, newFolderIcon, backIcon } from '../../../utils/svgIcons'
import NewFileModal from '../../Modal/NewFileModal'
import Dialog from '../../Modal/Dialog'
import { useDirContext } from '../../../context/dirContext'
import { findCurrentDir, findParentDir } from '../../../utils/dataTransformUtls'
import NewFolderModal from '../../Modal/NewFolderModal'
import DeleteModal from '../../Modal/DeleteModal'

const {
    directory_header,
    current_directory,
    btn_container,
    svg_icon,
    back_btn
} = classes

const {
    button
} = uiClasses

type Props = {
    selectedFile: { name: string, type: 'file' | 'folder' } | undefined
}

const CurrentDirectoryHeader = ({ selectedFile }: Props) => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [modalElement, setModalElement] = useState<ReactNode>()
    const { setCurrentDirItems, dirMap, currentDir, setCurrentDir } = useDirContext()

    const toggleDialog = () => {
        if (!dialogRef.current) return;
        if (dialogRef.current.hasAttribute('open')) {
            dialogRef.current.close()
        }
        else {
            dialogRef.current.showModal()
        }
    }

    const onOpenAddNewFileHandler = () => {
        toggleDialog()
        setModalElement(<NewFileModal key={Math.random()} />)
    }

    const onOpenAddNewFolderHandler = () => {
        toggleDialog()
        setModalElement(<NewFolderModal key={Math.random()} />)
    }

    const onOpenDeleteHandler = () => {
        toggleDialog()
        setModalElement(<DeleteModal key={Math.random()} selectedFile={selectedFile} />)
    }

    const onBackClickHandler = () => {
        const parentDir = findParentDir(currentDir)
        if(parentDir){
            setCurrentDir(parentDir)
            setCurrentDirItems(dirMap[parentDir])
        }
    }

    return (
        <div className={directory_header}>
            <button className={back_btn} onClick={onBackClickHandler}>
                {backIcon}
            </button>
            <h3 className={current_directory}>
                Current Directory: {findCurrentDir(currentDir)}
            </h3>
            <div className={btn_container}>
                <button className={button} onClick={onOpenAddNewFileHandler}>
                    <div className={svg_icon}>
                        {plusIcon}
                    </div>
                    Add File
                </button>
                <button className={button} onClick={onOpenAddNewFolderHandler}>
                    <div className={svg_icon}>
                        {newFolderIcon}
                    </div>
                    Add Folder
                </button>
                <button className={button} onClick={onOpenDeleteHandler}>
                    <div className={svg_icon}>
                        {binIcon}
                    </div>
                    Delete
                </button>
            </div>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog}>{modalElement}</Dialog>
        </div>
    )
}

export default CurrentDirectoryHeader
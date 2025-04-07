import classes from './CurrentDirectory.module.css'
import uiClasses from '../../../assets/styles/uiElements.module.css'
import { binIcon, plusIcon, newFolderIcon, backIcon } from '../../../utils/svgIcons'
import NewFileModal from '../../Modal/NewFileModal'
import Dialog from '../../Modal/Dialog'
import { useDirContext } from '../../../context/dirContext'
import { findCurrentDir, findParentDir } from '../../../utils/dataTransformUtls'
import NewFolderModal from '../../Modal/NewFolderModal'
import DeleteModal from '../../Modal/DeleteModal'
import { toggleDialog, useCurrDirContext } from '../../../context/currDirContext'
import { SelectItemType } from '../../../utils/types'

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
    selectedFile: SelectItemType
}

const CurrentDirectoryHeader = ({ selectedFile }: Props) => {

    const { setCurrentDirItems, dirMap, currentDir, setCurrentDir } = useDirContext()
    const { dialogRef, setModalElement, modalElement } = useCurrDirContext()


    const onOpenAddNewFileHandler = () => {
        toggleDialog(dialogRef)
        setModalElement(<NewFileModal key={Math.random()} />)
    }

    const onOpenAddNewFolderHandler = () => {
        toggleDialog(dialogRef)
        setModalElement(<NewFolderModal key={Math.random()} />)
    }

    const onOpenDeleteHandler = () => {
        toggleDialog(dialogRef)
        setModalElement(<DeleteModal key={Math.random()} selectedFile={selectedFile} />)
    }

    const onBackClickHandler = () => {
        const parentDir = findParentDir(currentDir)
        if (parentDir) {
            setCurrentDir(parentDir)
            setCurrentDirItems(dirMap[parentDir])
        }
    }
    console.log(currentDir)
    return (
        <div className={directory_header}>
            <button className={back_btn} onClick={onBackClickHandler} aria-label='previous directory' title='previous directory' disabled={currentDir === '/'}>
                {backIcon}
            </button>
            <h2 className={current_directory}>
                Current Directory: {findCurrentDir(currentDir)}
            </h2>
            <div className={btn_container}>
                <button className={button} onClick={onOpenAddNewFileHandler} aria-label='Add file'>
                    <div className={svg_icon}>
                        {plusIcon}
                    </div>
                    Add File
                </button>
                <button className={button} onClick={onOpenAddNewFolderHandler} aria-label='Add folder'>
                    <div className={svg_icon}>
                        {newFolderIcon}
                    </div>
                    Add Folder
                </button>
                <button className={button} onClick={onOpenDeleteHandler} disabled={!selectedFile.name} aria-label='delete'>
                    <div className={svg_icon}>
                        {binIcon}
                    </div>
                    Delete
                </button>
            </div>
            <Dialog ref={dialogRef} toggleDialog={() => toggleDialog(dialogRef)}>{modalElement}</Dialog>
        </div>
    )
}

export default CurrentDirectoryHeader
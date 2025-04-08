import classes from './CurrentDirectory.module.css'
import uiClasses from '../../../assets/styles/uiElements.module.css'
import { binIcon, plusIcon, newFolderIcon, backIcon, filterIcon } from '../../../utils/svgIcons'
import NewFileModal from '../../Modal/NewFileModal'
import Dialog from '../../Modal/Dialog'
import { useDirContext } from '../../../context/dirContext'
import { findCurrentDir, findParentDir } from '../../../utils/dataTransformUtls'
import NewFolderModal from '../../Modal/NewFolderModal'
import DeleteModal from '../../Modal/DeleteModal'
import { toggleDialog, useCurrDirContext } from '../../../context/currDirContext'
import { SelectItemType } from '../../../utils/types'
import SearchModal from '../../Modal/SearchModal'

const {
    directory_header,
    current_directory,
    btn_container,
    svg_icon,
    header_icon,
    header_icon_container
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

    const onOpenSearchHandler = () => {
        toggleDialog(dialogRef)
        setModalElement(<SearchModal key={Math.random()}  />)
    }

    const onBackClickHandler = () => {
        const parentDir = findParentDir(currentDir)
        console.log(parentDir)
        if (parentDir) {
            setCurrentDir(parentDir)
            setCurrentDirItems(dirMap[parentDir])
        }
    }
    console.log(findCurrentDir(currentDir))
    return (
        <div className={directory_header}>
            <h2 className={current_directory}>
                Current Directory: {currentDir === '/' ? 'root' : findCurrentDir(currentDir)}
            </h2>
            <div className={btn_container}>
                <div className={header_icon_container}>
                    <button className={header_icon} onClick={onBackClickHandler} aria-label='previous directory' title='previous directory' disabled={currentDir === '/'}>
                        {backIcon}
                    </button>
                    <button className={header_icon} onClick={onOpenSearchHandler} aria-label='search' title='search'>
                        {filterIcon}
                    </button>
                </div>
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
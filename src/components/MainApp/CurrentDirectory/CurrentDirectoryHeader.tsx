import classes from './CurrentDirectory.module.css'
import uiClasses from '../../../assets/styles/uiElements.module.css'
import { ReactNode, useRef, useState} from 'react'
import { binIcon, plusIcon } from '../../../utils/svgIcons'
import NewFileModal from '../../Modal/NewFileModal'
import Dialog from '../../Modal/Dialog'
import { useDirContext } from '../../../context/dirContext'
import { findCurrentDir, findParentDir } from '../../../utils/dataTransformUtls'

const { 
    directory_header,
    current_directory,
    btn_container
} = classes

const {
    button
} = uiClasses

const CurrentDirectoryHeader = () => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [modalElement, setModalElement] = useState<ReactNode>()
    const { setCurrentDirItems, dirMap, currentDir, setCurrentDir } = useDirContext()
    const toggleDialog = () => {
        if(!dialogRef.current) return;
        if(dialogRef.current.hasAttribute('open')){
            dialogRef.current.close()
        }
        else{
            dialogRef.current.showModal()
        }
    }

    const onOpenAddNewModalHandler = () => {
        toggleDialog()
        setModalElement(<NewFileModal key={Math.random()}/>)
    }

    const onBackClickHandler = () => {
        console.log(findParentDir(currentDir))
        const currentDirArr = currentDir.split('/')
        currentDirArr.pop()
        const parentDir = currentDirArr.join('/')
        if(!parentDir){
            setCurrentDirItems(dirMap['/'])
        }
        else{
            setCurrentDir(parentDir)
            setCurrentDirItems(dirMap[parentDir])
        }
    }

    return (
        <div className={directory_header}>
            <h3 className={current_directory}>
                Current Directory: {findCurrentDir(currentDir)}
            </h3>
            <div className={btn_container}>
                <button className={button} onClick={onOpenAddNewModalHandler}>{plusIcon}Add File</button>
                <button className={button} onClick={onOpenAddNewModalHandler}>{plusIcon}Add Folder</button>
                <button className={button}>{binIcon}Delete</button>
                <button className={button} onClick={onBackClickHandler}>{binIcon}Back</button>
            </div>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog}>{modalElement}</Dialog>
        </div>
    )
}

export default CurrentDirectoryHeader
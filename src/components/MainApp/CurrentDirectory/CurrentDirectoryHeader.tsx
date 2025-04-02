import classes from './CurrentDirectory.module.css'
import uiClasses from '../../../assets/styles/uiElements.module.css'
import { ReactNode, useRef, useState} from 'react'
import { binIcon, plusIcon } from '../../../utils/svgIcons'
import NewFileModal from '../../Modal/NewFileModal'
import Dialog from '../../Modal/Dialog'

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

    return (
        <div className={directory_header}>
            <h3 className={current_directory}>
                Current Directory
            </h3>
            <div className={btn_container}>
                <button className={button} onClick={onOpenAddNewModalHandler}>{plusIcon}Add a New File</button>
                <button className={button}>{binIcon}Delete a File</button>
            </div>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog}>{modalElement}</Dialog>
        </div>
    )
}

export default CurrentDirectoryHeader
import { forwardRef, ReactNode, MouseEvent } from "react"
import modalClasses from '../../assets/styles/Modal.module.css'

type Props = {
    toggleDialog: () => void
    children: ReactNode
}

const { 
    dialog,
    modal_box,
    close_btn
 } = modalClasses

const Dialog = forwardRef<HTMLDialogElement, Props>(({ toggleDialog, children}, ref) => {
    
     const onCloseModalHandler = (e: MouseEvent<HTMLDialogElement>) => {
         if ((e.target === e.currentTarget || e.target instanceof HTMLButtonElement)){
             toggleDialog()
         }
     }


    return (
            <dialog className={dialog} ref={ref} onClick={onCloseModalHandler}>
                <div className={modal_box}>
                    <button className={close_btn} type="button"></button>
                    {children}
                </div>
            </dialog>
    )
})

export default Dialog
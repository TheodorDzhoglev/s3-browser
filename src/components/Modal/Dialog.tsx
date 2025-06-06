import { forwardRef, ReactNode, MouseEvent } from "react"
import modalClasses from '../../assets/styles/Modal.module.css'

type Props = {
    toggleDialog: () => void;
    children: ReactNode;
};

const {
    dialog,
    close_btn,
    dialog_container
} = modalClasses;

const Dialog = forwardRef<HTMLDialogElement, Props>(({ toggleDialog, children }, ref) => {

    const onCloseModalHandler = (e: MouseEvent<HTMLDialogElement>) => {
        if (((e.target === e.currentTarget) || e.target instanceof HTMLButtonElement)) {
            toggleDialog();
        };
    };


    return (
        <dialog className={dialog_container} ref={ref} onClick={onCloseModalHandler} >
            <div className={dialog}>
                <button className={close_btn} type="button" title="close modal" aria-label="close-modal"></button>
                {children}
            </div>
        </dialog>
    );
});

export default Dialog;
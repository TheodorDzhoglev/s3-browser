import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { useAppContext } from '../../context/context'
import { removeFromLocalStorage } from '../../utils/localStorage'

const {
    button,
} = uiClasses

const {
    modal_header,
    error_modal,
    modal_box,
    message_modal
} = modalClasses

const MainAppError = () => {

    const { setCredentials } = useAppContext()

    const onLogoutHandler = () => {
        setCredentials(undefined)
        removeFromLocalStorage()
    }


    return (
        <div className={error_modal}>
            <div className={modal_box}>
                <div className={message_modal}>
                    <h2 className={modal_header}>An error occurred!</h2>
                    <p>Please try to reconnect to your bucket</p>
                    <button className={button} onClick={onLogoutHandler} aria-label='back'>Back</button>
                </div>
            </div>
        </div>
    )
}

export default MainAppError
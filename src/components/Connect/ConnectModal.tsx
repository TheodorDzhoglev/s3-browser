import ConnectForm from "./ConnectForm"
import classes from './ConnectModal.module.css'
import modalContainer from '../../assets/styles/Modal.module.css'

const {
    form_overlay,
    form_container,        
} = classes

const {
    modal_header,
    modal_content
} = modalContainer

const ConnectModal = () => {
    
    return (
        <div className={form_overlay}>
            <div className={form_container}>
                <h1 className={modal_header}>S3 Browser</h1>
                <p className={modal_content}>To connect to your AWS S3 bucket, please provide the following details:</p>
                <ConnectForm />
            </div>
        </div>
    )
}

export default ConnectModal
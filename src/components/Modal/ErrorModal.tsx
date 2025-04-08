import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'


const {
    button,
} = uiClasses;

const {
    modal_header,
    message_modal
} = modalClasses;

type Props = {
    text: string;
};

const ErrorModal = ({text}: Props) => {

    return (
        <Fragment>
            <div className={message_modal}>
                    <h2 className={modal_header}>An error occurred</h2>
                    <p>{text}</p>
                    <p>Please try again</p>
                    <button className={button} aria-label='back'>Back</button>
                </div>
        </Fragment>
    );
};

export default ErrorModal;
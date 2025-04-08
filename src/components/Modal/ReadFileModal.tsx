import { Fragment } from 'react/jsx-runtime';
import classes from '../../assets/styles/Modal.module.css'
import { useFetchObj } from '../../utils/customQueryHooks'
import ErrorModal from './ErrorModal'
import { findCurrentDir } from '../../utils/dataTransformUtls';

type Props = {
    keyName: string;
};

const {
    read_file_module
} = classes;

const ReadFileModal = ({ keyName }: Props) => {

    const { isLoading, data, error } = useFetchObj(keyName);


    if (error) return <ErrorModal text="We couldn't open the file. Please try again." />;

    return (
        <Fragment>
            <h3>{findCurrentDir(keyName)}</h3>
            <div className={read_file_module}>{isLoading ? <span className='text-bold'>Your file is on its way!</span> : data}</div>
        </Fragment>
    );
};

export default ReadFileModal;
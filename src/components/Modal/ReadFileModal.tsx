import classes from '../../assets/styles/Modal.module.css'
import { useFetchObj } from '../../utils/customQueryHooks'
import ErrorModal from './ErrorModal'

type Props = {
    keyName: string;
}

const {
    read_file_module
} = classes

const ReadFileModal = ({ keyName }: Props) => {
    
    const {isLoading, data, error} = useFetchObj(keyName)


    if(isLoading) return <div className={read_file_module}>Your file is on its way!</div>

    if(error) return <ErrorModal text="Something went wrong while opening the file."/>

    return (<div className={read_file_module}>{data}</div>)
}

export default ReadFileModal
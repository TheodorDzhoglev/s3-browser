import classes from '../../assets/styles/Modal.module.css'
import { useFetchObj } from '../../utils/customQueryHooks'

type Props = {
    keyName: string;
}

const {
    read_file_module
} = classes

const ReadFileModal = ({ keyName }: Props) => {
    
    const {isLoading, data, error} = useFetchObj(keyName)


    if(isLoading) return <div className={read_file_module}>Loading</div>

    if(error) return <div className={read_file_module}>An error occurred</div>

    return (<div className={read_file_module}>{data}</div>)
}

export default ReadFileModal
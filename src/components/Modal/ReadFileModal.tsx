import classes from '../../assets/styles/Modal.module.css'

type Props = {
    text: string | undefined
}

const {
    read_file_module
} = classes

const ReadFileModal = ({ text }: Props) => {
    return (
        <div className={read_file_module}>{text}</div>
    )
}

export default ReadFileModal
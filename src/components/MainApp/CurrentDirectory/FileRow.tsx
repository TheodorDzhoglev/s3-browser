import classes from './Rows.module.css'
import { fileIcon } from '../../../utils/svgIcons'
import { BucketItemType } from '../../../utils/types'
import Dialog from '../../Modal/Dialog'
import { getObject } from '../../../utils/s3API'
import { useAppContext } from '../../../context/context'
import { useDirContext } from '../../../context/dirContext'
import { useRef, useState, memo } from 'react'
import ReadFileModal from '../../Modal/ReadFileModal'

type Props = {
    name: string | undefined;
    lastModified?: Date | undefined;
    content: BucketItemType[] | undefined;
    selected: boolean;
    onCLickHandler: (name: string, type: 'file' | 'folder') => void
}

const {
    icon_container,
    icon_svg,
    icon_title,
    icon_date,
    icon_li,
    selected_file
} = classes

const FileRow = ({ name, lastModified, selected, onCLickHandler }: Props) => {

    const { s3client, credentials } = useAppContext()
    const { currentDir } = useDirContext()
    const [fileData, setFileData] = useState()
    const dialogRef = useRef<HTMLDialogElement>(null)

    if (!credentials) return
    const { bucket, key } = credentials

    if (!name || !s3client || !bucket || !key) return

    const toggleDialog = () => {
        if (!dialogRef.current) return;
        if (dialogRef.current.hasAttribute('open')) {
            dialogRef.current.close()
        }
        else {
            dialogRef.current.showModal()
        }
    }

    const onDoubleClickHandler = async () => {
        const keyName = currentDir === '/' ? name : `${currentDir}/${name}`
        const object = await getObject(s3client, keyName, bucket)
        setFileData(object)
        toggleDialog()
    }


    return (
        <li className={icon_li}>
            <button
                className={`${icon_container} ${selected ? selected_file : ''}`}
                onDoubleClick={onDoubleClickHandler}
                onClick={() => onCLickHandler(name, 'file')}
                type='button'
            >
                <div className={icon_svg}>
                    {fileIcon}
                </div>
                <p className={icon_title}>
                    {name}
                </p>
                <p className={icon_date}>{lastModified ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}` : ''}</p>
            </button>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog}><ReadFileModal text={fileData} /></Dialog>
        </li>
    )
}

export default memo(FileRow)
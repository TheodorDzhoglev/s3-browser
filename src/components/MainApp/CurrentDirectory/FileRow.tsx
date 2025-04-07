import classes from './Rows.module.css'
import { fileIcon } from '../../../utils/svgIcons'
import Dialog from '../../Modal/Dialog'
import { useAppContext } from '../../../context/context'
import { useDirContext } from '../../../context/dirContext'
import { useRef, useState, memo, ReactNode, KeyboardEvent } from 'react'
import ReadFileModal from '../../Modal/ReadFileModal'

type Props = {
    name: string | undefined;
    lastModified?: Date | undefined;
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
    const { currentDir, loadingObj } = useDirContext()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [modal, setModal] = useState<ReactNode>()

    if (!credentials) return
    const { bucket, key } = credentials

    if (!name || !s3client || !bucket || !key) return

    const keyName = currentDir === '/' ? name : `${currentDir}/${name}`

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
        console.log('DOUBLE PRESS')
        toggleDialog()
        setModal(<ReadFileModal keyName={keyName} />)
    }

    const onEnterPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && selected) {
            e.preventDefault()
            setModal(<ReadFileModal keyName={keyName} />)
            toggleDialog()
        }
    }

    const loading = loadingObj.some(name => name === keyName)

    return (
        <li className={icon_li} title={name}>
            <button
                className={`${icon_container} ${selected ? selected_file : ''}  ${loading ? 'animate_bg' : ''}`}
                onDoubleClick={onDoubleClickHandler}
                onClick={() => onCLickHandler(name, 'file')}
                onKeyDown={onEnterPress}
                type='button'
                disabled={loading}
                inert={loading}
                aria-label={
                    `File name: ${name} created on ${lastModified
                        ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`
                        : ''
                    }`
                }
            >
                <div className={icon_svg}>
                    {fileIcon}
                </div>
                <p className={icon_title}>
                    {name}
                </p>
                <p className={icon_date}>
                    {
                        lastModified
                            ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`
                            : ''
                    }
                </p>
            </button>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog}>{modal}</Dialog>
        </li>
    )
}

export default memo(FileRow)
import classes from './Rows.module.css'
import { folderIcon } from '../../../utils/svgIcons'
import { BucketItemType } from '../../../utils/types'
import { findCurrentDir } from '../../../utils/dataTransformUtls'
import { useDirContext } from '../../../context/dirContext'
import { memo } from 'react'

type Props = {
    name: string | undefined,
    lastModified?: Date | undefined,
    content: BucketItemType[] | undefined
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

const FolderRow = ({ name, lastModified, selected, onCLickHandler }: Props) => {

    const {setCurrentDirItems, setCurrentDir, dirMap} = useDirContext()

    if(!name) return

    const onDoubleClickHandler = () => {
        setCurrentDir(name)
        setCurrentDirItems(dirMap[name])
    }

    return (
        <li className={icon_li}>
            <button 
                className={`${icon_container} ${selected ? selected_file : ''}`}
                type='button' 
                onDoubleClick={onDoubleClickHandler}
                onClick={() => onCLickHandler(name, 'folder')}
            >
                <div className={icon_svg}>
                    {folderIcon}
                </div>
                <p className={icon_title}>
                    {findCurrentDir(name)}
                </p>
                <p className={icon_date}>{lastModified ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}` : ''}</p>
            </button>
        </li>
    )
}

export default memo(FolderRow)
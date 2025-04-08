import classes from './Rows.module.css'
import { folderIcon } from '../../../utils/svgIcons'
import { findCurrentDir } from '../../../utils/dataTransformUtls'
import { useDirContext } from '../../../context/dirContext'
import { memo, KeyboardEvent } from 'react'
type Props = {
    name: string | undefined,
    lastModified?: Date | undefined,
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

    const { setCurrentDirItems, setCurrentDir, dirMap, loadingObj } = useDirContext()

    if (!name) return

    const onDoubleClickHandler = () => {
        setCurrentDir(name)
        setCurrentDirItems(dirMap[name])
    }

    const onEnterPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && selected) {
            setCurrentDir(name)
            setCurrentDirItems(dirMap[name])
        }
    }

    const loading = loadingObj.some(loadName => loadName === name + '/')

    return (
        <li className={icon_li} title={name}>
            <button
                className={`${icon_container} ${selected ? selected_file : ''} ${loading ? 'animate_bg' : ''}`}
                type='button'
                onDoubleClick={onDoubleClickHandler}
                onClick={() => onCLickHandler(name, 'folder')}
                onKeyDown={onEnterPress}
                disabled={loading}
                inert={loading}
                aria-label={
                    `Folder name: ${findCurrentDir(name)} created on ${lastModified
                        ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`
                        : ''
                    }`
                }
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
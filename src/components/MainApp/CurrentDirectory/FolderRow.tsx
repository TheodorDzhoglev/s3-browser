import classes from './Icon.module.css'
import { folderIcon } from '../../../utils/svgIcons'
import { BucketItemType } from '../../../utils/types'
import { findCurrentDir } from '../../../utils/dataTransformUtls'
import { useDirContext } from '../../../context/dirContext'

type Props = {
    name: string | undefined,
    lastModified?: Date | undefined,
    content: BucketItemType[] | undefined
}

const {
    icon_container,
    icon_svg,
    icon_title,
    icon_date,
    icon_li
} = classes

const FolderRow = ({ name, lastModified, content}: Props) => {

    const {setCurrentDirItems, setCurrentDir, dirMap} = useDirContext()

    if(!name) return

    const onDoubleClickHandler = () => {
        setCurrentDir(name)
        setCurrentDirItems(dirMap[name])
    }
    return (
        <li className={icon_li}>
            <button className={icon_container} type='button' onDoubleClick={onDoubleClickHandler}>
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

export default FolderRow
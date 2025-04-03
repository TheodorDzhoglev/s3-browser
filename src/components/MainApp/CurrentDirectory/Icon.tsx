import classes from './Icon.module.css'
import { folderIcon, fileIcon } from '../../../utils/svgIcons'
import { BucketItemType } from '../../../utils/types'

type Props = {
    name: string | undefined,
    lastModified?: Date | undefined,
    type: 'file' | 'folder',
    content: BucketItemType[] | undefined
}

const {
    icon_container,
    icon_svg,
    icon_title,
    icon_date,
    icon_li
} = classes

const Icon = ({ name, lastModified, type}: Props) => {

    if(!name) return

    const onDoubleClickHandler = () => {
    }

    return (
        <li className={icon_li}>
            <button className={icon_container} type='button' onDoubleClick={onDoubleClickHandler}>
                <div className={icon_svg}>
                    {
                        type === 'folder'
                        ? folderIcon
                        : fileIcon
                    }
                </div>
                <p className={icon_title}>
                    {name}
                </p>
                <p className={icon_date}>{lastModified ? `${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}` : ''}</p>
            </button>
        </li>
    )
}

export default Icon
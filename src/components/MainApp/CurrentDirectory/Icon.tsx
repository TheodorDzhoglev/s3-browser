import classes from './Icon.module.css'
import { folderIcon, fileIcon } from '../../../utils/svgIcons'

type Props = {
    name: string | undefined,
    lastModified: Date | undefined
}

const {
    icon_container,
    icon_svg,
    icon_title,
    icon_date,
    icon_li
} = classes

const Icon = ({ name, lastModified }: Props) => {

    if(!name || !lastModified) return

    return (
        <li className={icon_li}>
            <button className={icon_container} type='button'>
                <div className={icon_svg}>
                    {
                        name.includes('/')
                        ? folderIcon
                        : fileIcon
                    }
                </div>
                <p className={icon_title}>
                    {name.includes('/') ? name.split('/', 1)[0] : name}
                </p>
                <p className={icon_date}>{`${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`}</p>
            </button>
        </li>
    )
}

export default Icon
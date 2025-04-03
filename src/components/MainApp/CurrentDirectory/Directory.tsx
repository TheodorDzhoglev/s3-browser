import classes from './Directory.module.css'
import Icon from './Icon'
import { useSort } from '../../../utils/hooks'
import { useDirContext } from '../../../context/dirContext'
import { useCachedList } from '../../../utils/customQueryHooks'
import FolderRow from './FolderRow'

const {
    directory_grid_container,
    directory_container,
    directory_grid,
    directory_nav,
    button_container
} = classes

const Directory = () => {

    const rootContent = useCachedList()
    const { currentDirItems } = useDirContext()


    const {
        // sortedContent,
        sortByType,
        sortByName,
        sortByDate
    } = useSort(rootContent)



    return (
        <div className={directory_container}>
            <div className={directory_nav}>
                <div className={button_container}>
                    <button onClick={sortByType}>Type</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByName}>Name</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByDate}>Date</button>
                </div>
            </div>
            <div className={directory_grid_container}>
                <ul className={directory_grid}>
                    {currentDirItems && Object.keys(currentDirItems).map(key => {
                        if (currentDirItems[key] instanceof Date) {
                            return (
                                <Icon
                                    name={key}
                                    key={key}
                                    lastModified={currentDirItems[key] instanceof Date ? currentDirItems[key] : undefined}
                                    type={'file'}
                                    content={currentDirItems[key] instanceof Date ? undefined : currentDirItems[key]}
                                />
                            )
                        }
                        else {
                            return (
                                <FolderRow
                                    name={key}
                                    key={key}
                                    lastModified={undefined}
                                    content={currentDirItems[key] instanceof Date ? undefined : currentDirItems[key]}
                                />
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Directory
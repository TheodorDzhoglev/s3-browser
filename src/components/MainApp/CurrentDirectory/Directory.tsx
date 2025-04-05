import classes from './Directory.module.css'
import FolderRow from './FolderRow'
import { BucketItemType, SelectItemType, ObjectType } from '../../../utils/types'
import FileRow from './FileRow'
import { useSort } from '../../../utils/hooks'

type Props = {
    dirContent: Record<string, BucketItemType[] | Date | undefined> | undefined;
    selectedFile: SelectItemType | undefined;
    setSelectedFile: React.Dispatch<React.SetStateAction<SelectItemType | undefined>>;
}

const {
    directory_grid_container,
    directory_container,
    directory_grid,
    directory_nav,
    button_container
} = classes

const Directory = ({ dirContent, selectedFile, setSelectedFile }: Props) => {

    const onCLickHandler = (name: string, type: 'file' | 'folder') => {
        setSelectedFile({
            name: name === selectedFile?.name ? '' : name,
            type: type
        })
    }

    const {
        sortedContent,
        sortByType,
        sortByName,
        sortByDate
    } = useSort(dirContent)
    
    console.log(sortedContent)
    if (!sortedContent) return

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
                    {sortedContent.map(({ key, data, LastModified, type }) =>
                        type === 'file'
                            ? <FileRow
                                name={key}
                                key={key}
                                lastModified={LastModified}
                                selected={selectedFile?.name === key}
                                onCLickHandler={onCLickHandler}
                            />
                            : <FolderRow
                                name={key}
                                key={key}
                                lastModified={LastModified}
                                selected={selectedFile?.name === key}
                                content={data}
                                onCLickHandler={onCLickHandler}
                            />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Directory
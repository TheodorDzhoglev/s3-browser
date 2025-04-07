import classes from './Directory.module.css'
import FolderRow from './FolderRow'
import { BucketItemType, SelectItemType } from '../../../utils/types'
import FileRow from './FileRow'
import { useSort } from '../../../utils/hooks'
import { useEffect } from 'react'

type Props = {
    dirContent: Record<string, BucketItemType[] | Date | undefined> | undefined;
    selectedFile: SelectItemType;
    setSelectedFile: React.Dispatch<React.SetStateAction<SelectItemType>>;
}

const {
    directory_grid_container,
    directory_container,
    directory_grid,
    directory_nav,
    button_container
} = classes

const Directory = ({ dirContent, selectedFile, setSelectedFile }: Props) => {

    const onCLickHandler = (name: string, type: 'file' | 'folder' | '') => {
        setSelectedFile({
            name: name === selectedFile?.name ? '' : name,
            type: type
        })
    }

    useEffect(() => {
        setSelectedFile({name: '', type: ''})
    }, [dirContent, setSelectedFile])

    const {
        sortedContent,
        sortByType,
        sortByName,
        sortByDate
    } = useSort(dirContent)
    
    if (!sortedContent) return

    return (
        <div className={directory_container}>
            <div className={directory_nav}>
                <div className={button_container}>
                    <button onClick={sortByType} title='sort by type' aria-label='sort by type'>Type</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByName} title='sort by name' aria-label='sort by name'>Name</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByDate} title='sort by date' aria-label='sort by date' >Date</button>
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
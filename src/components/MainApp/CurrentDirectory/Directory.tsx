import classes from './Directory.module.css'
import FolderRow from './FolderRow'
import { BucketItemType, SelectItemType } from '../../../utils/types'
import FileRow from './FileRow'

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

    

    return (
        <div className={directory_container}>
            <div className={directory_nav}>
                <div className={button_container}>
                    <button onClick={() => { }}>Type</button>
                </div>
                <div className={button_container}>
                    <button onClick={() => { }}>Name</button>
                </div>
                <div className={button_container}>
                    <button onClick={() => { }}>Date</button>
                </div>
            </div>
            <div className={directory_grid_container}>
                <ul className={directory_grid}>
                    {dirContent && Object.keys(dirContent).map(key => {
                        return dirContent[key] instanceof Date
                            ? <FileRow
                                name={key}
                                key={key}
                                lastModified={dirContent[key]}
                                selected={selectedFile?.name === key}
                                onCLickHandler={onCLickHandler}
                            />
                            : <FolderRow
                                name={key}
                                key={key}
                                lastModified={dirContent[key] ? dirContent[key][0].LastModified : undefined}
                                content={dirContent[key]}
                                selected={selectedFile?.name === key}
                                onCLickHandler={onCLickHandler}
                            />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Directory
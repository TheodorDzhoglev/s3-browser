import classes from './Directory.module.css'
import FolderRow from './FolderRow'
import { BucketItemType } from '../../../utils/types'
import FileRow from './FileRow'

type Props = {
    dirContent: Record<string, BucketItemType[] | Date | undefined> | undefined;
    selectedFile: string;
    setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}

const {
    directory_grid_container,
    directory_container,
    directory_grid,
    directory_nav,
    button_container
} = classes

const Directory = ({ dirContent, selectedFile, setSelectedFile }: Props) => {

    const onCLickHandler = (name: string) => {
        setSelectedFile(name === selectedFile ? '' : name)
    }
    console.log(dirContent)
    return (
        <div className={directory_container}>
            <div className={directory_nav}>
                <div className={button_container}>
                    <button onClick={()=>{}}>Type</button>
                </div>
                <div className={button_container}>
                    <button onClick={()=>{}}>Name</button>
                </div>
                <div className={button_container}>
                    <button onClick={()=>{}}>Date</button>
                </div>
            </div>
            <div className={directory_grid_container}>
                <ul className={directory_grid}>
                    {dirContent && Object.keys(dirContent).map(key => {
                        if (dirContent[key] instanceof Date) {
                            return (
                                <FileRow
                                    name={key}
                                    key={key}
                                    lastModified={dirContent[key] instanceof Date ? dirContent[key] : undefined}
                                    content={dirContent[key] instanceof Date ? undefined : dirContent[key]}
                                    selected={selectedFile === key}
                                    onCLickHandler={onCLickHandler}
                                />
                            )
                        }
                        else {
                            return (
                                <FolderRow
                                    name={key}
                                    key={key}
                                    lastModified={dirContent[key] ? dirContent[key][0].LastModified : undefined}
                                    content={dirContent[key] instanceof Date ? undefined : dirContent[key]}
                                    selected={selectedFile === key}
                                    onCLickHandler={onCLickHandler}
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
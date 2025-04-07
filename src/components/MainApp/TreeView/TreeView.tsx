import classes from "./TreeView.module.css"
import { _Object } from "@aws-sdk/client-s3"
import Folder from "./Folder"


type TreeViewType = {
    className: string;
    content: _Object[] | undefined;
    isLoading: boolean
}
const {
    main_container,
    folder_tree
} = classes

const TreeView = ({ className, content, isLoading }: TreeViewType) => {

    return (
        <div className={className}>
            <div className={main_container}>
                <ul className={folder_tree}>
                    {
                        isLoading
                            ? 'Loading bucket data...'
                            : <Folder
                                key={'root'}
                                content={content}
                                currentDir="/"
                                root={true}
                                renderChild={true}
                            />
                    }
                </ul>
            </div>
        </div>
    )
}

export default TreeView
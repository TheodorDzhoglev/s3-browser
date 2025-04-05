import { memo } from "react"
import Folder from "./Folder"
import classes from './Folder.module.css'
import { BucketItemType } from "../../../utils/types"

type Props = {
    folderObject: Record<string, BucketItemType[] | undefined>;
    showFolders: boolean;
    shouldRender: boolean;
    renderChild: boolean
}

const {
    nested_folders,
    collapsable,
    show_collapsable,
} = classes

const NestedFolders = ({ folderObject, showFolders, shouldRender, renderChild }: Props) => {

    if (!shouldRender) return []
    return (
        <div className={`${nested_folders} ${showFolders? show_collapsable : ''}`} inert={!showFolders}>
            <ul className={collapsable}>
                {folderObject
                    && Object.keys(folderObject).map(key =>
                        <Folder
                            key={key}
                            currentDir={key}
                            content={folderObject[key]}
                            renderChild={renderChild}
                        />)
                }
            </ul>
        </div>
    )
}

export default memo(NestedFolders)
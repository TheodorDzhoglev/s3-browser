import classes from "./TreeView.module.css"

type TreeViewType = {
    className: string
}

const TreeView = ({ className }: TreeViewType) => {

    const { main_container } = classes

    return (
        <div className={className}>
            <div className={main_container}>
                TreeView
            </div>
        </div>
    )
}

export default TreeView
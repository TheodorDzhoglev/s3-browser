import CurrentDirectory from "./CurrentDirectory/CurrentDirectory"
import TreeView from "./TreeView/TreeView"
import classes from "./MainApp.module.css"
import { Fragment } from "react/jsx-runtime"
import AppHeader from "./Header/AppHeader"
import { listBucket } from "../../utils/s3API"
import { useQuery } from "@tanstack/react-query"
import { useAppContext } from "../../context/context"

const {
    app_container,
    tree_view,
    current_directory
} = classes

const MainApp = () => {

    const { credentials, s3client } = useAppContext()
    const { bucket } = credentials!

    const { isLoading, error, data } = useQuery({
        queryKey: ['list'],
        queryFn: () => listBucket(s3client!, bucket),
    })


    if (isLoading) return <h1>Loading</h1>

    if(error) return <h1>An Error occurred {error.message}</h1>

    console.log(data)
    console.log(data?.Contents)

    return (
        <Fragment>
            <AppHeader />
            <div className={app_container}>
                <TreeView className={tree_view} />
                <CurrentDirectory className={current_directory} />
            </div>
        </Fragment>
    )
}

export default MainApp
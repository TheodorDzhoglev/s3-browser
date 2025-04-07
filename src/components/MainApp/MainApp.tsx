import CurrentDirectory from "./CurrentDirectory/CurrentDirectory"
import TreeView from "./TreeView/TreeView"
import classes from "./MainApp.module.css"
import { Fragment } from "react/jsx-runtime"
import AppHeader from "./Header/AppHeader"
import { useFetchList } from "../../utils/customQueryHooks"
import DirectoryContext from "../../context/DirectoryContext"
import MainAppError from "../Modal/MainAppError"

const {
    app_container,
    tree_view,
    current_directory
} = classes

const MainApp = () => {
    const { isLoading, error, data } = useFetchList()

    if (error) return  <MainAppError/>

    return (
        <Fragment>
            <AppHeader />
            <div className={app_container}>
                <DirectoryContext>
                    <TreeView className={tree_view} content={data?.Contents} isLoading={isLoading}/>
                    <CurrentDirectory className={current_directory} isLoading={isLoading}/>
                </DirectoryContext>
            </div>
        </Fragment>
    )
}

export default MainApp
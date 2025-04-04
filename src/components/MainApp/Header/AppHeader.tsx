import classes from "./AppHeader.module.css"
import { logoutIcon } from "../../../utils/svgIcons"
import { useAppContext } from "../../../context/context"
import { removeFromLocalStorage } from "../../../utils/localStorage"

const {
    app_header,
    header_content,
    header_logout
} = classes

const AppHeader = () => {

    const { setCredentials } = useAppContext()

    const onLogoutHandler = () => {
        setCredentials(undefined)
        removeFromLocalStorage()
    }

    return (
        <div className={app_header}>
            <div className={header_content}>Filespace dashboard</div>
            <button className={header_logout} onClick={onLogoutHandler}>{logoutIcon}</button>
        </div>
    )
}

export default AppHeader
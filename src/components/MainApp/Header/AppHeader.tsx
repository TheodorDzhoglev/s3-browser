import classes from "./AppHeader.module.css"
import { logoutIcon } from "../../../utils/svgIcons"
import { useAppContext } from "../../../context/context"
import { removeFromLocalStorage } from "../../../utils/localStorage"

const {
    app_header,
    header_content,
    header_logout
} = classes;

const AppHeader = () => {

    const { setCredentials } = useAppContext();

    const onLogoutHandler = () => {
        setCredentials(null);
        removeFromLocalStorage();
    }

    return (
        <div className={app_header}>
            <h1 className={header_content}>Filespace dashboard</h1>
            <button className={header_logout} onClick={onLogoutHandler} aria-label="disconnect from bucket" title="disconnect from bucket">{logoutIcon}</button>
        </div>
    );
};

export default AppHeader;
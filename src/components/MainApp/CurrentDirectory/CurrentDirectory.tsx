import classes from "./CurrentDirectory.module.css"
import CurrentDirectoryHeader from "./CurrentDirectoryHeader"
import Directory from "./Directory"


type Props = {
    className: string
}

const { 
    main_container,
} = classes

const CurrentDirectory = ({ className }: Props) => {

    return (
        <div className={className}>
            <div className={main_container}>
                <CurrentDirectoryHeader />
                <Directory />
            </div>
        </div>
    )
}

export default CurrentDirectory


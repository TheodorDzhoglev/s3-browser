import classes from "./CurrentDirectory.module.css"
import CurrentDirectoryHeader from "./CurrentDirectoryHeader"
import Directory from "./Directory"
import { useDirContext } from "../../../context/dirContext"
import { useState } from "react"


type Props = {
    className: string
}

const { 
    main_container,
} = classes

const CurrentDirectory = ({ className }: Props) => {

    const [selectedFile, setSelectedFile] = useState('')
    const {dirMap, currentDir} = useDirContext()

    return (
        <div className={className}>
            <div className={main_container}>
                <CurrentDirectoryHeader />
                <Directory 
                    dirContent={dirMap[currentDir]}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
            </div>
        </div>
    )
}

export default CurrentDirectory


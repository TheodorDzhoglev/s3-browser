import classes from "./CurrentDirectory.module.css"
import CurrentDirectoryHeader from "./CurrentDirectoryHeader"
import Directory from "./Directory"
import { useDirContext } from "../../../context/dirContext"
import { useState } from "react"
import { SelectItemType } from "../../../utils/types"


type Props = {
    className: string
}

const { 
    main_container,
} = classes

const CurrentDirectory = ({ className }: Props) => {

    const [selectedFile, setSelectedFile] = useState<SelectItemType>()
    const {dirMap, currentDir} = useDirContext()

    return (
        <div className={className}>
            <div className={main_container}>
                <CurrentDirectoryHeader selectedFile={selectedFile}/>
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


import classes from "./CurrentDirectory.module.css"
import CurrentDirectoryHeader from "./CurrentDirectoryHeader"
import Directory from "./Directory"
import { useDirContext } from "../../../context/dirContext"
import { useState } from "react"
import { SelectItemType } from "../../../utils/types"
import CurrentDirectoryContext from "../../../context/CurrentDirContext"


type Props = {
    className: string;
    isLoading: boolean;
}

const {
    main_container,
} = classes

const CurrentDirectory = ({ className, isLoading }: Props) => {

    const [selectedFile, setSelectedFile] = useState<SelectItemType>()
    const { dirMap, currentDir } = useDirContext()

    return (
        <div className={className}>
            <div className={`${main_container} ${isLoading ? 'animate_bg' : ''} `}>
                {
                    isLoading
                        ? []
                        : <CurrentDirectoryContext>
                            <CurrentDirectoryHeader selectedFile={selectedFile} />
                            <Directory
                                dirContent={dirMap[currentDir]}
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
                        </CurrentDirectoryContext>
                }
            </div>
        </div>
    )
}

export default CurrentDirectory


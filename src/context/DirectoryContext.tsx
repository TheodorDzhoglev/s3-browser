import { PropsWithChildren, useState } from "react"
import { DirContext } from "./dirContext"
import { DirMap, Dir } from "../utils/types"


const DirectoryContext = ({ children }: PropsWithChildren) => {

    const [currentDirItems, setCurrentDirItems] = useState<Dir>()
    const [parentDir, setParentDir] = useState<Dir>()
    const [dirMap, setDirMap] = useState<DirMap>({})
    const [currentDir, setCurrentDir] = useState('')

    const value = {
        currentDirItems,
        setCurrentDirItems,
        currentDir,
        setCurrentDir,
        parentDir,
        setParentDir,
        dirMap,
        setDirMap
    }

    return (
        <DirContext.Provider value={value}>
            {children}
        </DirContext.Provider>
    )
}
export default DirectoryContext
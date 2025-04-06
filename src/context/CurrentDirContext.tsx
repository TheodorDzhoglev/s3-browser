import { PropsWithChildren, useRef, useState } from "react"
import { CurrDirContext } from "./currDirContext"
import { ReactNode } from "react"


const CurrentDirectoryContext = ({ children }: PropsWithChildren) => {

    const [modalElement, setModalElement] = useState<ReactNode>();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const value = {
        modalElement,
        setModalElement,
        dialogRef
    }

    return (
        <CurrDirContext.Provider value={value}>
            {children}
        </CurrDirContext.Provider>
    )
}
export default CurrentDirectoryContext
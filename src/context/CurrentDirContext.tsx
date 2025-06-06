import { PropsWithChildren, useRef, useState } from "react"
import { CurrDirContext } from "./currDirContext"
import { ReactNode } from "react"
import { Dir } from "../utils/types"


const CurrentDirectoryContext = ({ children }: PropsWithChildren) => {

    const [modalElement, setModalElement] = useState<ReactNode>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [filteredContent, setFilteredContent] = useState<Dir | null>(null);

    const value = {
        modalElement,
        setModalElement,
        dialogRef,
        filteredContent, 
        setFilteredContent
    };

    return (
        <CurrDirContext.Provider value={value}>
            {children}
        </CurrDirContext.Provider>
    )
}
export default CurrentDirectoryContext;
import { createContext, ReactNode, useContext, RefObject } from "react";
import { Dir } from "../utils/types";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type ContextType = {
    modalElement: ReactNode;
    setModalElement: StateSetter<ReactNode>;
    dialogRef: RefObject<HTMLDialogElement | null>;
    filteredContent: Dir | null;
    setFilteredContent: React.Dispatch<React.SetStateAction<Dir | null>>;
}
export const CurrDirContext = createContext<ContextType | null>(null);

export const useCurrDirContext = () => {
    const data = useContext(CurrDirContext);
    if (!data) throw new Error("useAppContext must be used within a Provider");
    
    return data;
}

export const toggleDialog = (dialog: RefObject<HTMLDialogElement | null>) => {
    if (!dialog.current) return;
    if (dialog.current.hasAttribute('open')) {
        dialog.current.close();
    }
    else {
        dialog.current.showModal();
    }
}

export const openDialog = (dialog: RefObject<HTMLDialogElement | null>) => {
    if (!dialog.current) return;
    dialog.current.showModal();
}
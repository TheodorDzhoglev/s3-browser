import { createContext, useContext } from "react";
import { Dir, DirMap } from "../utils/types";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type ContextType = {
    currentDirItems: Dir | undefined;
    setCurrentDirItems: StateSetter<Dir>;
    parentDir: Dir | undefined;
    setParentDir: StateSetter<Dir>;
    dirMap: DirMap | Record<string, never>;
    setDirMap: React.Dispatch<React.SetStateAction<DirMap | Record<string, never>>>;
    currentDir: string;
    setCurrentDir:  React.Dispatch<React.SetStateAction<string>>;
    loadingObj: string[];
    setLoadingObj:  React.Dispatch<React.SetStateAction<string[]>>;
}

export const DirContext = createContext<ContextType | null>(null)

export const useDirContext = () => {
    const data = useContext(DirContext)
    if (!data) throw new Error("useAppContext must be used within a Provider")
    
    return data
}
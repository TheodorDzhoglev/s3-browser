import { useMemo, useState } from "react"
import { _Object } from '@aws-sdk/client-s3'
import { adaptData, removeFiles } from "./dataTransformUtls";
import { BucketItemType, Dir } from "./types";

type FlagsType = {
    type: boolean;
    name: boolean;
    date: boolean;
}

type ObjectType = {
    key: string,
    type: 'folder' | 'file',
    LastModified: Date | undefined,
    data?: BucketItemType[] | undefined
}

type useSortType = (content: Dir | undefined) => {
    sortedContent: ObjectType[] | undefined;
    sortByType: () => void;
    sortByName: () => void;
    sortByDate: () => void;
}

const defaultFlags: FlagsType = {
    type: false,
    name: false,
    date: false
}

const sortType = (type: boolean, fol: ObjectType[], fil:ObjectType[]) => {
    return type  ? [...fil, ...fol] : [...fol, ...fil]
}

const sortName = (type: boolean, data: ObjectType[]) => {
    if (type) {
        return data.sort((a, b) => a.key > b.key ? 1 : -1)
    }
    else {
        return data.sort((a, b) => a.key > b.key ? -1 : 1)
    }
}

const sortDate = (type: boolean, data: ObjectType[]) => {
    if (type) {
        return data.sort((a, b) => {
            if (a.LastModified && b.LastModified) {
                return a.LastModified.getTime() - b.LastModified.getTime()
            }
            return 1
        })
    }
    else {
        return data.sort((a, b) => {
            if (a.LastModified && b.LastModified) {
                return b.LastModified.getTime() - a.LastModified.getTime()
            }
            return -1
        })
    }
}



export const useSort: useSortType = (content) => {

    const [sortedContent, setSortedContent] = useState<ObjectType[]>();
    const [flags, setFlags] = useState(defaultFlags);

    const { folders, files } = useMemo(() => {
        const folders: ObjectType[] = [];
        const files: ObjectType[] = [];
        let refactoredRows: ObjectType[] = [];

        if (content) {
            refactoredRows = Object.keys(content).map(objKey => {
                if (content[objKey] instanceof Date) {
                    const file: ObjectType = {
                        key: objKey,
                        type: 'file',
                        LastModified: content[objKey]
                    }
                    files.push(file);
                    return file;
                }
                else {
                    const folder: ObjectType = {
                        key: objKey,
                        type: 'folder',
                        LastModified: content[objKey] ? content[objKey][0]['LastModified'] : undefined,
                        data: content[objKey] ? content[objKey] : undefined
                    }
                    folders.push(folder);
                    return folder;
                }
            })
        }

        if(flags.type) setSortedContent(sortType(!flags.type, folders, files))
        if(flags.name) setSortedContent(sortName(!flags.name, refactoredRows))
        if(flags.date) setSortedContent(sortDate(!flags.date, refactoredRows))
        if(!flags.type && !flags.date && !flags.name) setSortedContent(refactoredRows)

        return { folders, files };
    }, [content]);

    const sortByType = () => {
        if (flags.type) {
            setSortedContent([...folders, ...files])
            setFlags({ name: false, date: false, type: false } )
        }
        else {
            setSortedContent([...files, ...folders])
            setFlags({ name: false, date: false, type: true })
        }

    };

    const sortByName = () => {
        if (flags.name) {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return sortName(true, newState)
                }
                return prevState
            })
            setFlags({ type: false, date: false, name: false })
        }
        else {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return sortName(false, newState)
                }
                return prevState
            })
            setFlags({ type: false, date: false, name: true })
        }
    };

    const sortByDate = () => {
        if (flags.date) {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return sortDate(true, newState)
                }
                return prevState

            })
            setFlags({ type: false, name: false, date: false })
        }
        else {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return sortDate(false, newState)
                }
                return prevState

            })
            setFlags({ type: false, name: false, date: true })
        }
    }

    return {
        sortedContent,
        sortByType,
        sortByName,
        sortByDate
    }

}

export const useAdaptData = (contents: _Object[] | BucketItemType[] | undefined, dir: string) => {
    return useMemo(() => adaptData(contents, dir), [contents, dir])
}

export const useRemoveFiles = (data: Record<string, Date | BucketItemType[] | undefined> | undefined) => {
    const foldersInDirectory = useMemo(() => removeFiles(data), [data])
    const shouldRender = foldersInDirectory ? !!Object.keys(foldersInDirectory).length : false

    return {
        foldersInDirectory,
        shouldRender
    }
}   
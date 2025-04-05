import { useMemo, useState } from "react"
import { _Object } from '@aws-sdk/client-s3'
import { adaptData, removeFiles } from "./dataTransformUtls";
import { BucketItemType, Dir } from "./types";

type flagsType = {
    type: 'folders' | 'files';
    name: 'asc' | 'desc';
    date: 'asc' | 'desc';
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

const defaultFlags: flagsType = {
    type: 'folders',
    name: 'desc',
    date: 'asc'
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
                    files.push(file)
                    return file
                }
                else {
                    const folder: ObjectType = {
                        key: objKey,
                        type: 'folder',
                        LastModified: content[objKey] ? content[objKey][0]['LastModified'] : undefined,
                        data: content[objKey] ? content[objKey] : undefined
                    }
                    folders.push(folder)
                    return folder
                }
            })
        }

        setSortedContent(refactoredRows)
        return { folders, files };
    }, [content]);

    const sortByType = () => {
        if (flags.type === 'folders') {
            setSortedContent([...folders, ...files])
            setFlags(prevState => { return { ...prevState, type: 'files' } })
        }
        else {
            setSortedContent([...files, ...folders])
            setFlags(prevState => { return { ...prevState, type: 'folders' } })
        }

    };

    const sortByName = () => {
        if (flags.name === 'asc') {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return newState.sort((a, b) => a.key > b.key ? 1 : -1)
                }
                return prevState
            })
            setFlags(prevState => { return { ...prevState, name: 'desc' } })
        }
        else {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return newState.sort((a, b) => a.key > b.key ? -1 : 1)
                }
                return prevState
            })
            setFlags(prevState => { return { ...prevState, name: 'asc' } })
        }
    };

    const sortByDate = () => {
        if (flags.date === 'asc') {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return newState.sort((a, b) => {
                        if (a.LastModified && b.LastModified) {
                            return a.LastModified.getTime() - b.LastModified.getTime()
                        }
                        return 1
                    })
                }
                return prevState

            })
            setFlags(prevState => { return { ...prevState, date: 'desc' } })
        }
        else {
            setSortedContent(prevState => {
                if (prevState) {
                    const newState = [...prevState]
                    return newState.sort((a, b) => {
                        if (a.LastModified && b.LastModified) {
                            return b.LastModified.getTime() - a.LastModified.getTime()
                        }
                        return 1
                    })
                }
                return prevState

            })
            setFlags(prevState => { return { ...prevState, date: 'asc' } })
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
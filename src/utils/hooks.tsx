import { useMemo, useState } from "react"
import { _Object } from '@aws-sdk/client-s3'
import { BucketItemType } from "./types";
import { adaptData, removeFiles } from "./dataTransformUtls";

type useSortType = (content: _Object[] | undefined) => {
    sortedContent: _Object[] | undefined;
    sortByType: () => void;
    sortByName: () => void;
    sortByDate: () => void;
}

type flagsType = {
    type: 'folders' | 'files';
    name: 'asc' | 'desc';
    date: 'asc' | 'desc';
}

const defaultFlags: flagsType= {
    type: 'folders',
    name: 'desc',
    date: 'asc'
}

export const useSort: useSortType = (content) => {
    const [sortedContent, setSortedContent] = useState(content);
    const [flags, setFlags] = useState(defaultFlags);

    const [folders, files] = useMemo(() => {
        const fol: _Object[] = [];
        const fil: _Object[] = [];
        content?.forEach(c => c.Key?.includes('/') ? fol.push(c) : fil.push(c));
        return [fol, fil];
    }, [content]);

    const sortByType = () => {
        if (flags.type === 'folders') {
            setSortedContent([...folders, ...files]);
            setFlags({
                ...defaultFlags,
                type: 'files'
            });
        }
        else {
            setSortedContent([...files, ...folders]);
            setFlags({
                ...defaultFlags,
                type: 'folders'
            });
        };
    };

    const sortByName = () => {
        if (!content) return;
        if (flags.name === 'asc') {
            setSortedContent(content);
            setFlags({
                ...defaultFlags,
                name: 'desc'
            });
        }
        else {
            const sortedNames: _Object[]= [];
            content.forEach(c => sortedNames.unshift(c));
            setSortedContent(sortedNames);
            setFlags({
                ...defaultFlags,
                name: 'asc'
            });
        };
    };

    const sortByDate = () => {
        if(!content) return
        if(flags.date === 'asc'){
            const sortedArr = content.sort((a, b) => {
                if(a.LastModified && b.LastModified){
                    return a.LastModified?.getTime() - b.LastModified?.getTime()
                }
                return 1
            })
            setSortedContent(sortedArr)
            setFlags({
                ...defaultFlags,
                date: 'desc'
            });
        }
        else{
            const sortedArr = content.sort((a, b) => {
                if(a.LastModified && b.LastModified){
                    return b.LastModified?.getTime() - a.LastModified?.getTime()
                }
                return -1
            })
            setSortedContent(sortedArr)
            setFlags({
                ...defaultFlags,
                date: 'asc'
            });
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
    const foldersInDirectory =  useMemo(() => removeFiles(data), [data])
    const shouldRender = foldersInDirectory ? !!Object.keys(foldersInDirectory).length : false

    return {
        foldersInDirectory,
        shouldRender
    }
}   
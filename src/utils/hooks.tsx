import { useMemo, useState, useRef, useEffect, MouseEvent } from "react"
import { _Object } from '@aws-sdk/client-s3'
import { adaptData, removeFiles, } from "./dataTransformUtls";
import { BucketItemType, Dir, ObjectType } from "./types";
import { sortDate, sortName, sortType } from "./dataTransformUtls";
import { useDirContext } from "../context/dirContext";

type FlagsType = {
    type: 'file' | 'folder' | '';
    name: 'asc' | 'desc' | '';
    date: 'asc' | 'desc' | '';
}

type useSortType = (content: Dir | undefined | null) => {
    sortedContent: ObjectType[] | undefined;
    sortByType: () => void;
    sortByName: () => void;
    sortByDate: () => void;
}

const defaultFlags: FlagsType = {
    type: '',
    name: 'asc',
    date: ''
}

export const useSort: useSortType = (content) => {

    const [adaptContent, setAdaptContent] = useState<ObjectType[]>([]);
    const [flags, setFlags] = useState(defaultFlags);

    const { folders, files } = useMemo(() => {
        const folders: ObjectType[] = [];
        const files: ObjectType[] = [];
        let refactoredRows: ObjectType[] = [];

        if (content) {
            refactoredRows = Object.keys(content).reduce((obj: ObjectType[], objKey) => {
                if(objKey){
                    if (content[objKey] instanceof Date) {
                        const file: ObjectType = {
                            key: objKey,
                            type: 'file',
                            LastModified: content[objKey]
                        }
                        files.push(file);
                        obj.push(file)
                        return obj;
                    }
                    else {
                        const folder: ObjectType = {
                            key: objKey,
                            type: 'folder',
                            LastModified: content[objKey] ? content[objKey][0]['LastModified'] : undefined,
                            data: content[objKey] ? content[objKey] : undefined
                        }
                        folders.push(folder);
                        obj.push(folder)
                        return obj;
                    }
                }
                return obj
            }, [])
        }

        setAdaptContent(refactoredRows)
        return { folders, files };
    }, [content]);


    const sortedContent = useMemo(() => {
        const sort = (flags: FlagsType, data: ObjectType[]) => {
            switch (true) {
                case flags.name === 'asc':
                    return sortName(true, data)
                case flags.name === 'desc':
                    return sortName(false, data)
                case flags.type === 'folder':
                    return sortType(true, folders, files)
                case flags.type === 'file':
                    return sortType(false, folders, files)
                case flags.date === 'asc':
                    return sortDate(true, data)
                case flags.date === 'desc':
                    return sortDate(false, data)

                default:
                    return data
            }
        }
        return sort(flags, adaptContent)

    }, [flags, adaptContent, folders, files])

    const sortByType = () => {
        if (flags.type === 'folder') {
            setFlags({ name: '', date: '', type: 'file' })
        }
        else {
            setFlags({ name: '', date: '', type: 'folder' })
        }

    };

    const sortByName = () => {
        if (flags.name === 'asc') {
            setFlags({ type: '', date: '', name: 'desc' })
        }
        else {
            setFlags({ type: '', date: '', name: 'asc' })
        }
    };

    const sortByDate = () => {
        if (flags.date === 'asc') {
            setFlags({ type: '', name: '', date: 'desc' })
        }
        else {
            setFlags({ type: '', name: '', date: 'asc' })
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

export const useFindOpenDirParents = (foldersInDirectory: Record<string, BucketItemType[] | undefined>) => {
    const { currentDir } = useDirContext()

    const isParentOfOpenDir = useMemo(() => {
        const childKeysArr = Object.keys(foldersInDirectory)
        const currentLevel = childKeysArr[0] ? childKeysArr[0].split('/').length : 0
        const openDirArr = currentDir.split('/')
        openDirArr.splice(currentLevel)
        const openDirSection = openDirArr.join('/')
        return childKeysArr.some( dir => dir === openDirSection)
    }, [foldersInDirectory, currentDir])

    return isParentOfOpenDir
}

//Request Animation frame to mimic setTimout in order to use onClick and onDoubleClick 

const noop = () => {};

type RequestTimeoutFnType = (e?: MouseEvent<HTMLButtonElement>) => void

type requestTimeoutType = (fn: RequestTimeoutFnType, delay: number, registerCancel: (fn:()=>void)=> void) => void
type useClickPreventionType = (onClick: RequestTimeoutFnType, onDoubleClick: ()=>void, delay: number) => {handleClick: (()=>void), handleDoubleClick: (()=>void)}

const requestTimeout: requestTimeoutType = (fn, delay, registerCancel)  => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn();
      registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
};

const newNoop = () => {}

const useCancelableScheduledWork = () => {
  const cancelCallback = useRef(newNoop);
  const registerCancel = (fn: ()=>void) => cancelCallback.current = fn;
  const cancelScheduledWork = () => cancelCallback.current();

  useEffect(() => {
    return cancelScheduledWork;
  }, []);

  return {registerCancel, cancelScheduledWork};
};

export const useClickPrevention: useClickPreventionType = ( onClick, onDoubleClick, delay = 300 ) => {
  const {registerCancel, cancelScheduledWork} = useCancelableScheduledWork();

  const handleClick = () => {
    cancelScheduledWork();
    requestTimeout(onClick, delay, registerCancel);
  };

  const handleDoubleClick = () => {
    cancelScheduledWork();
    onDoubleClick();
  };

  return {handleClick, handleDoubleClick};
};
import { _Object } from "@aws-sdk/client-s3";
import { BucketItemType, ObjectType } from "./types";


export const adaptData = (contents: _Object[] | BucketItemType[] | undefined, dir: string) => {
    return contents?.reduce<Record<string, BucketItemType[] | Date | undefined>>((obj, c) => {

        let pathArr: string[] = [];

        if ('ChecksumType' in c && c.Key) {
            pathArr = c.Key.replace('/', '').split('/')
        }
        else {
            if (c.Key && c.Key instanceof Array) {
                pathArr = c.Key;
            }
        }

        if (pathArr.length > 1) {
            const cloneArr = structuredClone(pathArr)
            const folderKey = cloneArr.shift()
            const fullPath = dir === '/' ? `/${folderKey}` : `${dir}/${folderKey}`
            if (folderKey && !(obj[fullPath] instanceof Date)) {
                if (obj[fullPath]) {
                    obj[fullPath].push({ Key: cloneArr, LastModified: c.LastModified })
                }
                else {
                    obj[fullPath] = [{ Key: cloneArr, LastModified: c.LastModified }]
                }
            }
        }
        else {
            obj[pathArr[0]] = c.LastModified
        }

        return obj
    }, {})
}

export const removeFiles = (data: Record<string, Date | BucketItemType[] | undefined> | undefined) => {
    const folders: Record<string, BucketItemType[] | undefined> | undefined = {}
    for (const key in data) {
        if (data[key] instanceof Array) folders[key] = data[key]
    }
    return folders
}   

export const findParentDir = (dir: string) => {
    const dirArr = dir.split('/')
    dirArr.pop()
    const parentDir = dirArr.length > 1 ? dirArr.join('/') : '/'
    return parentDir
}

export const findCurrentDir = (dir: string) => {
    const dirArr = dir.split('/')
    return dirArr.pop()
}

export const sortType = (type: boolean, fol: ObjectType[], fil:ObjectType[]) => {
    return type  ? [...fil, ...fol] : [...fol, ...fil]
}

const rmSlash = (string: string) => {
    return  /^\//.test(string) ? string.replace('/', '') : string
}

export const sortName = (type: boolean, data: ObjectType[]) => {
    if (type) {
        return data.sort((a, b) => rmSlash(a.key).toLocaleLowerCase() > rmSlash(b.key).toLocaleLowerCase() ? 1 : -1)
    }
    else {
        return data.sort((a, b) => rmSlash(a.key).toLocaleLowerCase() > rmSlash(b.key).toLocaleLowerCase() ? -1 : 1)
    }
}

export const sortDate = (type: boolean, data: ObjectType[]) => {
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

export const uriEncode = (key: string) => {
    return key.replace(/[&$@=;:+,?]/g, match => encodeURIComponent(match)).trim()
}   

export const sanitize = (key: string) => {
    return key.replace(/[\\/{}^%`"[\]<>|#~\x80-\xFF]|\.$/g, '')
}   
export type s3DataType = {
    bucket: string,
    key: string,
    secret: string
}

export type BucketItemType = {
    Key: string[] | undefined,
    LastModified: Date | undefined
    BucketItemType? : string
}

export type Dir = Record<string, BucketItemType[] | Date | undefined>

export type DirMap = Record<string, Record<string, BucketItemType[] | Date | undefined> | undefined>

export type SelectItemType = { 
    name: string, 
    type: 'file' | 'folder' | ''; 
}

export type ObjectType = {
    key: string,
    type: 'folder' | 'file',
    LastModified: Date | undefined,
    data?: BucketItemType[] | undefined
}
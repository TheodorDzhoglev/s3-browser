export type s3DataType = {
    bucket: string,
    key: string,
    secret: string
}

export type BucketItemType = {
    Key: string[] | undefined,
    LastModified: Date | undefined
}

export type Dir = Record<string, BucketItemType[] | Date | undefined>

export type DirMap = Record<string, Record<string, BucketItemType[] | Date | undefined> | undefined>
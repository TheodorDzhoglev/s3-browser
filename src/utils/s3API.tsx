import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { s3DataType } from "./types"

export const createS3Client = (credentials: s3DataType) => {
    const { key, secret } = credentials
    const s3 = new S3Client({
        region: 'eu-west-1',
        credentials: {
            accessKeyId: key,
            secretAccessKey: secret
        },
    })
    return s3
}

export const listBucket = async (client: S3Client, bucket: string, dir: string = '') => {    
    const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: dir })
    return await client.send(command)
}

export const createObject = async (client: S3Client, body: string, key: string, bucket: string) => {
    const command = new PutObjectCommand({
        Body: body,
        Bucket: bucket,
        Key: `${key}.txt`
    })
    return client.send(command)
}

export const getObject = async (client: S3Client, key: string, bucket: string) => {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    })
    const response = await client.send(command)
    return response.Body.transformToString();
}

export const deleteObject = async (client: S3Client, key: string, bucket: string) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key
    })
    return client.send(command)
}
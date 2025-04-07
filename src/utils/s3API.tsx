import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3"
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
    try{
        const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: dir })
        return await client.send(command)
    }
    catch(error){
        console.log(error)
    }
}

export const createObject = async (client: S3Client, body: string, key: string, bucket: string) => {
    try{
        const command = new PutObjectCommand({
            Body: body,
            Bucket: bucket,
            Key: key
        })
        return await client.send(command)
    }
    catch(error){
        console.log(error)
        return error
    }
}

export const getObject = async (client: S3Client, key: string, bucket: string) => {
    try{
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        })
        const response = await client.send(command)
        return response.Body ? response.Body.transformToString() : '';
    }
    catch(error){
        console.log(error)
        return error
    }
}
export const deleteObjects = async (client: S3Client, items: { Key: string | undefined }[], bucket: string) => {
    try{
        const command = new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: {
                Objects: items
            }
        })
        return await client.send(command)
    }
    catch(error){
        console.log(error)
    }
}
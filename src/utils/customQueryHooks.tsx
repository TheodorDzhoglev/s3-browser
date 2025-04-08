import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createObject, getObject, listBucket } from "./s3API"
import { useAppContext } from "../context/context"
import { useDirContext } from "../context/dirContext"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"
import { FormEvent } from 'react'
import { openDialog, useCurrDirContext } from "../context/currDirContext"
import ErrorModal from "../components/Modal/ErrorModal"
import { uriEncode } from "./dataTransformUtls"

export const useFetchList = () => {

    const { s3client, credentials } = useAppContext()
    if (!s3client || !credentials) throw new Error('Use useCustomQuery only in Main App')
    const { bucket } = credentials

    const { isLoading, error, data } = useQuery({
        queryKey: ['list'],
        queryFn: () => listBucket(s3client, bucket),

    })

    return {
        isLoading,
        error,
        data
    }
}

export const useFetchObj = (keyName: string) => {

    const { s3client, credentials } = useAppContext()
    if (!s3client || !credentials) throw new Error('Use useCustomQuery only in Main App')
    const { bucket } = credentials

    const { isLoading, error, data } = useQuery({
        queryKey: ['list', keyName],
        queryFn: () => getObject(s3client, keyName, bucket),
    })

    return {
        isLoading,
        error,
        data: typeof data === 'string' ? data : ''
    }
}

export const useAddObject = () => {

    const queryClient = useQueryClient()
    const { s3client, credentials } = useAppContext()
    const { setLoadingObj } = useDirContext()
    const { dialogRef, setModalElement } = useCurrDirContext()

    if (!credentials || !s3client) return { createNewObject: () => { } }

    const createNewObject = async (e: FormEvent, name: string, fullName: string, text: string) => {
        e.preventDefault();

        queryClient.setQueryData(['list'], (data: ListObjectsV2Output) => {
            return {
                ...data,
                Contents: [
                    ...(data.Contents || []), 
                    { Key: fullName, LastModified: new Date, ChecksumType: "FULL_OBJECT" }
                ].sort((a, b) => a.Key && b.Key && a.Key.toLocaleLowerCase() > b.Key.toLocaleLowerCase() ? 1 : -1),
                    
            }
        })

        setLoadingObj(prevState => [...prevState, fullName])
        const data = await createObject(s3client, text.trim(), uriEncode(fullName), credentials.bucket)
        setLoadingObj(prevState => prevState.filter(name => name !== fullName))
        
        if (data instanceof Error) {
            setModalElement(<ErrorModal key={Math.random()} text={`Something went wrong while creating '${name}'.`} />)
            openDialog(dialogRef)
            queryClient.setQueryData(['list'], (data: ListObjectsV2Output) => {
                return {
                    ...data,
                    Contents: data.Contents?.filter(obj => obj.Key !== fullName),
                }
            })

        }
    }

    return {
        createNewObject,
    }
}
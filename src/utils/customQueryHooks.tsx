import { useQuery } from "@tanstack/react-query"
import { getObject, listBucket } from "./s3API"
import { useAppContext } from "../context/context"

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
        data
    }
}
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { listBucket } from "./s3API"
import { useAppContext } from "../context/context"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"

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

export const useCachedList = () => {
    const queryClient = useQueryClient()
    const { Contents } = queryClient.getQueryData(['list']) as ListObjectsV2Output
    return Contents
}

export const useFetchFolder = (dir: string) => {

    const { s3client, credentials } = useAppContext()
    if (!s3client || !credentials) throw new Error('Use useCustomQuery only in Main App')
    const { bucket } = credentials

    const { isLoading, error, data } = useQuery({
        queryKey: ['list', dir],
        queryFn: () => listBucket(s3client, bucket, dir),
        enabled: !!dir
    })

    return {
        isLoading,
        error,
        data
    }
}

export const useCachedFolder = (dir: string) => {
    const queryClient = useQueryClient()
    const { Contents } = queryClient.getQueryData(['list', dir]) as ListObjectsV2Output
    return Contents
}
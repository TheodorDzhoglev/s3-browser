import { PropsWithChildren, useState } from "react"
import { s3DataType } from "../utils/types"
import { Context } from "./context"
import { ListObjectsV2CommandOutput, S3Client } from "@aws-sdk/client-s3"

const AppContext = ({ children }: PropsWithChildren) => {

    const [credentials, setCredentials] = useState<s3DataType>()
    const [s3client, sets3Client] = useState<S3Client>()
    const [bucketList, setBucketList] = useState<ListObjectsV2CommandOutput>()
    const [error, setError] = useState<Error>()

    const value = {
        credentials,
        setCredentials,
        s3client, 
        sets3Client,
        bucketList,
        setBucketList,
        error,
        setError,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
export default AppContext
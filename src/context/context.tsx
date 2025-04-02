import { createContext, useContext } from "react";
import { s3DataType } from "../utils/types";
import { S3Client } from "@aws-sdk/client-s3";
import { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type ContextType = {
    credentials: s3DataType | undefined;
    setCredentials: StateSetter<s3DataType>;
    s3client: S3Client | undefined;
    sets3Client: StateSetter<S3Client>;
    bucketList: ListObjectsV2CommandOutput | undefined;
    setBucketList: StateSetter<ListObjectsV2CommandOutput>
    error: Error | undefined;
    setError: StateSetter<Error>;
}

export const Context = createContext<ContextType | null>(null)

export const useAppContext = () => {
    const data = useContext(Context)
    if (!data) throw new Error("useAppContext must be used within a Provider")
    
    return data
}
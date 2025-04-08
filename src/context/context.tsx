import { createContext, useContext } from "react";
import { s3DataType } from "../utils/types";
import { S3Client } from "@aws-sdk/client-s3";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type ContextType = {
    credentials: s3DataType | null;
    setCredentials: React.Dispatch<React.SetStateAction<s3DataType | null>>;
    s3client: S3Client | undefined;
    sets3Client: StateSetter<S3Client>;
    error: Error | undefined;
    setError: StateSetter<Error>;
}

export const Context = createContext<ContextType | null>(null);

export const useAppContext = () => {
    const data = useContext(Context);
    if (!data) throw new Error("useAppContext must be used within a Provider");
    
    return data;
}
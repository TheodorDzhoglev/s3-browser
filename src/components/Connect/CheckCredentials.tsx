import { PropsWithChildren, useLayoutEffect } from "react"
import ConnectModal from "./ConnectModal"
import { getData } from "../../utils/localStorage"
import { useAppContext } from "../../context/context"
import { createS3Client } from "../../utils/s3API"

const CheckCredentials = ({ children }: PropsWithChildren) => {

    const { credentials, setCredentials, sets3Client } = useAppContext();

    useLayoutEffect(() => {
        const storedCredentials = getData();
        if(storedCredentials){
            setCredentials(storedCredentials);
            sets3Client(createS3Client(storedCredentials));
        }
    }, [setCredentials, sets3Client]);

    return (
        credentials
         ? children 
         : <ConnectModal />
    );
};

export default CheckCredentials;
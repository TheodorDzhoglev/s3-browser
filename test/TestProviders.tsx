import React,  { ReactNode, useEffect } from 'react'
import AppContext from '../src/context/AppContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CurrentDirectoryContext from '../src/context/CurrentDirContext'
import DirectoryContext from '../src/context/DirectoryContext'
import { useAppContext } from '../src/context/context'
import { createS3Client } from '../src/utils/s3API'
import { addToLocalStorage } from '../src/utils/localStorage'

type Props = {
    children: ReactNode
}

const credential = { bucket: 'asdasdw', key: 'asdasdasd', secret: 'asdasdasd' }

const ParentComponent = ({ children }: Props) => {

    const { setCredentials, sets3Client } = useAppContext()
    useEffect(() => {
        setCredentials(credential)
        sets3Client(createS3Client(credential))
    }, [setCredentials, sets3Client])

    return (children)
}

const queryClient = new QueryClient()
const TestProviders = ({ children }: Props) => {
    addToLocalStorage(credential)
    return (
        <QueryClientProvider client={queryClient}>
            <AppContext>
                <DirectoryContext>
                    <CurrentDirectoryContext>
                        <ParentComponent>
                            {children}
                        </ParentComponent>
                    </CurrentDirectoryContext>
                </DirectoryContext>
            </AppContext>
        </QueryClientProvider>
    )
}

export default TestProviders
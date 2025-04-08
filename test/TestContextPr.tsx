import React, { ReactNode } from 'react'
import AppContext from '../src/context/AppContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CurrentDirectoryContext from '../src/context/CurrentDirContext'
import DirectoryContext from '../src/context/DirectoryContext'

type Props = {
    children: ReactNode
}

const queryClient = new QueryClient()
const TestContextPr = ({ children }: Props) => {

    return (
        <QueryClientProvider client={queryClient}>
            <AppContext>
                <DirectoryContext>
                    <CurrentDirectoryContext>
                        {children}
                    </CurrentDirectoryContext>
                </DirectoryContext>
            </AppContext>
        </QueryClientProvider>
    )
}

export default TestContextPr
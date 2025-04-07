import { ReactNode } from "react";
import AppContext from "../context/AppContext";

type Props = {
    children: ReactNode
}

const TestProviders = ({children}: Props) => {
    return (
        <AppContext>
            {children}
        </AppContext>
    )
}

export default TestProviders
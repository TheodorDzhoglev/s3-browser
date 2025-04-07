// import { render, screen } from '@testing-library/react'
// import { describe, it, expect } from 'vitest'
// import '@testing-library/jest-dom/vitest'
// import ConnectForm from "./ConnectForm";
// import TestProviders from "../../utils/testUtls";

// describe('Connect Form', () => {
//     it('Renders a form to connect to the bucket', () => {
//         render(
//             <TestProviders>
//                 <ConnectForm />
//             </TestProviders>
//         )
//             ;
//         expect(screen.getByText('Bucket')).toBeInTheDocument();
//         expect(screen.getByText('Access Key')).toBeInTheDocument();
//         expect(screen.getByText('Secret Access Key')).toBeInTheDocument();
//         expect(screen.getByLabelText('bucket')).toBeInTheDocument();
//         expect(screen.getByLabelText('key')).toBeInTheDocument();
//         expect(screen.getByLabelText('secret')).toBeInTheDocument();
//     })
// })
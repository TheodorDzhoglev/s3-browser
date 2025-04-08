import React from 'react';
import { render, screen } from '@testing-library/react'
import ConnectForm from '../src/components/Connect/ConnectForm'
import '@testing-library/jest-dom/vitest'
import TestProviders from './TestProviders';

describe('Connect Form', () => {
    it('Renders a form to connect to the bucket', () => {
        render(
            <TestProviders>
                <ConnectForm />
            </TestProviders>
        )
            ;

        expect(screen.getByLabelText('Bucket')).toBeInTheDocument();
        expect(screen.getByLabelText('Access Key')).toBeInTheDocument();
        expect(screen.getByLabelText('Secret Access Key')).toBeInTheDocument();
        expect(screen.getByLabelText('submit form')).toBeInTheDocument();
    })
})
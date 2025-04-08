import React from 'react';
import { render, screen } from '@testing-library/react'
import CheckCredentials from '../src/components/Connect/CheckCredentials'
import MainApp from '../src/components/MainApp/MainApp'
import '@testing-library/jest-dom/vitest'
import TestProviders from './TestProviders';
import { addToLocalStorage, removeFromLocalStorage } from '../src/utils/localStorage';
import TestContextPr from './TestContextPr';

describe('Credentials check', () => {
    it('render children when credentials are available', () => {
        addToLocalStorage({ bucket: 'asdasdw', key: 'asdasdasd', secret: 'asdasdasd' })
        render(
            <TestProviders>
                <CheckCredentials>
                    <MainApp />
                </CheckCredentials>
            </TestProviders>
        )

        expect(screen.getByText('Filespace dashboard')).toBeInTheDocument()
    });

    it('render form when credentials are unavailable', () => {
        removeFromLocalStorage()
        render(
            <TestContextPr>
                <CheckCredentials>
                    <MainApp />
                </CheckCredentials>
            </TestContextPr>
        )
        expect(screen.getByText('S3 Browser')).toBeInTheDocument()
        screen.debug()
    })
})
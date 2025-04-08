import React from 'react';
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import TestProviders from './TestProviders';
import { SelectItemType } from '../src/utils/types';
import CurrentDirectoryHeader from '../src/components/MainApp/CurrentDirectory/CurrentDirectoryHeader';

describe('Renders Current Dir Header', () => {
    it('Render buttons', () => {

        const selectedFile: SelectItemType = {name: 'file22', type: 'file'}
        
        render(
            <TestProviders>
                <CurrentDirectoryHeader selectedFile={selectedFile}/>
            </TestProviders>
        )
        
        expect(screen.getByLabelText('previous directory')).toBeInTheDocument()
        expect(screen.getByLabelText('search')).toBeInTheDocument()
        expect(screen.getByLabelText('Add file')).toBeInTheDocument()
        expect(screen.getByLabelText('Add folder')).toBeInTheDocument()
        expect(screen.getByLabelText('delete')).toBeInTheDocument()
        screen.debug()
    })

})
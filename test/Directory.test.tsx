import React from 'react';
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Directory from '../src/components/MainApp/CurrentDirectory/Directory'
import { BucketItemType } from '../src/utils/types';
import TestProviders from './TestProviders';

type data = Record<string, BucketItemType[] | Date | undefined> | undefined;

describe('Directory window', () => {
    it('Renders a window to display data', () => {
        
        const data:data = {
            '/folder/': [
                {Key: ['folder/file.txt'], LastModified: new Date(), BucketItemType: 'folder'},
                {Key: ['folder2/file.txt'], LastModified: new Date(), BucketItemType: 'folder'},
                {Key: ['folder3/file.txt'], LastModified: new Date(), BucketItemType: 'folder'}
            ],
            '/folder2/': [
                {Key: ['folder/file.txt'], LastModified: new Date(), BucketItemType: 'folder'},
                {Key: ['folder2/file.txt'], LastModified: new Date(), BucketItemType: 'folder'},
                {Key: ['folder3/file.txt'], LastModified: new Date(), BucketItemType: 'folder'}
            ],
        }

        render(
            <TestProviders>
                <Directory dirContent={data} selectedFile={{type: 'file', name: ''}} setSelectedFile={() => {}}/>
            </TestProviders>
        )

        expect(screen.getByLabelText("sort by type")).toBeInTheDocument()
        expect(screen.getByLabelText("sort by date")).toBeInTheDocument()
        expect(screen.getByLabelText("sort by name")).toBeInTheDocument()

    })
})
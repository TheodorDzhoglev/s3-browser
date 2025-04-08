import React, { act } from 'react';
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Folder from '../src/components/MainApp/TreeView/Folder';
import { BucketItemType } from '../src/utils/types';
import TestProviders from './TestProviders';
import userEvent from '@testing-library/user-event';

const data: BucketItemType[] = [
    {
        Key: '/alfa/',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/alfa/bear',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/alfa/bear/bearData',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/alfa/bear/polar bear/',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/alfa/polar bear',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/beta/',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
    {
        Key: '/gamma/',
        LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        ChecksumType: "FULL_OBJECT"
    },
]

describe('Render folder tree test', () => {
    it('Renders root folder ', async () => {
        render(
            <TestProviders>
                <Folder 
                    content={data} 
                    currentDir='/' 
                    key={'root'}
                    root={true}
                    renderChild={true}
                />
            </TestProviders>
        )
        expect(screen.getByText('root')).toBeInTheDocument()
        const alfaButton = screen.getByLabelText('alfa')
        const user = userEvent.setup()
        const buttonsNumber = screen.getAllByRole('button').length
        await act(() => user.click(alfaButton))
        await new Promise(resolve => setTimeout(() => resolve(''),500))
        const buttonsNumber2 = screen.getAllByRole('button').length
        expect(buttonsNumber2 > buttonsNumber)
        screen.debug()
    })

    it('Expand Nested Folder ', async () => {
    render(
            <TestProviders>
                <Folder 
                    content={data} 
                    currentDir='/' 
                    key={'root'}
                    root={true}
                    renderChild={true}
                />
            </TestProviders>
        )
    
        const alfaButton = screen.getByLabelText('alfa')
        const user = userEvent.setup()
        const buttonsNumber = screen.getAllByRole('button').length
        await act(() => user.click(alfaButton))
        await new Promise(resolve => setTimeout(() => resolve(''),500))
        const buttonsNumber2 = screen.getAllByRole('button').length
        expect(buttonsNumber2 > buttonsNumber)
        screen.debug()
    })

})
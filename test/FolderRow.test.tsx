import React, { useState } from 'react';
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import TestProviders from './TestProviders';
import FolderRow from '../src/components/MainApp/CurrentDirectory/FolderRow';
import userEvent from '@testing-library/user-event';


describe('Folder Row test', () => {
    it('Renders a folder row', () => {
        const name = 'folder';
        const date = new Date();
        const ariaLabel = `Folder name: ${name} created on ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        render(
            <TestProviders>
                <FolderRow name={name} selected={false} onCLickHandler={() => { }} lastModified={date} />
            </TestProviders>
        )
        screen.debug();
        const button = screen.getByLabelText(ariaLabel);
        expect(button).toBeInTheDocument();
    })

    it('Folder click change to selected', async () => {
        const name = 'folder';

        const ParentComp = () => {
            const [selected, setSelected] = useState(false);
            const onCLickHandler = () => {
                setSelected(true);
            }
            return (
                <TestProviders>
                    <FolderRow name={name} selected={selected} onCLickHandler={onCLickHandler} />
                </TestProviders>
            );
        };
        render(<ParentComp />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(button);
        expect(button).toHaveClass(/selected_file/);
    });
});
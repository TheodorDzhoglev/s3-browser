import React, { useState } from 'react';
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import TestProviders from './TestProviders';
import FileRow from '../src/components/MainApp/CurrentDirectory/FileRow';
import userEvent from '@testing-library/user-event';


describe('File Row test', () => {
    it('Renders a file row', () => {
        const name = 'file';
        const date = new Date();
        const ariaLabel = `${name} created on ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        render(
            <TestProviders>
                <FileRow name={name} selected={false} onCLickHandler={() => { }} lastModified={date} />
            </TestProviders>
        );
        const button = screen.getByLabelText(ariaLabel, { exact: false });
        expect(button).toBeInTheDocument();
        screen.debug();
    })

    it('Renders a file row', async () => {
        const name = 'file'
    
        const ParentComp = () => {
            const [selected, setSelected] = useState(false);
            const onCLickHandler = () => {
                setSelected(true);
            }
            return (
                <TestProviders>
                    <FileRow name={name} selected={selected} onCLickHandler={onCLickHandler} />
                </TestProviders>
            );
        };
        render(<ParentComp />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(button);
        expect(button).toHaveClass(/selected_file/);
        screen.debug();
    });
});
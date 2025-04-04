import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { FormEvent, MouseEvent, useState } from 'react'
import { createObject } from '../../utils/s3API'
import { useAppContext } from '../../context/context'
import { useQueryClient } from '@tanstack/react-query'
import { useDirContext } from '../../context/dirContext'
import { findCurrentDir } from '../../utils/dataTransformUtls'

const {
    button,
    input,
    input_container
} = uiClasses

const {
    form,
    modal_header,
    modal_content,
} = modalClasses

const NewFileModal = () => {
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const queryClient = useQueryClient()
    const { s3client, credentials } = useAppContext()
    const { currentDir } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)

    const createNewFile = async (e: FormEvent) => {
        e.preventDefault();
        const fullName = currentDir === '/' ? name+'.txt' : `${currentDir}/${name}.txt`
        await createObject(s3client!, text.trim(), fullName, credentials!.bucket)
        queryClient.invalidateQueries({
            queryKey: ['list'],
            refetchType: 'active',
          },)
    }

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name || !text) {
            e.stopPropagation()
        }
    }


    return (
        <Fragment>
            <h1 className={modal_header}>Create a new file</h1>
            <p className={modal_content}>Create file in {currentFolder ? currentFolder : 'root'}</p>
            <form className={form} onSubmit={createNewFile}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={name}
                        onChange={(e) => setName((e.target.value).trim())}
                        name="name"
                        id="new-file-name"
                        required
                    />
                </div>
                <div className={input_container}>
                    <label htmlFor="new-file-text">Content</label>
                    <textarea
                        className={input}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        name="text"
                        id="new-file-text"
                        rows={10}
                        required
                    />
                </div>
                <button className={button} onClick={onCLickHandler}>Create new file</button>
            </form>
        </Fragment>
    )
}

export default NewFileModal
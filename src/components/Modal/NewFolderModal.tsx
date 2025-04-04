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

const NewFolderModal = () => {
    const [name, setName] = useState('')
    const queryClient = useQueryClient()
    const { s3client, credentials } = useAppContext()
    const { currentDir } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)

    if(!credentials || !s3client) return 

    const createNewFolder = async (e: FormEvent) => {
        e.preventDefault();
        const fullName = currentDir === '/' ? name+'/' : `${currentDir}/${name}/`
        await createObject(s3client, '', fullName, credentials.bucket)
        queryClient.invalidateQueries({
            queryKey: ['list'],
            refetchType: 'active',
          },)
    }

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name) {
            e.stopPropagation()
        }
    }


    return (
        <Fragment>
            <h1 className={modal_header}>Create a new folder</h1>
            <p className={modal_content}>Create new folder in {currentFolder ? currentFolder : 'root'}</p>
            <form className={form} onSubmit={createNewFolder}>
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
                <button className={button} onClick={onCLickHandler}>Create new folder</button>
            </form>
        </Fragment>
    )
}

export default NewFolderModal
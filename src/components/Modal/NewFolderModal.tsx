import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { MouseEvent, useState } from 'react'
import { useDirContext } from '../../context/dirContext'
import { findCurrentDir } from '../../utils/dataTransformUtls'
import { useAddObject } from '../../utils/customQueryHooks'

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
    const { currentDir } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)
    const fullName = currentDir === '/' ? name + '/' : `${currentDir}/${name}/`

    const { createNewObject } = useAddObject()

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name) {
            e.stopPropagation()
        }
    }


    return (
        <Fragment>
            <h1 className={modal_header}>Create a new folder</h1>
            <p className={modal_content}>Create new folder in {currentFolder ? currentFolder : 'root'}</p>
            <form className={form} onSubmit={(e) => createNewObject(e, name, fullName, '')}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={name}
                        onChange={(e) => setName((e.target.value))}
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
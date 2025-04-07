import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDirContext } from '../../context/dirContext'
import { findCurrentDir, sanitize, uriEncode } from '../../utils/dataTransformUtls'
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

const NewFileModal = () => {
    const [name, setName] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    const [text, setText] = useState('')
    const { currentDir, dirMap } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)
    const fullName = currentDir === '/' ? name : `${currentDir}/${name}`

    const { createNewObject } = useAddObject()

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name || !text || sameKey) e.stopPropagation()
        if (sameKey) {
            e.preventDefault()
            setName('')
            setPlaceholder('A file with the same name already exists')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(((sanitize(e.target.value))))
        setPlaceholder('')
    }

    if (!dirMap[currentDir]) return

    const folderObjects = dirMap[currentDir]
    const sameKey = (Object.keys(folderObjects)).some(obj => folderObjects[obj] instanceof Date ? fullName === obj : false)


    return (
        <Fragment>
            <h3 className={modal_header}>Create a new file</h3>
            <p className={modal_content}>Create file in {currentFolder ? currentFolder : 'root'}</p>
            <form className={form} onSubmit={(e) => createNewObject(e, name, uriEncode(fullName), text)}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={name}
                        onChange={onChangeHandler}
                        name="name"
                        id="new-file-name"
                        required
                        autoFocus
                        placeholder={placeholder}
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
                <button className={button} onClick={onCLickHandler} aria-label='create new file'>Create new file</button>
            </form>
        </Fragment>
    )
}

export default NewFileModal
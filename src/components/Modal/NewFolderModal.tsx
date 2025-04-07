import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { MouseEvent, useState } from 'react'
import { useDirContext } from '../../context/dirContext'
import { findCurrentDir, sanitize, uriEncode } from '../../utils/dataTransformUtls'
import { useAddObject } from '../../utils/customQueryHooks'
import { ChangeEvent } from 'react'

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
    const [placeholder, setPlaceholder] = useState('')
    const { currentDir, dirMap } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)
    const fullName = currentDir === '/' ? name + '/' : `${currentDir}/${name}/`

    const { createNewObject } = useAddObject()

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name || sameKey) e.stopPropagation()
        if (sameKey) {
            e.preventDefault()
            setName('')
            setPlaceholder('A folder with the same name already exists')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setName(((sanitize(e.target.value))))
            setPlaceholder('')
        }

    if(!dirMap[currentDir]) return 
        
    const folderObjects = dirMap[currentDir]
    const sameKey = (Object.keys(folderObjects)).some(obj => folderObjects[obj] instanceof Array ? fullName.replace(/\/$/, '') === obj : false)

    return (
        <Fragment>
            <h3 className={modal_header}>Create a new folder</h3>
            <p className={modal_content}>Create new folder in {currentFolder ? currentFolder : 'root'}</p>
            <form className={form} onSubmit={(e) => createNewObject(e, name, uriEncode(fullName), '')}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={name}
                        onChange={onChangeHandler}
                        name="name"
                        id="new-file-name"
                        required
                        placeholder={placeholder}
                        autoFocus
                    />
                </div>
                <button className={button} onClick={onCLickHandler} aria-label='create new folder'>Create new folder</button>
            </form>
        </Fragment>
    )
}

export default NewFolderModal
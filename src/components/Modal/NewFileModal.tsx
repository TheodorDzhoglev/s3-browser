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
    const [textPlaceholder, setTextPlaceholder] = useState('')
    const [text, setText] = useState('')
    const { currentDir, dirMap } = useDirContext()
    const currentFolder = findCurrentDir(currentDir)
    const fullName = currentDir === '/' ? name.trim() : `${currentDir}/${name.trim()}`

    const { createNewObject } = useAddObject()

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name || !text || sameKey || !name.trim() || !text.trim()) e.stopPropagation()
        if (sameKey) {
            e.preventDefault()
            setName('')
            setPlaceholder('A file with the same name already exists')
        }
        if (!name.trim()) {
            setName('')
            setPlaceholder('Please provide a valid name')
        }
        if (!text.trim()) {
            setText('')
            setTextPlaceholder('Please provide a valid text')
        }
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(((sanitize(e.target.value))))
        setPlaceholder('')
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(((sanitize(e.target.value))))
        setTextPlaceholder('')
    }

    const folderObjects = dirMap[currentDir]

    const sameKey = folderObjects && (Object.keys(folderObjects)).some(obj => !/\/$/.test(obj) ? name.trim() === obj : false)
    
    return (
        <Fragment>
            <h3 className={modal_header}>Create a new file</h3>
            <p className={modal_content}>Create file in <span className='text-bold'>{currentFolder ? currentFolder : 'root'}</span></p>
            <form className={form} onSubmit={(e) => createNewObject(e, name.trim(), uriEncode(fullName), text)}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={name}
                        onChange={onChangeNameHandler}
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
                        onChange={onChangeTextHandler}
                        name="text"
                        id="new-file-text"
                        rows={10}
                        required
                        placeholder={textPlaceholder}
                    />
                </div>
                <button className={button} onClick={onCLickHandler} aria-label='create new file'>Create new file</button>
            </form>
        </Fragment>
    )
}

export default NewFileModal
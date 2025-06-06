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
} = uiClasses;

const {
    form,
    modal_header,
    modal_content,
} = modalClasses;

const NewFolderModal = () => {
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const { currentDir, dirMap } = useDirContext();
    const currentFolder = findCurrentDir(currentDir);
    const fullName = currentDir === '/' ?  `/${name.trim()}/`  : `${currentDir}/${name.trim()}/`;

    const { createNewObject } = useAddObject();

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!name || sameKey || !name.trim()) e.stopPropagation();
        if (sameKey) {
            e.preventDefault();
            setName('');
            setPlaceholder('A folder with the same name already exists');
        }
        if(!name.trim()){
            e.preventDefault();
            setName('');
            setPlaceholder('Please provide a valid name');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setName(((sanitize(e.target.value))));
            setPlaceholder('');
        }
    
    const folderObjects = dirMap[currentDir];
    const sameKey = folderObjects && (Object.keys(folderObjects)).some(obj => folderObjects[obj] instanceof Array ? (fullName.replace(/\/$/, '')) === obj : false);

    return (
        <Fragment>
            <h3 className={modal_header}>Create a new folder</h3>
            <p className={modal_content}>Create new folder in <span className='text-bold'>{currentFolder ? currentFolder : 'root'}</span></p>
            <form className={form} onSubmit={(e) => createNewObject(e, name.trim(), uriEncode(fullName), '')}>
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
    );
};

export default NewFolderModal;
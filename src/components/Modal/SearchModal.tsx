import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { FormEvent, MouseEvent, useState } from 'react'
import { useDirContext } from '../../context/dirContext'
import { findCurrentDir } from '../../utils/dataTransformUtls'
import { ChangeEvent } from 'react'
import { useCurrDirContext } from '../../context/currDirContext'
import { Dir } from '../../utils/types'

const {
    button,
    input,
    input_container
} = uiClasses

const {
    form,
    modal_header,
    search_btns
} = modalClasses

const SearchModal = () => {
    const [search, setSearch] = useState('')
    const { currentDir, dirMap } = useDirContext()
    const { setFilteredContent } = useCurrDirContext()


    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        const filteredData = structuredClone((dirMap[currentDir] as Dir | undefined))
        for (const key in filteredData) {
            const objKey = findCurrentDir(key)
            
            if (objKey && !objKey.includes(search)) delete filteredData[key]
        }
        setFilteredContent(filteredData)
    }

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!search) e.stopPropagation()
    }

    const onRestHandler = () => {
        setFilteredContent(undefined)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    if (!dirMap[currentDir]) return

    return (
        <Fragment>
            <h3 className={modal_header}>Filter object</h3>
            <form className={form} onSubmit={(e) => onSubmitHandler(e)}>
                <div className={input_container}>
                    <label htmlFor="new-file-name">Name</label>
                    <input
                        className={input}
                        value={search}
                        onChange={onChangeHandler}
                        name="name"
                        id="new-file-name"
                        autoFocus
                        required
                    />
                </div>
                <div className={search_btns}>
                    <button className={button} onClick={onCLickHandler} aria-label='filter'>Filter</button>
                    <button className={button} onClick={onRestHandler} type='button' aria-label='reset filter'>Reset filter</button>
                </div>
            </form>
        </Fragment>
    )
}

export default SearchModal
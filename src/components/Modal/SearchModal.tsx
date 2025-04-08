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
    search_btns,
    reset_header
} = modalClasses

const SearchModal = () => {
    const [search, setSearch] = useState('')
    const { currentDir, dirMap } = useDirContext()
    const { setFilteredContent, filteredContent } = useCurrDirContext()


    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        const filteredData = structuredClone((dirMap[currentDir] as Dir | null))
        for (const key in filteredData) {
            const objKey = findCurrentDir(key)

            if (objKey && !objKey.toLocaleLowerCase().includes(search.trim())) delete filteredData[key]
        }
        setFilteredContent(filteredData)
    }

    const onCLickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (!search) e.stopPropagation()
    }

    const onResetHandler = () => {
        setFilteredContent(null)
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
                    <div className={reset_header}>
                        <label htmlFor="new-file-name" className='text-bold'>Filter</label>
                        {
                            filteredContent &&
                            <button
                                onClick={onResetHandler}
                                type='button'
                                className={button}
                                aria-label='reset filter'
                                autoFocus={!!filteredContent}
                            >
                                Reset
                            </button>
                        }
                    </div>
                    <input
                        className={input}
                        value={search}
                        onChange={onChangeHandler}
                        name="name"
                        id="new-file-name"
                        autoFocus={!filteredContent}
                        required
                    />
                </div>
                <div className={search_btns}>
                    <button className={button} onClick={onCLickHandler} aria-label='filter'>Filter</button>
                </div>
            </form>
        </Fragment>
    )
}

export default SearchModal
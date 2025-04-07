import { FormEvent, useState } from 'react'
import classes from './ConnectFrom.module.css'
import uiClasses from './../../assets/styles/uiElements.module.css'
import { addToLocalStorage } from '../../utils/localStorage'
import { useAppContext } from '../../context/context'
import { createS3Client } from '../../utils/s3API'

const {
    form,
} = classes

const {
    input_container,
    input,
    button
} = uiClasses

const ConnectForm = () => {

    const [bucket, setBucket] = useState('')
    const [key, setKey] = useState('')
    const [secret, setSecret] = useState('')
    const { setCredentials, sets3Client } = useAppContext()

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { bucket, key, secret, }
        addToLocalStorage(data)
        setCredentials(data)
        sets3Client(createS3Client(data))
    }

    return (
        <form className={form} onSubmit={onSubmitHandler}>
            <div className={input_container}>
                <label htmlFor='bucket'>Bucket</label>
                <input
                    id='bucket'
                    className={input}
                    name='bucket'
                    required
                    onChange={(e) => setBucket(e.target.value)}
                    value={bucket}
                    autoFocus
                />
            </div>
            <div className={input_container}>
                <label htmlFor='key'>Access Key</label>
                <input
                    id='key'
                    className={input}
                    name='key'
                    required
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                />
            </div>
            <div className={input_container}>
                <label htmlFor='secret key'>Secret Access Key</label>
                <input
                    id='secret key'
                    className={input}
                    name='secret'
                    required
                    type='password'
                    onChange={(e) => setSecret(e.target.value)}
                    value={secret}
                />
            </div>
            <button className={button} aria-label='submit form'>Connect</button>
        </form>
    )
}

export default ConnectForm
import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { useAppContext } from '../../context/context'
import { useQueryClient } from '@tanstack/react-query'
import { useDirContext } from '../../context/dirContext'
import { deleteObjects } from '../../utils/s3API'
import { ListObjectsV2Output } from '@aws-sdk/client-s3'
import { openDialog, useCurrDirContext } from '../../context/currDirContext'
import ErrorModal from './ErrorModal'
import { SelectItemType } from '../../utils/types'
import { findCurrentDir } from '../../utils/dataTransformUtls'


const {
    button,
} = uiClasses

const {
    message_modal
} = modalClasses

type Props = {
    selectedFile: SelectItemType
}

const DeleteModal = ({ selectedFile }: Props) => {
    const { s3client, credentials } = useAppContext()
    const { currentDir, setLoadingObj } = useDirContext()
    const { setModalElement, dialogRef } = useCurrDirContext()
    const queryClient = useQueryClient()
    const { Contents } = queryClient.getQueryData(['list']) as ListObjectsV2Output

    if (!credentials || !s3client) return


    const onCLickHandler = async () => {
        if (!selectedFile?.name || !Contents) return

        let deletedName = selectedFile?.name + '/'

        let removeObjArr: { Key: string | undefined }[] = []

        if (selectedFile.type === 'file') {
            deletedName = currentDir === '/' ? selectedFile.name : `${currentDir}/${selectedFile.name}`
            removeObjArr = [{ Key: deletedName }]
        }
        else {
            removeObjArr = Contents.filter(obj => obj.Key?.startsWith(deletedName)).map(obj => { return { Key: obj.Key } })
        }
        console.log(removeObjArr)
        setLoadingObj(prevState => [...prevState, deletedName])
        const data = await deleteObjects(s3client, removeObjArr, credentials.bucket)

        if (data?.$metadata.httpStatusCode === 200) {
            queryClient.setQueryData(['list'], (data: ListObjectsV2Output) => {
                const updatedContents = data.Contents?.filter(obj => !removeObjArr.some(rmObj => rmObj.Key === obj.Key))
                return {
                    ...data,
                    Contents: updatedContents
                }
            })
        }
        else {
            setLoadingObj(prevState => prevState.filter(name => name !== deletedName))
            setModalElement(<ErrorModal key={Math.random()} text={`Something went wrong while deleting '${selectedFile.name}'.`} />)
            openDialog(dialogRef)
        }
    }


    return (
        <Fragment>
            <div className={message_modal}>
                <h1>Delete</h1>
                <p>Are you sure you want to delete: {selectedFile.type === 'file' ? selectedFile?.name : findCurrentDir(selectedFile?.name)}</p>
                <button className={button} onClick={onCLickHandler} aria-label='delete'>Delete</button>
            </div>
        </Fragment>
    )
}

export default DeleteModal
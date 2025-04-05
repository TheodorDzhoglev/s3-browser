import uiClasses from '../../assets/styles/uiElements.module.css'
import modalClasses from '../../assets/styles/Modal.module.css'
import { Fragment } from 'react/jsx-runtime'
import { useAppContext } from '../../context/context'
import { useQueryClient } from '@tanstack/react-query'
import { useDirContext } from '../../context/dirContext'
import { deleteObjects } from '../../utils/s3API'
import { ListObjectsV2Output } from '@aws-sdk/client-s3'


const {
    button,
} = uiClasses

const {
    modal_header,
    modal_content,
    read_file_module
} = modalClasses

type Props = {
    selectedFile: { name: string, type: 'file' | 'folder' } | undefined
}

const DeleteModal = ({ selectedFile }: Props) => {

    const { s3client, credentials } = useAppContext()
    const { currentDir, setLoadingObj } = useDirContext()
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
        else{
            removeObjArr = Contents.filter(obj => obj.Key?.startsWith(deletedName)).map(obj => { return { Key: obj.Key } })
        }
        
        setLoadingObj(prevState => [...prevState, deletedName])
        const data = await deleteObjects(s3client, removeObjArr, credentials.bucket)

        if(data?.$metadata.httpStatusCode === 200){
            queryClient.setQueryData(['list'], (data: ListObjectsV2Output) => {
                const updatedContents = data.Contents?.filter(obj => !removeObjArr.some( rmObj => rmObj.Key === obj.Key))
                return {
                    ...data,
                    Contents: updatedContents
                }
            })
        }
        else{
            setLoadingObj(prevState => prevState.filter( name => name !== deletedName))
        }
    }


    return (
        <Fragment>
            <div className={read_file_module}>
                <h1 className={modal_header}>Delete</h1>
                <p className={modal_content}>Are you sure you want to delete: {selectedFile?.name}</p>
                <button className={button} onClick={onCLickHandler}>Delete</button>
            </div>
        </Fragment>
    )
}

export default DeleteModal
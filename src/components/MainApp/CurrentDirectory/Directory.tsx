import { useQueryClient } from '@tanstack/react-query'
import classes from './Directory.module.css'
import { ListObjectsV2Output } from '@aws-sdk/client-s3'
import Icon from './Icon'
import { useSort } from '../../../utils/hooks'

const {
    directory_grid_container,
    directory_container,
    directory_grid,
    directory_nav,
    button_container
} = classes

const Directory = () => {

    const queryClient = useQueryClient()
    const { Contents } = queryClient.getQueryData(['list']) as ListObjectsV2Output

    const {
        sortedContent,
        sortByType,
        sortByName,
        sortByDate
    } = useSort(Contents)


    return (
        <div className={directory_container}>
            <div className={directory_nav}>
                <div className={button_container}>
                    <button onClick={sortByType}>Type</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByName}>Name</button>
                </div>
                <div className={button_container}>
                    <button onClick={sortByDate}>Date</button>
                </div>
            </div>
            <div className={directory_grid_container}>
                <ul className={directory_grid}>
                    {sortedContent?.map(c =>
                        <Icon name={c.Key} key={c.Key} lastModified={c.LastModified} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Directory
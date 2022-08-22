import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import PostSharingPage from '../dashboard/PostSharingPage'



const PostSharingPageHandler = () => {

    const { postId } = useParams()

    const [data, setData] = useState()
    
    const url = "https://proderto.com/api/posts/shared/post"

    useEffect(() => {
        axios.get(url, {
            headers: {
              "post-id": postId
            }
        }).then(res => {
            return setData(res.data)
        }).catch((err) => {
            console.log(err)
            window.location.reload()
        })
    }, [])


    if (!data) {
        return (<div className='loader-holder' style={{ height: '500px'}}>
        <div className="loader" style={{ width: '100px', height: '100px' }}></div></div>)
    }

    return (<PostSharingPage data={ data } postId={ postId } />)

}
  
export default PostSharingPageHandler
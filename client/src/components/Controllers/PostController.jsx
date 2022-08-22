import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../dashboard/Post'
import { useNavigate, useParams } from 'react-router-dom'



const PostController = () => {
    
    let navigate = useNavigate()

    const { postId } = useParams()

    const token = window.localStorage.getItem('prodertoPassToken') 

    const [data, setData] = useState() 

    const [re, setRe] = useState()

    useEffect(() => {
        async function getPost () {
            const postUrl = "https://proderto.com/api/posts/post"
            const r = await axios.get(postUrl, {
                headers: {
                    "x-auth-token": JSON.parse(token),
                    "post-id": postId
                }
            })
            setRe(r.status)
            if (r.status === 200) {
                setData(r.data)
            }
        }
        getPost()
    }, [])
    
    if (re === 200) {
        return <Post data={ data }/>
    } else {
        navigate("/login")
    }

}
  
export default PostController
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from '../dashboard/Search'
import { useNavigate, useParams } from 'react-router-dom'



const SearchController = () => {

    const token = window.localStorage.getItem('prodertoPassToken') 
    
    let navigate = useNavigate()

    const { query } = useParams()

    const [res, setRes] = useState()

    const [err, setErr] = useState()

    useEffect(() => {
        async function search () {
            const URL = "https://proderto.com/api/posts/search/" + query
            try {
                const res = await axios.get(URL, {
                    headers: {
                        "x-auth-token": JSON.parse(token)
                    }
                })
                setRes(res.data)
            } catch (err) {
                setErr(err.response.status)
                console.log(err)
            }
        }
        search()
    }, [query]) 

    
    if (res) {
        return <Search data={res} query={query} />
    } else if (err) {
        if (err === 403) {
            navigate("/login")
        } else {
            window.location.reload()
        }
    } else {
       return (<div className='loader-holder' style={{ height: '500px'}}>
        <div className="loader" style={{ width: '100px', height: '100px' }}></div></div>)
    }

}
  
export default SearchController
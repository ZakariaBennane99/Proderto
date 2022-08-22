import axios from 'axios'
import React, { useEffect, useState} from 'react'
import HomePage from '../dashboard/Homepage'
import { useNavigate } from 'react-router-dom'



const HomePageController = () => {
    
    let navigate = useNavigate()

    const token = window.localStorage.getItem('prodertoPassToken') 

    const [re, setRe] = useState('')
    
    const url = "https://proderto.com/api/auth/checkToken"


    useEffect(() => {
        axios.post(url, "", {
            headers: {
              "x-auth-token": JSON.parse(token)
            }
        }).then(res => {
            return setRe(res.status)
        }).catch((err) => {
            console.log(err)
            return setRe(err.response.status)
        })
    }, [])

    
    if (re === 200) {
        return <HomePage />
    } else {
        navigate("/login")
    }

}
  
export default HomePageController
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Page404 from '../landing/Page404'
import Page404LoggedIn from '../dashboard/Page404LoggedIn'



const HomePageController = () => {
    

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
        return <Page404LoggedIn />
    } else {
        return <Page404 />
    }

}
  
export default HomePageController
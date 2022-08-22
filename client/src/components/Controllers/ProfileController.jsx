import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Profile from '../profile/Profile'
import { useNavigate, useParams } from 'react-router-dom'



const ProfileController = () => {

    const token = window.localStorage.getItem('prodertoPassToken') 

    const { userId } = useParams() 

    let navigate = useNavigate()

    const [profile, setProfile] = useState()
    
    const url = "https://proderto.com/api/profile/getProfile"


    useEffect(() => {
        axios.get(url, {
            headers: {
              "x-auth-token": JSON.parse(token),
              "user-id": userId
            }
        }).then(res => {
            return setProfile(res.data)
        }).catch((err) => {
            console.log(err)
            return setProfile(err.response.status)
        })
    }, [])

    
    if (!profile) {
        return (<div className='loader-holder' style={{ height: '500px'}}>
        <div className="loader" style={{ width: '100px', height: '100px' }}></div></div>)
    }

    if (profile === 403) {
        navigate("/login")
        return
    }
   
    return (
        <Profile data={ profile }/>
    ) 


}
  
export default ProfileController
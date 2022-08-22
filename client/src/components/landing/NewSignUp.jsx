import { useParams } from 'react-router-dom'
import HomeStruct from './HomeStruct'
import Page404 from './Page404'
import Footer from './Footer'
import axios from 'axios'
import React, { useState, useEffect } from 'react'   


const NewSignUp = () => {

    const [isVerified, setIsVerified] = useState()

    const { userId } = useParams()

    useEffect(() => {
        const url = 'https://proderto.com/api/users/verify'
        // make a call to check the user's email verification
        axios.post(url, { userId })
            .then(res => {
                if (res.status === 201) {
                    return setIsVerified("Yes")
                }
            })
            .catch (err => {
                console.log(err)
                return setIsVerified("No")
            }) 
    }, [])

    if (isVerified === undefined) {
        return (<div className='loader-holder'>
            <HomeStruct />
            <div className="loader"></div>
        </div>)
    }

    return (<>
        {isVerified === "Yes" ?
        <>
            <HomeStruct />
            <div className='signed-up-container-holder'>
                <div className='signed-up-container'>You Are In! You Can Now Login.</div>
            </div>
            <Footer />
        </>
             : 
            <Page404 />
        }
        </>
    )

}
  
export default NewSignUp
import '../../styles/profile.css'
import Header from '../dashboard/Header'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Profile = () => {

    const screenWidth = window.innerWidth
    
    let navigate = useNavigate()

    const [showEye, setShowEye] = useState(false)

    const fullName = JSON.parse(window.localStorage.getItem("prodertoUserFullName"))
    const fName = fullName.split(" ")[0]
    const lName = fullName.split(" ")[1]

    const email = JSON.parse(window.localStorage.getItem("prodertoUserEmail"))

    const [settingsData, setSettingsData] = useState({
        fName: fName,
        lName: lName,
        email: email,
        password: ''
    })

    function handleSettingsData (e) {
        setSettingsData((prev) => {
            return {...prev, [e.target.id]: e.target.value}
        })
    }

    async function handleCloseAccount () {
        const token = window.localStorage.getItem('prodertoPassToken')
        const URL = "https://proderto.com/api/profile"
        try {
            const res = await axios.delete(URL, { 
                headers: {
                "x-auth-token": JSON.parse(token)
            }})
            if (res.status === 200) {
                window.localStorage.clear()
                navigate("/")
            }
        } catch (err) {
            if (err.response.status === 401) {
                navigate("/login")
            } else {
                alert("Something bad happened, please try again later")
            }
        }
    }

    function handleShowEye () {
        return setShowEye(!showEye)
    }

    async function updateData () {

        const updateUrl = "https://proderto.com/api/profile"
        const token = window.localStorage.getItem('prodertoPassToken')

        let finalSettings

        if (settingsData.password === '') {
            finalSettings = {
                fName: settingsData.fName,
                lName: settingsData.lName,
                email: settingsData.email
            } 
        } else {
            finalSettings = settingsData
        }

        try {
            const res = await axios.put(updateUrl, finalSettings, { 
                headers: {
                "x-auth-token": JSON.parse(token)
            }})
            if (res.status === 201) {
                alert("Your personal information has been updated!")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
    <>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='settings-container' style={{ width: screenWidth > 1200 ? "900px" : "85vw" }}>
                <div className='head-settings'>
                    <h1 style={{ fontFamily: 'Open Sans Medium', fontWeight: 'bolder', fontSize: '27px', color: '#6B6B6B' }}>SETTINGS</h1>
                    <p style={{ width: '40%', fontFamily: 'Open Sans Regular', fontStyle: 'italic', color: '#6B6B6B', marginRight: "20px" }}>To change your information click on the correspending block then save</p>
                </div>
                <div className='settings-mini-container'>
                    <label htmlFor='fName' style={{ fontWeight:'bolder', fontSize: '1.2em', color: '#6B6B6B', marginRight: '5em' }}>First Name</label>
                    <input id='fName' type='text' value={settingsData.fName} style={{ fontSize:'1.1em', outline: 'none', border: 'none', width: '50%', color:'#6B6B6B' }} onChange={handleSettingsData}/>
                </div>
                <div className='settings-mini-container'>
                    <label htmlFor='lName' style={{ fontWeight:'bolder', fontSize: '1.2em', color: '#6B6B6B', marginRight: '5em' }}>Last Name</label>
                    <input id='lName' type='text' value={settingsData.lName} style={{ fontSize:'1.1em', outline: 'none', border: 'none', width: '50%', color:'#6B6B6B' }} onChange={handleSettingsData}/>
                </div>
                <div className='settings-mini-container'>
                    <label htmlFor='email' style={{ fontWeight:'bolder', fontSize: '1.2em', color: '#6B6B6B', marginRight: '7.6em' }}>Email</label>
                    <input id='email' type='email' value={settingsData.email} style={{ fontSize:'1.1em', outline: 'none', border: 'none', width: '50%', color:'#6B6B6B' }} onChange={handleSettingsData}/>
                </div>
                <div className='settings-mini-container'>
                        <label htmlFor='password' style={{ fontWeight:'bolder', fontSize: '1.2em', color: '#6B6B6B', marginRight: '5.7em' }}>Password</label>
                        <input type={showEye ? "password" : "text"} value={settingsData.password} id='password' onChange={handleSettingsData} style={{ fontSize:'1.1em', outline: 'none', border: 'none', width: '30%', color:'#6B6B6B' }}/>
                        {settingsData.password.length > 0 ?
                            <FontAwesomeIcon icon={showEye ? faEye : faEyeSlash} 
                            style={{ position: 'absolute', width: showEye ? '23px' : '25px', right: showEye ? '22' : '21', top: '40%' , cursor: 'pointer', color: 'black' }} onClick={handleShowEye}/>
                        : ""}
                </div>
                <div className='settings-containers' style={{ padding: screenWidth < 830 ? "0px" : "0px"}}>
                    <div className='last-four-containers btn red' style={{ padding: screenWidth < 830 ? "16px" : "20px" }}>
                        <h1 style={{ fontFamily: 'Open Sans Medium', fontWeight: 'bold', color: '#BA0000', fontSize: '1.3em', justifyContent: 'center', alignItems: 'center' }} onClick={handleCloseAccount}>Close Your Account</h1>
                    </div>
                    <div onClick={updateData} className='last-four-containers btn gray'>
                        <h1 id='save' style={{ fontFamily: 'Open Sans Medium', fontWeight: 'bold', fontSize: '1.3em', color: '#6B6B6B' }}>SAVE</h1>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
  
export default Profile
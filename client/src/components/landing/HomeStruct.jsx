import React from 'react'
import bckg from '../../Design_Stuff/Landing/landing_bckg.svg'
import LnHeader from './LnHeader'


const HomeStruct = ({ h }) => {

    const sw = window.innerHeight

    return (
    <>
        <LnHeader bckg='transparent'/>
        <img src={bckg} alt="" className='landing-background' style={{ height: h < sw  ? h : "100vh" }} />
    </>)
}

export default HomeStruct 
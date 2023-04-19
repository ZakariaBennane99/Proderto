import '../../styles/landing.css'
import instagramLg from '../../Design_Stuff/Landing/Insta_logo.svg'
import facebookLg from '../../Design_Stuff/Landing/fb_logo.svg'
import pin from '../../Design_Stuff/Landing/pin.svg'
import Feedback from './Feedback'
import React, { useState } from 'react'



const Footer = () => {

  const [clicked, setClicked] = useState(false)

  return (
    <>
    <div className='footerContainer'>
        <a href="https://www.instagram.com/shareyourgoals" target='_blank' rel='noreferrer'><img style={{ width:'25px', marginRight: '12px', cursor:'pointer' }} src={instagramLg} alt="Instagram Logo" /></a> 
        <a href="https://www.facebook.com/proderto" target='_blank' rel='noreferrer'><img style={{ width:'25px', marginRight: '12px', cursor:'pointer' }} src={facebookLg} alt="Facebook Logo" /></a>
        <a href="https://www.pinterest.com/shareyourgoals" target='_blank' rel='noreferrer'><img style={{ width:'25px', marginRight: '12px', cursor:'pointer' }} src={pin} alt="Twitter Logo" /></a>
        <div className='feedback' onClick={() => { setClicked(!clicked) }}>
        Feedback
      </div>
    </div>
    {
      clicked ?
      <Feedback init={() => { setClicked(!clicked) }} /> :
      ""
    }
    </>
    
  )
}
  
export default Footer

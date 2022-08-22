import React, { useState } from 'react'
import HomeStruct from './HomeStruct'
import Footer from './Footer'
import { faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'


const SignUp = () => {

  const [showEye, setShowEye] = useState(false)

  const [hovered, setHovered] = useState(false)

  const [isEmailSent, setIsEmailSent] = useState("")

  const [validationErrors, setValidationErrors] = useState({
    fName: false,
    lName: false,
    email: false,
    password: false
  }) 

  const [formValues, setFormValues] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    emailVerified: false
  })

  const [leftErrors, setleftErrors] = useState('')

  function handleShowEye () {
    return setShowEye(!showEye)
  }

  function handleHover () {
    return setHovered(!hovered)
  }

  function handleChange (e) {

    setValidationErrors((prev) => {
      return {...prev, [e.target.id]: false}
    })

    setleftErrors('')

    setFormValues((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })

  }

  // registering a new user
  const signUpUser = async function registerUser () {

    // user registration URL
    const registerUrl = 'https://proderto.com/api/users'
    // email verification URL
    const emailVerifyUrl = 'https://proderto.com/api/emails-manager/email-verification'

    try {
      const res = await axios.post(registerUrl, formValues)
      if (res.status === 201) {
        try {
          //window.localStorage.setItem("prodertoUserID", res.data)
          const resp = await axios.post(emailVerifyUrl, { 
            name: formValues.fName[0].toUpperCase() + formValues.fName.slice(1).toLowerCase(),
            email: formValues.email,
            userId: res.data
           })
          if (resp.status === 201) {
            setIsEmailSent("Yes")
          } 
        } catch (err) {
          setIsEmailSent("No")
          console.error(err)
        }
      } 
    } catch (err) {
      // if not a server error
      if (err.response.status === 401) {
        setleftErrors(err.response.data.errors[0].msg)
      } else if (err.response.status === 400) {
        err.response.data.errors.map(el => {
          setValidationErrors((prev) => {
            return {...prev, [el.param]: true}
          })
        })
        // if server error
      } else {
        setleftErrors('Please refresh the page and try again!')
      }
    
    }
  
  }



  return (
    <>
      <HomeStruct />
      {isEmailSent === "Yes" ? 
      <div className='signed-up-container-holder'>
        <div className='signed-up-container'>Check Your Email</div>
      </div> : isEmailSent === "No" ?
      <div className='signed-up-container-holder'>
        <div className='signed-up-container'>Something bad happened, try again later! </div>
      </div> : 
      <div className='signup-container'>
        <form className='signUpForm'>
          <h1 id='signUpTxt'>Sign Up</h1>
          {isEmailSent}
          <h4 style={{ color: 'red' }}>{leftErrors}</h4>
          <div className='fNameCont'> 
            <label htmlFor="fName">First Name</label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
               {validationErrors.fName ? <p style={{ fontSize: '12px', marginBottom: '10px', color: 'red' }}>First name is required</p> : "" }
              <input type="text" id="fName" onChange={handleChange} style={{ outline: validationErrors.fName ? '2px solid red' : '' }}/>
            </div>
          </div>
          <div className='lNameCont'>
            <label htmlFor="lName">Last Name</label>
            <div>
              {validationErrors.lName ? <p style={{ fontSize: '12px', marginBottom: '10px', color: 'red' }}>Last name is required</p> : "" }
              <input type="text" id="lName" onChange={handleChange} style={{ outline: validationErrors.lName ? '2px solid red' : '' }}/>
            </div>
          </div>
          <div className='emailSCont'>
            <label htmlFor="email">Email</label>
            <div>
              {validationErrors.email ? <p style={{ fontSize: '12px', marginBottom: '10px', marginLeft: '43px', color: 'red' }}>Please enter a valid email</p> : "" }
              <input type="email" id="email" onChange={handleChange} style={{ outline: validationErrors.email ? '2px solid red' : '' }}/>
            </div>
          </div>
          <div className='passwCont'>
            <label htmlFor="password">Password</label>
            {formValues.password.length > 0 ? 
               <FontAwesomeIcon icon={showEye ? faEye : faEyeSlash} style={{ position: 'absolute', zIndex:'10', width: showEye ? '14px' : '16px', right: showEye ? '9' : '8', bottom: '4' , cursor: 'pointer', color: 'black' }} onClick={handleShowEye}/>
            : ""}
            <div>
              {validationErrors.password ? <p style={{ fontSize: '12px', marginBottom: '10px', marginLeft: '5px', color: 'red' }}> At least 6 characters</p> : "" }
              <input type={showEye ? "password" : "text"} id="password" value={formValues.password} onChange={handleChange} style={{ outline: validationErrors.password ? '2px solid red' : '', position:'relative' }}/>
            </div>
          </div>
          <div style={{ width: '100%', position: 'relative' }}>
            <button type='button' onMouseOver={handleHover} onMouseOut={handleHover} style={{ paddingRight: hovered ? "70px" : "" }} onClick={signUpUser}>Sign Up</button>
            <FontAwesomeIcon icon={faArrowRight} style={{ position: 'absolute', fontSize:'20px', right: hovered ? '30' : '-20', transition: '0.5s', bottom:'7' , color: 'white' }}/>
          </div>
        </form>
      </div>}
      <Footer/>
    </>)
}
  
export default SignUp
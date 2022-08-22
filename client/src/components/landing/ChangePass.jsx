import React, { useState, useEffect } from 'react'
import HomeStruct from './HomeStruct'
import Footer from './Footer'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'



const ChangePass = () => {

    const token = localStorage.getItem("passToken")

    const updateUserUrl = "https://proderto.com/api/profile"

    const [isValidToken, setIsValidToken] = useState("")

    const [clickedSendForgot, setclickedSendForgot] = useState(false)

    // since we alrady have consrucetd the midlleware for auth, we only need 
    // to make a call to the API direclty with the header set to the current user's 
    // token stored in the browser and the API will return the right answer
    useEffect(() => {
      axios.post(updateUserUrl, "", {
        headers: {
          "x-auth-token": JSON.parse(token)
        }
      }).then(res => setIsValidToken("Yes"))
        .catch (err => {
          setIsValidToken("No")
          console.log(err)})
          // we have included this clickedSendfORRGOT jsut to make sure that 
          // if the user asks again for the pass change an the req has already
          // expired, we will check the passtoken to show the right message 
    }, [clickedSendForgot])
    


    const [formPass, setFormPass] = useState({
      newPass: "",
      confirmPass: ""
    })

    const [didPassChange, setDidPassChange] = useState("")

    const [validationErr, setValidationErr] = useState({
      passDontMatch: false,
      passLessThanSix: false
    })

    const [showEye1, setShowEye1] = useState(false)

    const [showEye2, setShowEye2] = useState(false)

    function handleShowEye1 () {
      return setShowEye1(!showEye1)
    }

    function handleShowEye2 () {
      return setShowEye2(!showEye2)
    }

    async function sendPass () {

      setclickedSendForgot(true)

      // validation
      if (formPass.newPass.length !== formPass.confirmPass.length) {
        setValidationErr((prev) => {
          return {...prev, passDontMatch: true}
        })
      }
      if (formPass.newPass.length < 6) {
        setValidationErr((prev) => {
          return {...prev, passLessThanSix: true}
        })
      }

      // req to update the password
      const response = await axios.post(updateUserUrl, { password: formPass.newPass }, {
        headers: {
          "x-auth-token": JSON.parse(token)
        }
      })

      if (response.status === 201) {
        setDidPassChange("Yes")
      } else {
        setDidPassChange("No")
      }

    }


    function handleChange (e) {

      setValidationErr({
        passDontMatch: false,
        passLessThanSix: false
      })

      setFormPass((prev) => {
        return {...prev, [e.target.id]: e.target.value}
      })

    }

    return (
        <>
          <HomeStruct />
          <div className='pass-change-container'>
              <>
                { isValidToken === "No" ? <div className='loginForm'><p style={{ marginTop: "20px" }}>The request has expired.</p></div> : 
                <form className='loginForm' style={{ paddingTop: '0px' }}>
                {didPassChange === "Yes" ? <p style={{ marginTop: "20px" }}>You can now login with the new password</p> :
                <>
                    <h4 style={{ color: 'red', marginTop: "25px" }}>{validationErr.passDontMatch ? "Passwords don't match" : validationErr.passLessThanSix ? "Password must be at least 6 characters" : didPassChange === "No" ? "Internal Error. Please try again later!" : "" }</h4>
                    <div className='email-cont'> 
                      <label htmlFor="email">New Password</label>
                      {formPass.newPass.length > 0 ? 
                         <FontAwesomeIcon icon={showEye1 ? faEye : faEyeSlash} style={{ position: 'absolute', zIndex:'100', width: showEye1 ? '12px' : '14px', right: showEye1 ? '10' : '9', top: '4' , cursor: 'pointer', color: 'black' }} onClick={handleShowEye1}/>
                      : ""}
                      <div>
                        { validationErr.passLessThanSix ? <p style={{ fontSize: '12px', marginBottom: '10px', color: 'red' }}>Password should be at least 6 characters long</p> : "" }
                        <input type={showEye1 ? "password" : "text"} id="newPass" onChange={handleChange} value={formPass.newPass} style={{ outline: validationErr.passLessThanSix ? '2px solid red' : '' }}/>
                      </div>
                    </div>
                    <div className='pass-cont'>
                      <label htmlFor="password">Confirm New Password</label>
                      {formPass.confirmPass.length > 0 ? 
                         <FontAwesomeIcon icon={showEye2 ? faEye : faEyeSlash} style={{ position: 'absolute', zIndex:'100', width: showEye2 ? '12px' : '14px', right: showEye2 ? '10' : '9', top: '16' , cursor: 'pointer', color: 'black' }} onClick={handleShowEye2}/>
                      : ""}
                      <div>
                        {validationErr.passDontMatch ? <p style={{ fontSize: '12px', marginBottom: '10px', color: 'red' }}>Password don't match</p> : "" }
                        <input type={showEye2 ? "password" : "text"} id="confirmPass" value={formPass.confirmPass} onChange={handleChange} style={{ outline: validationErr.passDontMatch  ? '2px solid red' : '', position:'relative' }}/>
                      </div>
                    </div>
                    <button type='button' onClick={sendPass}>Change Password</button>
                  </>} 
                </form>}
              </> 
            </div>
          <Footer/>
        </>)
}
  
export default ChangePass
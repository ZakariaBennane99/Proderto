import React, { useState } from "react"
import { faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from './Footer'



const MobileLogin = () => { 

    const [showEye, setShowEye] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [value, setValue] = useState("")

    function handleShowEye () {
      return setShowEye(!showEye)
    }

    function handleHover () {
      return setHovered(!hovered)
    }

    function handlePassChange (e) {
      return setValue(e.target.value)
    }


    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "75%", marginTop: "20%" }}>
                <form action="/action_page.php" className="mobileLogin">
                    <h1 id='signUpTxt'>Login</h1>
                    <div className='emailCont' style={{ paddingRight:"0px" }}>
                      <input type="email" id="email" />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className='passCont' style={{ paddingRight:"0px" }}>
                      <input type={showEye ? "password" : "text"} id="password" value={value} onChange={handlePassChange}/>
                      {value.length > 0 ? 
                          <FontAwesomeIcon icon={showEye ? faEye : faEyeSlash} style={{ position: 'absolute', width: showEye ? '15px' : '17px', right: showEye ? '11' : '10', top: '32' , cursor: 'pointer', color: 'black' }} onClick={handleShowEye}/>
                        : ""}
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className='btnCont' style={{ paddingRight:"0px" }}>
                      <button onMouseOver={handleHover} onMouseOut={handleHover} style={{ paddingRight: hovered ? "27px" : "", width:'150px', }} type='submit'>login</button>
                      <FontAwesomeIcon icon={faArrowRight} style={{ position: 'absolute', width:'25px', marginRight: hovered ? '8px' : "", right: hovered ? '110' : '75', transition: '0.5s', bottom: '46.5', color: 'white' }}/>
                    </div>
                </form> 
            </div>     
            <Footer />
        </>)
}

export default MobileLogin



import React, { useState } from 'react'
import Footer from './Footer'
import HomeStruct from './HomeStruct'
import show1 from '../../Design_Stuff/Landing/show_1.svg'
import show2 from '../../Design_Stuff/Landing/show_2.svg'
import { Link } from 'react-router-dom'


const LandingPage = () => {

  const screenWidth = window.innerWidth

  const [h, setH] = useState()

  setTimeout(() => {
    if (screenWidth > 892) {
      document.querySelector("#root").style.height = "100vh"
    } 
  setH(document.querySelector("#root").offsetHeight) }, 100) 
  

  return (
    <>
      <HomeStruct h={h}/>
      <div  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='landing-body' style={{ width: screenWidth < 1200 ? "100vw" : "1000px", flexDirection: screenWidth < 892 ? "column" : "row-reverse", marginTop: screenWidth < 892 ? "25vw" : "60px" }}>
          <div className='landing-showcase' style={{ width: screenWidth < 892 ? "60%" : "40%" }}>
              <div className='first'> <img src={show1} alt="" /> </div>
              <div className='second'> <img src={show2} alt="" /> </div>
          </div>
          <div className='landing-txt-btn' style={{ marginTop: screenWidth < 892 ? "30%" : "" }}>
            <div style={{ width: screenWidth > 892 ? "70%" : "" }}>
              <p className='f-txt' style={{ color: screenWidth < 892 ? "white" : "#515151" }}>Share And Track Your Goals With The World</p>
              <p className='d-acc' style={{ color: screenWidth < 892 ? "white" : "#515151" }}>Stay Accountable 
                <div className='underline' style={{ boxShadow: screenWidth < 892 ? "0px 1px 1px #50514f" : "" }}></div>
              </p>
            </div>
            <Link to={{ pathname: '/signup' }} style={{ width: "fit-content" }}>
              <button style={{ boxShadow: screenWidth < 892 ? "0px 1px 5px #50514f" : "", background: screenWidth < 892 ? "transparent" : "" }}>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
  </>)
}
  
export default LandingPage
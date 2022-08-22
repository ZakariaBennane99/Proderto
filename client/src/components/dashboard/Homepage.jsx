/* eslint-disable no-lone-blocks */
import React from 'react'
import '../../styles/landing.css'
import Header from './Header'
import AchievedContainer from './AchievedContainer'
import DeadlineContainer from './DeadlineContainer'
import Postprompt from './Postprompt'



const HomePage = () => {

  const screenWidth = window.innerWidth

  return (
    screenWidth < 1070 ? 
      <>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Postprompt mobile={true}/>
        </div>
      </>
    :
      <>
        <Header />
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px', width: screenWidth < 1501 ? "100%" : "1400px" }}>
            <AchievedContainer />
            <Postprompt />
            <DeadlineContainer />
          </div>
        </div>
      </>)
}
  
export default HomePage
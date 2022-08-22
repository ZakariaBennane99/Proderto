/* eslint-disable no-lone-blocks */
import Achieved from './Achieved'
import checkMark from '../../Design_Stuff/Dashboard/check-mark.svg'
import React, { useRef } from 'react'



const AchievedContainer = () => {

    const ach = useRef(null)

    const screenWidth = window.innerWidth

    return (
      <div className='achieved-container' onScroll={(e) => { ach.current.onScroll(e) }} style={{ width: screenWidth < 1070 ? "80vw" : "" }}>
              <div style={{ display: 'flex', position: 'sticky', top: '0', backgroundColor: 'white', borderBottom: '2px solid #F4F4F4' }}>
                  <h1 id='ach'>Achieved</h1>
                  <img src={checkMark} alt="check" style={{ width: '35px', marginBottom: '9px' }} />
              </div>
              <hr />
          <Achieved ref={ach}/>
      </div>)
}
  
export default AchievedContainer
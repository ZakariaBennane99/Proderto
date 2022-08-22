/* eslint-disable no-lone-blocks */
import Deadline from './Deadline'
import React, { useRef } from 'react'
import fire from '../../Design_Stuff/Dashboard/fire-deadline.svg'



const DeadlineContainer = () => {

  const screenWidth = window.innerWidth

  const deadline = useRef(null)

  return (
    <div className='achieved-container' onScroll={(e) => { deadline.current.onScroll(e) }} style={{ width: screenWidth < 1070 ? "80vw" : "" }}>
            <div style={{ display: 'flex', position: 'sticky', top: '0', backgroundColor: 'white', borderBottom: '2px solid #F4F4F4' }}>
                <h1 id='ach'>Deadline</h1>
                <img src={fire} alt="check" style={{ width: '35px', marginBottom: '9px' }} />
            </div>
            <hr />
            <Deadline ref={deadline}/>
    </div>)
}
  
export default DeadlineContainer
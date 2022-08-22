/* eslint-disable no-lone-blocks */
import NewGoals from './NewGoals'
import React, { useRef } from 'react'


const NewGoalsContainer = ({ mobile }) => {

    const ne = useRef(null)

    return (
      <div className='newGoals-container' onScroll={(e) => { ne.current.onScroll(e) }} style={{ width: mobile ? "80vw" : "" }}>
          <div id='new-goals-head-container'>
              <h1>New Goals</h1>
          </div>
          <hr />
          <NewGoals ref={ne}/>
      </div>)
}
  
export default NewGoalsContainer
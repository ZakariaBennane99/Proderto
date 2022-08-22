import ambitious from '../../Design_Stuff/Dashboard/ambitious.svg'
import outstanding from '../../Design_Stuff/Dashboard/outstanding.svg'
import keepUp from '../../Design_Stuff/Dashboard/you_have_got_this.svg'
import React, { useState } from 'react'



const AwardModal = ({ remove, update }) => {

    const [selectedAward, setSelectedAward] = useState()

    function handleSelectedAward (e) {
        setSelectedAward(e.currentTarget.id)

    }

    function handleAward (e) {
        // remove, then update the post
        if (selectedAward) {
            update(e)
        }
    }


    return (
        <>
            <div className='modal-background' id='reward' onClick={remove}></div>
            <div className='award-modal'>
                <h1 style={{ color: "#6B6B6B", textAlign: "center", padding: '15px', fontFamily: 'Open Sans Medium', fontSize: 'larger' }}>Give An Award</h1>
                <hr />
                <div className={selectedAward === 'egregius' ? 'award-mini-containers outline' : 'award-mini-containers' } id='egregius' onClick={handleSelectedAward}>
                    <p style={{ color: '#8C8B8B' }}>Just Outstanding</p>
                    <img src={outstanding} alt="" style={{ width: '90px' }} />
                </div>
                <div className={selectedAward === 'ambitious' ? 'award-mini-containers outline' : 'award-mini-containers' } id='ambitious' onClick={handleSelectedAward}>
                    <p style={{ color: '#8C8B8B' }}>Ambitious</p>
                    <img src={ambitious} alt="" style={{ width: '90px' }} />
                </div>
                <div className={selectedAward === 'gotHoc' ? 'award-mini-containers outline' : 'award-mini-containers' } id='gotHoc' onClick={handleSelectedAward}>
                    <p style={{ color: '#8C8B8B' }}>Keep Up The Work</p>
                    <img src={keepUp} alt="" style={{ width: '90px' }} />
                </div>
                <button id='reward' name={selectedAward} onClick={handleAward}>Award</button>
            </div>
        </>
    )
}


export default AwardModal
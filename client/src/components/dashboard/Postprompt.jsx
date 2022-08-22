import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import ShareModal from './ShareModal'
import NewGoalsContainer from './NewGoalsContainer'
import React, { useState } from 'react'
import PostInputArea from './PostInputArea'




const Postprompt = ({ mobile }) => {

    const imgAvatar = JSON.parse(localStorage.getItem("prodertoUserAvatar")) || avatarPlaceholder

    const [clicked, setClicked] = useState(false)

    const [postId, setPostId] = useState()

    function handlePromptClick () {
        setClicked(!clicked)
    }


    return (
        clicked ? 
        <>
            <PostInputArea setPostId={setPostId} />
            {postId ? 
                <ShareModal postId={postId} /> 
            :    ""
            }
        </>    
        :
        <div style={{ display: 'flex', flexDirection: 'column', width: mobile ? "85vw" : "36%" }}>
            <div className='postPrompt-holder' onClick={handlePromptClick} >
                <div className='inner-postPrompt'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={imgAvatar} alt='' style={{ width:'50px', border: '2px solid #E8E8E8', borderRadius: '12px' }} />
                        <p>You Next Goal...</p>
                    </div>
                    <div className='share'>Share</div>
                </div>
            </div>
            <NewGoalsContainer />
        </div>)
}
    
export default Postprompt
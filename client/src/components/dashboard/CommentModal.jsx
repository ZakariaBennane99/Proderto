import React, { useState } from 'react'


const CommentModal = ({ add, remove, update, comment }) => {

    const [textarea, setTextarea] = useState(comment.text)

    function handleTextarea (e) {
        setTextarea(e.target.value)
    }

    return (
        <>
            <div className='modal-background' id='comment' onClick={remove}></div>
            <div className='comment-modal'>
                <textarea value={textarea} onChange={handleTextarea} placeholder='Type a comment...'></textarea>
                {comment.text.length > 0 ? 
                    <button name={comment.id} id='comment' data-text={textarea} onClick={update}><h1>Update</h1></button>
                    :
                    <button id='comment' data-text={textarea} onClick={add}><h1>Post</h1></button>
                }
                
            </div>
        </>
    )
}


export default CommentModal
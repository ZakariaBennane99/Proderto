import Rating from "@mui/material/Rating"
import React, { useState } from 'react'
import axios from 'axios'



const Feedback = ({ init }) => {

    const [remove, setRemove] = useState(false)

    const [feedback, setFeedback] = useState("")

    const [rating, setRating] = useState(0)

    async function handleFeedback () {
        const URL = "http://localhost:3000/api/marketing"
        const r = await axios.post(URL, { rating: rating, feedback: feedback })
        setRemove(!remove)
        init()
    } 

    return (
        <>
        { 
            remove ?
            "" :
            <>
                <div className='modal-background' id='reward' onClick={() => { 
                    setRemove(!remove)
                    init() }}>
                </div>
                <div className='award-modal feedback-holder'>
                    <h1>We'd love to hear from you!</h1>
                    <h2>How do you feel about the site?</h2>
                    <Rating
                        name="simple-controlled"
                        sx={{
                          color: "rgba(14,150,72,1)"
                        }}
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue)
                        }}
                    />
                    <h2>How can we improve?</h2>
                    <textarea value={feedback} onChange={(e) => { setFeedback(e.target.value) }}></textarea>
                    <button onClick={handleFeedback}>
                        Send
                    </button>
                </div>
            </>
        }
        </>
    )
}


export default Feedback
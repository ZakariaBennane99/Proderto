import add from '../../Design_Stuff/Dashboard/addM.svg'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const PostInputArea = ({ setPostId, postData }) => {

    const screenWidth = window.innerWidth

    let navigate = useNavigate()

    const token = localStorage.getItem("prodertoPassToken")

    const [title, setTitle] = useState(postData ? postData.title : "")

    const [text, setText] = useState(postData ? postData.desc: "")

    const [deadline, setDeadline] = useState()

    function getCurrentDate () {
        const d = new Date()
        const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate().toString()
        const month = (d.getMonth() + 1).toString().length === 1 ? "0" + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString()
        const hours = d.getHours().toString().length === 1 ? "0" + d.getHours().toString() : d.getHours().toString()
        const minutes = d.getMinutes().toString().length === 1 ? "0" + d.getMinutes().toString() : d.getMinutes().toString()
        return d.getFullYear().toString() + "-" + month + "-" + day + "T" + hours + ":" + minutes
    }

    function getPostDate () {
        const s = postData.deadline.split(",").map(el => el.trim())
        const time = s[3].split(":")
        const day = s[0].length === 1 ? "0" + s[0] : s[0]
        const month = s[1].length === 1 ? "0" + s[1] : s[1]
        const hours = time[0].length === 1 ? "0" + time[0] : time[0]
        const minutes = time[1].length === 1 ? "0" + time[1] : time[1] 
        return s[2] + "-" + month + "-" + day + "T" + hours + ":" + minutes

    }

    const [deadlineUnformatted, setDeadlineUnformatted] = useState(postData ? getPostDate() : getCurrentDate())

    const [milestones, setMilestones] = useState(postData ? 
        postData.milestones
        : [{
        milestone: 'Milestone 1...',
        achieved: false
    }, {
        milestone: 'Milestone 2...',
        checked: false
    }])

    function handleDesc (e) {
        setText(e.target.value)
    } 

    function handleMilestonesChange (e) {
        const milestoneId = e.target.id
        if (e.target.type === "checkbox") {
            setMilestones((prev) => {
                return prev.map((milestone, index) => {
                    if (milestoneId === index.toString()) {
                        return {...milestone, achieved: e.target.checked}
                    } else {
                        return milestone
                    }
                })
            })
        } else {
            setMilestones((prev) => {
                return prev.map((milestone, index) => {
                    if (milestoneId === index.toString()) {
                        return {...milestone, milestone: e.target.value}
                    } else {
                        return milestone
                    }
                })
            })
        }
    }

    function handleDate (e) {
        setDeadlineUnformatted(e.target.value.toString())
        const s = e.target.value.toString().split("-")
        const c = s[2].split("T")
        const deadline = c[0] + ", " + s[1] + ", " + s[0] + ", " + c[1].split(":")[0] + ":" + c[1].split(":")[1]
        setDeadline(deadline)
    }

    function getDate () {
        const d = new Date()
        return d.getDate().toString() + ", " + (d.getMonth() + 1).toString() + ", " + d.getFullYear().toString() + ", " + d.getHours().toString() + ":" + d.getMinutes().toString()
    }

    async function handlePublish () {
        const url = "https://proderto.com/api/posts"
        try {
            const res = await axios.post(url, {
                title: title,
                desc: text,
                milestones: milestones,
                deadline: deadline,
                date: getDate()
            }, {
                headers: {
                    "x-auth-token": JSON.parse(token)
                }
            })
            setPostId(res.data)
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.errors[0].msg)
            } else {
                alert("Something bad happened, please try again later")
                console.log(err)
            }
        }
    }


    async function handleUpdate () {
        const url = "https://proderto.com/api/posts/update/" + postData.postId
        try {
            const res = await axios.put(url, {
                title: title,
                desc: text,
                milestones: milestones,
                deadline: deadline,
                date: getDate()
            }, {
                headers: {
                    "x-auth-token": JSON.parse(token)
                }
            })
            if (res.status === 201) {
                window.location.reload()
                return 
            }
        } catch (err) {
            if (err.response.status === 404) {
                alert(err.response.data.errors[0].msg)
            } else if (err.response.status === 401) {
                navigate("/login")
            } else {
                alert("Something bad happened, please try again later")
                console.log(err)
            }
        }
    }


    return (<div className='post-area-container' style={{ width: screenWidth < 610 ? "88vw" : "" }}>
                <div style={{ padding: '20px' }}>
                    <input type="text" id="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <hr />
                <div style={{ padding: '20px', paddingRight: '28px', height: '35%' }}>
                    <textarea id="desc" value={text} onChange={handleDesc} placeholder='Description...'/>
                </div>
                <hr />
                <div className='milestones-container'>  
                    <div style={{ padding: '20px' }}>
                        {milestones.map((el, i) => {
                            return <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                {el.achieved ? <input type="checkbox" id={i} onChange={handleMilestonesChange} checked/> : <input type="checkbox" id={i} onChange={handleMilestonesChange} /> } 
                                <textarea value={el.milestone} id={i} onChange={handleMilestonesChange}></textarea>
                            </div>
                        })}
                        <div style={{ width: "100%", textAlign: "center" }}>
                            <img src={add} alt="" style={{ width: "30px", cursor: "pointer" }} onClick={() => setMilestones(prev => [...prev, { achieved: false, milestone: "Milestone " + (milestones.length + 1) + "..." }])}/>
                        </div> 
                    </div>
                    <hr />
                    <div style={{ display: "flex", margin: "20px", alignItems: "center" }}>
                        <p style={{ marginRight: "80px" }}>Deadline</p>
                        <input type="datetime-local" value={deadlineUnformatted} style={{ outline: "none", marginTop: "10px" }} onChange={handleDate} />
                    </div>
                </div>
                <hr />
                <div className='publish-container'>
                    <button onClick={postData ? handleUpdate : handlePublish}>{postData ? "Update" : "Publish"}</button>
                </div>
            </div>)
}
    
export default PostInputArea














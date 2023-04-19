import Header from './Header'
import checked from '../../Design_Stuff/Dashboard/checked.svg'
import unchecked from '../../Design_Stuff/Dashboard/unchecked.svg'
import like from '../../Design_Stuff/Dashboard/like.svg'
import comment from '../../Design_Stuff/Dashboard/comment.svg'
import award from '../../Design_Stuff/Dashboard/award.svg'
import share from '../../Design_Stuff/Dashboard/share.svg'
import keepUp from "../../Design_Stuff/Dashboard/you_have_got_this.svg"
import outstanding from "../../Design_Stuff/Dashboard/outstanding.svg"
import ambitious from "../../Design_Stuff/Dashboard/ambitious.svg"
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import AwardModal from './AwardModal'
import CommentModal from './CommentModal'
import ShareModal from './ShareModal'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostInputArea from './PostInputArea'


const Post = ({ data }) => {

    const screenWidth = window.innerWidth

    const currentUserId = JSON.parse(window.localStorage.getItem("prodertoUserId"))

    const [updatePost, setUpdatePost] = useState()

    const [post, setPost] = useState(data.post)

    const [updatedComment, setUpdatedComment] = useState({
        id: "",
        text: "" 
    })

    const [clickedUpdateComment, setClickedUpdateComment] = useState(false)

    const [isLiked, setIsLiked] = useState(post.likes.filter(like => like.user === currentUserId).length !== 0)

    const token = window.localStorage.getItem("prodertoPassToken")

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getMonth (mInNum) {
        const toMonth = [{
          "1": "Jan"
        }, {
          "2": "Feb"
        }, {
          "3": "Mar"
        }, {
          "4": "Abr"
        }, {
          "5": "May"
        }, {
          "6": "Jun"
        }, {
          "7": "Jul"
        }, {
          "8": "Aug"
        }, {
          "9": "Sep"
        }, {
          "10": "Oct"
        }, {
          "11": "Nov"
        }, {
          "12": "Dec"
        }]
        return toMonth.find(el => el[mInNum])[mInNum]
    }

    const [clickedSocial, setClickedSocial] = useState('likes')

    const [clickedAction, setClickedAction] = useState('')

    const [removeModal, setRemoveModal] = useState('')

    const [dotClicked, setClickedDot] = useState(false)

    const [dotClickedCom, setClickedDotCom] = useState(false)

    function handleSocialClick (e) {
        setClickedSocial(e.currentTarget.id)
    }

    function handleRemove (e) {
        if (updatedComment.text.length > 0) {
            setClickedUpdateComment(!clickedUpdateComment)
            setUpdatedComment({
                id: "",
                text: ""
            })
        }
        setRemoveModal(e.target.id)
        setClickedAction('likes')
        setRemoveModal('')
    }

    function handleDotClicked () {
        setClickedDot(!dotClicked)
    }

    function handleDotClickedCom () {
        setClickedDotCom(!dotClickedCom)
    }
    
    function handleCommentBeforeUpdate (e) {
        setClickedDotCom(!dotClickedCom)
        setUpdatedComment({
            id: e.currentTarget.id,
            text: e.currentTarget.dataset.text
        })
        setClickedUpdateComment(!clickedUpdateComment)
    }

    async function handleCommentUpdate (e) {
        const commentId = e.currentTarget.name
        const URL = "https://proderto.com/api/posts/comment/" + post._id + "/" + commentId
        try {
            const res = await axios.put(URL, {
                text: e.currentTarget.dataset.text
            } ,{
                headers: {
                    "x-auth-token": JSON.parse(token)
                }
            })
            if (res.status === 200) {
                handleRemove(e)
                setPost((post) => {
                    return {...post, comments: post.comments.map((comment) => {
                        if (comment._id === commentId) {
                            return {
                                ...comment, text: res.data
                            }
                        } else {
                            return comment
                        }
                    })}
                })
                return
            }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleCommentDelete (e) {
        const commentId = e.currentTarget.id
        const URL = "https://proderto.com/api/posts/comment/" + post._id + "/" + commentId
        try {
            const res = await axios.delete(URL, {
                headers: {
                    "x-auth-token": JSON.parse(token)
                }
            })
            if (res.status === 200) {
                setPost((post) => {
                    return {...post, comments: post.comments.filter(comment => comment._id !== commentId)}
                })
                return
            } 
        } catch (err) {
            console.log(err)
        }
    }

    function updateEntirePost () {
        setUpdatePost(true)
    }

    async function handlePostUpdate (e) {
        const action = e.currentTarget.id
        setClickedAction(action)
        // date to be sent to the backend
        const token = window.localStorage.getItem('prodertoPassToken')
        const d = new Date()
        const currentDate = getMonth((d.getMonth() + 1).toString()) + " " + d.getDate().toString() + ", " + d.getFullYear().toString()

        
        if (action === "comment") {  
            if (e.currentTarget.dataset.text && e.currentTarget.dataset.text.length > 0 ) {
                handleRemove(e)
                const URL = "https://proderto.com/api/posts/comment/" + post._id
                const r = await axios.post(URL, { d: currentDate, text: e.currentTarget.dataset.text }, {
                    headers: {
                        "x-auth-token": JSON.parse(token)
                    }
                })
                if (r.status === 200) {
                    setPost((post) => {
                        return {...post, comments: [r.data, ...post.comments] }
                    })
                    return
                }
            }
            return
        } else if (action === "reward") {
            handleRemove(e)
            if (!post.rewards.some(el => el.user === currentUserId && el.reward === e.currentTarget.name)) {
                const URL = "https://proderto.com/api/posts/reward/" + post._id
                const r = await axios.post(URL, { d: currentDate, reward: e.currentTarget.name }, {
                    headers: {
                        "x-auth-token": JSON.parse(token)
                    }
                })
                if (r.status === 200) {
                    setPost((post) => {
                        return {...post, rewards: [r.data, ...post.rewards] }
                    })
                    return
                }
            }
            return
        }


        const URL = "https://proderto.com/api/posts/" + action + "/" + post._id

        if (action === "share" && post.shares.filter(el => el.user === currentUserId).length === 0) {
            const r = await axios.put(URL, { currentDate }, {
                headers: {
                    "x-auth-token": JSON.parse(token),
                }
            })
            if (r.status === 200) {
                setPost((post) => {
                    return {...post, shares: [r.data, ...post.shares] }
                })
                handleRemove(e)
                return
            }
            handleRemove(e)
            return
            
        } else if (action === "like" || action === "unlike") {
            const re = await axios.put(URL, { currentDate }, {
                headers: {
                    "x-auth-token": JSON.parse(token),
                }
            })
    
            if (re.status === 200) {
                if (action === "like") {
                    setPost((post) => {
                        return {...post, likes: [re.data, ...post.likes]}
                    })
                    setIsLiked(!isLiked)
                    return
                } 
        
                if (action === "unlike") {
                    setPost((post) => {
                        return {...post, likes: post.likes.filter(el => el.user !== currentUserId) }
                    })
                    setIsLiked(!isLiked)
                    return
                }
                return
            }
        }
    }

    
    return (
        <>
            <Header />
            {
                updatePost ?
                <PostInputArea postData={{
                    postId: post._id,
                    title: post.title,
                    desc: post.desc,
                    milestones: post.milestones,
                    deadline: post.deadline
                }} /> :
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='the-post-container' style={{ width: screenWidth < 950 ? "87vw" : "" }}>
                    <div className='user-and-post-container'>
                        <div className='the-post-head' style={{ flexDirection: screenWidth < 550 ? "column" : "row", alignItems: screenWidth < 550 ? "flex-start" : "center" }}>
                            <Link to={{pathname: '/profiles/' + post.user._id}}>
                                <div className='post-reactors' style={{ display: 'flex', padding: '5px', alignItems: 'center', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                    <img src={`data:image/${post.user.avatar.extension};base64, ${data.img}` || avatarPlaceholder} alt='' style={{ width: '70px',  border: '2.5px solid #E8E8E8', borderRadius: '15px' }}/>
                                    <div style={{ marginLeft: '10px' }}>
                                        <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '23px', marginBottom: '5px', color: '#383838' }}>{capitalize(post.user.fName) + " " + capitalize(post.user.lName)}</h1>
                                        <p style={{ fontSize: '12px', color: '#999999' }}>{getMonth(post.date.split(",")[1].trim()) + " " + post.date.split(",")[0] + ", " + post.date.split(",")[2]}</p>
                                    </div>
                                </div>
                            </Link>    
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: screenWidth < 550 ? "flex-end" : "center" }}>
                                { currentUserId === post.user._id ?
                                <div className='udpate-dots-container' onClick={handleDotClicked}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div> : ""}
                                {dotClicked ? <div className='the-update-container' onClick={updateEntirePost}><p>Update post</p></div> : ""}
                                <div className='progress-bar-container' style={{ width: screenWidth < 365 ? '185px' : "280px", height: '15px', marginTop: screenWidth < 550 ? "10px" : "" }}>
                                    <div className='the-progress-bar' style={{ width: (post.milestones.filter(el => el.achieved === true).length / post.milestones.length)*100 + '%', height: '15px' }}></div>
                                </div>
                            </div> 
                        </div>
                        <h1 style={{ fontSize: '1.8em', fontFamily: 'Open Sans Medium', color: '#383838', marginBottom: '13px' }}>{post.title}</h1>
                        <p style={{ fontSize: '1.1em', fontFamily: 'Open Sans Regular', color: '#383838', lineHeight: '1.5', marginBottom: '17px' }}>{post.desc}</p>
                        {post.milestones.map(el => {
                            return <div style={{ display: "flex", lineHeight: "1.5", alignItems: 'self-start', marginBottom:'8px' }}>
                                <img src={el.achieved ? checked : unchecked} alt="" style={{ width: "23px", marginRight: '10px' }} disabled/>
                                <p>{el.milestone}</p>
                            </div>
                        })}
                    </div>
                    <div className='users-reactions-container'>
                        <div style={{ paddingRight: '18px', paddingLeft: '18px', marginBottom: '12px' }}>
                            <div style={{ display: "flex", width: '100%', justifyContent: 'space-between', flexWrap: "wrap"}}>
                                <div className={clickedSocial === 'likes' ? 'social-btns keep-alive' : 'social-btns' } id='likes' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: screenWidth < 550 ? "5px" : "" }} onClick={handleSocialClick}>
                                    <img src={like} alt="" style={{ width: '30px' }} /> 
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.likes.length > 1 ? post.likes.length + ' Likes' : post.likes.length === 1 ? '1 Like' : 'Like' }</p>
                                </div>
                                <div className={clickedSocial === 'rewards' ? 'social-btns keep-alive' : 'social-btns' } id='rewards' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: screenWidth < 550 ? "5px" : ""  }} onClick={handleSocialClick}>
                                    <img src={award} alt="" style={{ width: '30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.rewards.length > 1 ? post.rewards.length + ' Awards' : post.rewards.length === 1 ? '1 Award' : 'Award' }</p>
                                 </div>
                                <div className={clickedSocial === 'comments' ? 'social-btns keep-alive' : 'social-btns' } id='comments' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: screenWidth < 550 ? "5px" : "" }} onClick={handleSocialClick}>
                                    <img src={comment} alt="" style={{ width: '30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.comments.length > 1 ? post.comments.length + ' Comments' : post.comments.length === 1 ? '1 Comment' : 'Comment' }</p></div>
                                <div className={clickedSocial === 'shares' ? 'social-btns keep-alive' : 'social-btns' } id='shares' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: screenWidth < 550 ? "5px" : "" }} onClick={handleSocialClick}>
                                    <img src={share} alt="" style={{ width: '30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.shares.length > 1 ? post.shares.length + ' Shares' : post.shares.length === 1 ? '1 Share' : 'Share' }</p></div>
                            </div>
                        </div>    
                        <hr />
                        {clickedSocial === 'likes' ? 
                          <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h1 className='social-actions' id={isLiked ? "unlike" : "like"} onClick={handlePostUpdate}>{isLiked ? "Unlike" : "like"}</h1>
                            </div>
                            <hr />
                            {post.likes.map(el => {
                                return (
                                    <Link to={{pathname: '/profiles/' + el.user}}>
                                        <div className='post-reactors' style={{ display: 'flex', padding: '8px', alignItems: 'center', marginTop: '8px', marginLeft: '8px', marginBottom: '8px', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                            <img src={el.avatar ? `data:image/;base64, ${el.avatar}` : avatarPlaceholder} alt='' style={{ width: '40px',  border: '2.5px solid #E8E8E8', borderRadius: '11px' }}/>
                                            <div style={{ marginLeft: '10px' }}>
                                                <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '18px', marginBottom: '5px', color: '#383838' }}>{capitalize(el.fName)}</h1>
                                                <p style={{ fontSize: '10px', color: '#999999' }}>{el.date}</p>
                                            </div>
                                        </div>
                                    </Link>)
                            })}
                          </>
                         : clickedSocial === 'comments' ? 
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1 className='social-actions' id='comment' onClick={handlePostUpdate}>Comment</h1>
                                </div>
                                <hr />
                                {post.comments.map(el => {
                                    return (<div style={{ margin: "13px" }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", position: "relative"}}>
                                                    <Link to={{pathname: '/profiles/' + el.user}}>
                                                        <div className='post-reactors' style={{ display: 'flex', padding: '8px', alignItems: 'center', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                                            <img src={el.avatar ? `data:image/;base64, ${el.avatar}` : avatarPlaceholder} alt='' style={{ width: '40px',  border: '2px solid #E8E8E8', borderRadius: '11px' }}/>
                                                            <div style={{ marginLeft: '10px' }}>
                                                                <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '18px', marginBottom: '5px', color: '#383838' }}>{capitalize(el.fName)}</h1>
                                                                <p style={{ fontSize: '10px', color: '#999999' }}>{el.date}</p>
                                                            </div>
                                                        </div>  
                                                    </Link>
                                                    {
                                                        currentUserId === el.user ?
                                                        <>
                                                            <div className='udpate-dots-container' onClick={handleDotClickedCom}>
                                                                <FontAwesomeIcon icon={faEllipsis} />
                                                            </div>
                                                            {dotClickedCom ? <div className='the-update-container-com'>
                                                                <p style={{ fontSize: "small", padding: "8px" }} id={el._id} onClick={handleCommentBeforeUpdate} data-text={el.text}>Update</p>
                                                                <hr/>
                                                                <p style={{ fontSize: "small", padding: "8px" }} id={el._id} onClick={handleCommentDelete}>Delete</p>
                                                            </div> : ""}
                                                        </> :
                                                        ""
                                                    }
                                                </div>
                                                <p style={{ fontFamily: 'Open Sans Regular', fontSize: '0.85em', lineHeight: '1.5', marginLeft:'8px' }}>{el.text}</p>            
                                            </div>)
                                })}
                            </>
                         : clickedSocial === 'rewards' ? 
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1 className='social-actions' id='reward' onClick={(e) => setClickedAction(e.currentTarget.id)}>Give an Award</h1>
                                </div>
                                <hr />
                                {post.rewards.map(el => {
                                    return (<div style={{ marginLeft: '15px', marginRight: '15px' }}>
                                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '17px', marginTop: '10px', alignItems: 'center' }}>
                                                    <Link to={{pathname: '/profiles/' + el.user}}>    
                                                        <div className='post-reactors' style={{ display: 'flex', padding: '8px', alignItems: 'center', width: 'fit-content', borderRadius: '13px', cursor: 'pointer'}}>
                                                            <img src={el.avatar ? `data:image/;base64, ${el.avatar}` : avatarPlaceholder} alt='' style={{ width: '40px',  border: '2px solid #E8E8E8', borderRadius: '11px' }}/>
                                                            <div style={{ marginLeft: '10px' }}>
                                                                <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '18px', marginBottom: '5px', color: '#383838' }}>{capitalize(el.fName)}</h1>
                                                                <p style={{ fontSize: '10px', color: '#999999' }}>{el.date}</p>
                                                            </div>
                                                        </div>  
                                                    </Link>        
                                                <img src={el.reward === "gotHoc" ? keepUp : el.reward === "ambitious" ? ambitious : outstanding} alt="" style={{ width: '80px' }} />
                                            </div>
                                    </div>)})}
                            </>
                         :  <>   
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1 className='social-actions' id='share' onClick={(e) => setClickedAction(e.currentTarget.id)}>Share</h1>
                                </div>
                                <hr />
                                {post.shares.map(el => {
                                    return (<div>
                                                <Link to={{pathname: '/profiles/' + el.user}}>
                                                    <div className='post-reactors' 
                                                    style={{ display: 'flex', padding: '8px', alignItems: 'center', marginTop: '8px', marginLeft: '8px', marginBottom: '8px', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                                        <img src={el.avatar ? `data:image/;base64, ${el.avatar}` : avatarPlaceholder} alt='' style={{ width: '40px',  border: '2px solid #E8E8E8', borderRadius: '11px' }}/>
                                                        <div style={{ marginLeft: '10px' }}>
                                                            <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '18px', marginBottom: '5px', color: '#383838' }}>{capitalize(el.fName)}</h1>
                                                            <p style={{ fontSize: '10px', color: '#999999' }}>{el.date}</p>
                                                        </div>
                                                    </div>  
                                                </Link>
                                            </div>)})}
                            </>}
                        
                        
                    </div>
                </div>
                { clickedAction === 'reward' ? 
                  removeModal === 'reward' ? '' : <AwardModal remove={handleRemove} update={handlePostUpdate} /> :
                 clickedAction === 'comment' || clickedUpdateComment ?
                  removeModal === 'comment' ? '' : <CommentModal remove={handleRemove} add={handlePostUpdate} update={handleCommentUpdate} comment={updatedComment}/> : 
                 clickedAction === 'share'?
                  removeModal === 'share' ? '' : <ShareModal remove={handleRemove} update={handlePostUpdate} postId={post._id} /> : ''}
            </div>            
            }
        </>
    )
}
    


// <div className='comment-modal'></div>
// <div className='share-modal'></div>
// <AwardModal remove={handleRemove}/>


export default Post

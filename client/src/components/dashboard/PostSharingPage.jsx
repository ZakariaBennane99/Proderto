import LnHeader from '../landing/LnHeader'
import checked from '../../Design_Stuff/Dashboard/checked.svg'
import unchecked from '../../Design_Stuff/Dashboard/unchecked.svg'
import like from '../../Design_Stuff/Dashboard/like.svg'
import comment from '../../Design_Stuff/Dashboard/comment.svg'
import award from '../../Design_Stuff/Dashboard/award.svg'
import share from '../../Design_Stuff/Dashboard/share.svg'
import keepUp from "../../Design_Stuff/Dashboard/you_have_got_this.svg"
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import { Helmet } from "react-helmet"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const PostSharingPage = ({ data, postId }) => {

    const post = data.post

    const sharingURL = "https://proderto.com/posts/shared/" + postId  

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


    function handleSocialClick (e) {
        setClickedSocial(e.currentTarget.id)
    }

    return (
        <>
            <Helmet>
                <meta property='og:title' content='Title of the article' />
                <meta property='og:image' content={keepUp} />
                <meta property='og:description' content='Description that will show in the preview' />
                <meta property='og:url' content={sharingURL}   />
            </Helmet>
            <LnHeader type="post-sharing"/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='the-post-container'>
                    <div className='user-and-post-container'>
                        <div className='the-post-head'>
                                <div className='post-reactors' style={{ display: 'flex', padding: '5px', alignItems: 'center', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                    <img src={`data:image/${post.user.avatar.extension};base64, ${data.img}` || avatarPlaceholder} alt='' style={{ width: '70px',  border: '2.5px solid #E8E8E8', borderRadius: '15px' }}/>
                                    <div style={{ marginLeft: '10px' }}>
                                        <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '23px', marginBottom: '5px', color: '#383838' }}>{capitalize(post.user.fName) + " " + capitalize(post.user.lName)}</h1>
                                        <p style={{ fontSize: '12px', color: '#999999' }}>{getMonth(post.date.split(",")[1].trim()) + " " + post.date.split(",")[0] + ", " + post.date.split(",")[2]}</p>
                                    </div>
                                </div>  
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='progress-bar-container' style={{ width: '250px', height: '15px' }}>
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
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <div className={clickedSocial === 'likes' ? 'social-btns keep-alive' : 'social-btns' } id='likes' style={{ display: 'flex', alignItems: 'center' }} onClick={handleSocialClick}>
                                    <img src={like} alt="" style={{ width:'30px' }} /> 
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.likes.length > 1 ? post.likes.length + ' Likes' : post.likes.length === 1 ? '1 Like' : 'Like' }</p>
                                </div>
                                <div className={clickedSocial === 'rewards' ? 'social-btns keep-alive' : 'social-btns' } id='rewards' style={{ display: 'flex', alignItems: 'center'  }} onClick={handleSocialClick}>
                                    <img src={award} alt="" style={{ width:'30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.rewards.length > 1 ? post.rewards.length + ' Awards' : post.rewards.length === 1 ? '1 Award' : 'Award' }</p>
                                 </div>
                                <div className={clickedSocial === 'comments' ? 'social-btns keep-alive' : 'social-btns' } id='comments' style={{ display: 'flex', alignItems: 'center'  }} onClick={handleSocialClick}>
                                    <img src={comment} alt="" style={{ width:'30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.comments.length > 1 ? post.comments.length + ' Comments' : post.comments.length === 1 ? '1 Comment' : 'Comment' }</p></div>
                                <div className={clickedSocial === 'shares' ? 'social-btns keep-alive' : 'social-btns' } id='shares' style={{ display: 'flex', alignItems: 'center'  }} onClick={handleSocialClick}>
                                    <img src={share} alt="" style={{ width:'30px' }} />
                                    <p style={{ fontSize: '15px', paddingLeft: '2px', color: '#AFAFAF' }}>{post.shares.length > 1 ? post.shares.length + ' Shares' : post.shares.length === 1 ? '1 Share' : 'Share' }</p></div>
                            </div>
                        </div>    
                        <hr />
                        {clickedSocial === 'likes' ? 
                          <div>
                            {post.likes.map(el => {
                                return (
                                        <div className='post-reactors' style={{ display: 'flex', padding: '8px', alignItems: 'center', marginTop: '8px', marginLeft: '8px', marginBottom: '8px', width: 'fit-content', borderRadius: '13px', cursor: 'pointer' }}>
                                            <img src={el.avatar ? `data:image/;base64, ${el.avatar}` : avatarPlaceholder} alt='' style={{ width: '40px',  border: '2.5px solid #E8E8E8', borderRadius: '11px' }}/>
                                            <div style={{ marginLeft: '10px' }}>
                                                <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '18px', marginBottom: '5px', color: '#383838' }}>{capitalize(el.fName)}</h1>
                                                <p style={{ fontSize: '10px', color: '#999999' }}>{el.date}</p>
                                            </div>
                                        </div>)
                            })}
                          </div> : ""}
                          <div id='glass'>
                            <div className='signUp' style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link to={{ pathname: '/signup' }}>
                                <button>Sign Up</button>
                            </Link>    
                            </div>
                          </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default PostSharingPage

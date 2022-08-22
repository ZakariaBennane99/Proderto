//import data from '../../Data/Info/data'
import like from '../../Design_Stuff/Dashboard/like.svg'
import comment from '../../Design_Stuff/Dashboard/comment.svg'
import award from '../../Design_Stuff/Dashboard/award.svg'
import share from '../../Design_Stuff/Dashboard/share.svg'
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import React, { useState, useEffect, memo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'




const NewGoalsCon = memo(props => {

  const screenWidth = window.innerWidth

  async function setAvatar(el) {
    const url = 'https://proderto.com/api/profile/images';
    const r = await axios.get(url, {
      headers: {
        'user-id': el.user._id,
        extension: el.user.avatar.extension,
      },
    })
    return `data:image/${el.user.avatar.extension};base64, ${r.data}`;
  }

  const [avatars, setAvatars] = useState([])
  useEffect(() => {
      (async () => {
          const renderedAvatars = []
          for (const el of props.data) {
              if (el.user.avatar) {
                  renderedAvatars.push(await setAvatar(el))
              } else {
                  renderedAvatars.push(avatarPlaceholder)
              }
          }
          setAvatars(renderedAvatars)
      })()
  }, [props.data])

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
  


  return (
      <>
          {props.data.map((el, i) => {
            const rew = el.rewards.length
            const com = el.comments.length
            const sha = el.shares.length
            const lik = el.likes.length
              return (
                  <>
                      <Link to={{
                        pathname: '/posts/' + el._id
                      }}>
                        <div key={el._id} className='mini-post-container'>
                      <div className='post-head-info'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={avatars[i]} alt='' style={{ width: '60px',  border: '2px solid #E8E8E8', borderRadius: '12px' }}/>
                            <div style={{ marginLeft: '10px' }}>
                                <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '20px', marginBottom: '5px' }}>{capitalize(el.user.fName) + ' ' + capitalize(el.user.lName)}</h1>
                                <p style={{ fontSize: '11.5px', color: '#999999' }}>{getMonth(el.date.split(",")[1].trim()) + " " + el.date.split(",")[0] + ", " + el.date.split(",")[2]}</p>
                            </div>
                        </div>
                        <div className='progress-bar-holder' style={{ width: '155px', height: '12px', marginTop: screenWidth < 425 ? "10px" : "" }}><div className='progress-bar' 
                        style={{ width: (el.milestones.filter(el => el.achieved).length / el.milestones.length)*100 + '%', height: '11px' }}></div></div>
                        </div>
                        <div className='post-excerpt'>
                            <h1 style={{ fontSize: '20px' }}>{el.title}</h1>
                            <p style={{ fontSize: '14px' }}>{el.desc.substring(0, 25)}... <u>Continue To Post</u></p>
                        </div>
                        <div className='post-social-buttons'>
                            <div style={{ margin: "5px" }}>
                                <img src={like} alt="" style={{ width:'25px' }} />
                                <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{lik > 1 ? lik + ' Likes' : lik === 1 ? '1 Like' : 'like' }</p>
                            </div>
                            <div style={{ margin: "5px" }}>
                                <img src={award} alt="" style={{ width:'25px' }} /> 
                                <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{rew > 1 ? rew + ' Awards' : rew === 1 ? '1 Award' : 'Award' }</p>
                            </div>
                            <div style={{ margin: "5px" }}>
                                <img src={comment} alt="" style={{ width:'25px' }} /> 
                                <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{com > 1 ? com + ' Comments' : com === 1 ? '1 Comment' : 'Comment' }</p>
                            </div>
                            <div style={{ margin: "5px" }}>
                                <img src={share} alt="" style={{ width:'25px' }} /> 
                                <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{sha > 1 ? sha + ' Shares' : sha === 1 ? '1 Share' : 'Share' }</p>
                            </div>
                        </div>
                      </div>
                      </Link>
                      <hr />
                  </>)})}
      </>)
})

  
export default NewGoalsCon

















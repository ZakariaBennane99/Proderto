import '../../styles/dashboard.css'
import like from '../../Design_Stuff/Dashboard/like.svg'
import comment from '../../Design_Stuff/Dashboard/comment.svg'
import award from '../../Design_Stuff/Dashboard/award.svg'
import share from '../../Design_Stuff/Dashboard/share.svg'
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'



const AchDead = ({ data }) => {

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
          for (const el of data) {
              if (el.user.avatar) {
                renderedAvatars.push(await setAvatar(el))
              } else {
                renderedAvatars.push(avatarPlaceholder)
              }
          }
          setAvatars(renderedAvatars)
      })()
  }, [data])

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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



  return (<>
        {data.map((el, i) => {
          const lik = el.likes.length
          const sha = el.shares.length
          const rew = el.rewards.length
          const com = el.comments.length
          return (<>
            <Link to={{
                  pathname: '/posts/' + el._id 
            }}>
            <div key={el._id} className='mini-post-container'>
            <div className='post-head-info'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={avatars[i]} alt='' style={{ width: screenWidth < 1070 ? '60px' : '40px',  border: '2px solid #E8E8E8', borderRadius: '11px' }}/>
                <div style={{ marginLeft: '10px' }}>
                  <h1 style={{ fontFamily: 'Open Sans Medium', marginBottom: '5px', fontSize: screenWidth < 1070 ? "20px" : "" }}>{capitalize(el.user.fName) + ' ' + capitalize(el.user.lName)}</h1>
                  <p style={{ fontSize: screenWidth < 1070 ? '11.5px' : "10px", color: '#999999' }}>{getMonth(el.date.split(",")[1].trim()) + " " + el.date.split(",")[0] + ", " + el.date.split(",")[2]}</p>
                </div>
              </div>
              <div className='progress-bar-holder'><div className='progress-bar' 
              style={{ width: (el.milestones.filter(el => el.achieved).length / el.milestones.length)*100 + '%' }}></div></div>
            </div>
            <div className='post-excerpt'>
              <h1>{el.title}</h1>
              <p>{el.desc.substring(0, 25)}... <u>Continue To Post</u></p>
            </div>
            <div className='post-social-buttons'>
              <div><img src={like} alt="" style={{ width: screenWidth < 1070 ? '25px' : "15px" }} /> <p style={{ fontSize: screenWidth < 1070 ? '13px' : "10px", paddingLeft: '2px', color: '#AFAFAF' }}>{lik > 1 ? lik + ' Likes' : lik === 1 ? '1 Like' : 'like' }</p></div>
              <div><img src={award} alt="" style={{ width:screenWidth < 1070 ? '25px' : "15px" }} /> <p style={{ fontSize: screenWidth < 1070 ? '13px' : "10px", paddingLeft: '2px', color: '#AFAFAF' }}>{rew > 1 ? rew + ' rewards' : rew === 1 ? '1 Award' : 'Award' }</p></div>
              <div><img src={comment} alt="" style={{ width:screenWidth < 1070 ? '25px' : "15px" }} /> <p style={{ fontSize: screenWidth < 1070 ? '13px' : "10px", paddingLeft: '2px', color: '#AFAFAF' }}>{com > 1 ? com + ' Comments' : com === 1 ? '1 Comment' : 'Comment' }</p></div>
              <div><img src={share} alt="" style={{ width:screenWidth < 1070 ? '25px' : "15px" }} /> <p style={{ fontSize: screenWidth < 1070 ? '13px' : "10px", paddingLeft: '2px', color: '#AFAFAF' }}>{sha > 1 ? sha + ' Shares' : sha === 1 ? '1 Share' : 'Shares' }</p></div>
            </div>
          </div>
          </Link>
          <hr />
        </>)
        })}
      </>
  )
}
  
export default AchDead




// the date format
// {getMonth(el.date.split(",")[1]) + " " + el.date.split(",")[0] + ", " + el.date.split(",")[2]}


/* Filter in case you need it
<div style={{ display: 'flex', justifyContent:'space-between', cursor: 'pointer' }}
        onClick={handleFilterApp} >
    <h2 id='filter-txt'>Filter</h2>
    <img src={filter} alt="filter" style={{ width: '35px', marginRight: '14px', 
    transform: isFilterClicked ? 'rotate(-180deg) scaleX(-1)' : 'rotate(0deg)' }}/>
</div>
<hr />
<div className='filter-dropdown' style={{ display: isFilterClicked ? 'block' : 'none' }} onMouseLeave={handleFilterApp}>
    <h1>By Goals</h1>
    <hr />
    <h1>By Milestones</h1>  
</div>
 */

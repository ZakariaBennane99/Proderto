import React from 'react'
import Header from './Header'
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import { Link } from 'react-router-dom'



const Search = ({ data, query }) => {

  const screenWidth = window.innerWidth

  function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getMonth (n) {
      const mInNum = n.trim()
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

  function formatDate (d) {
      const s = d.split(",")
      return getMonth(s[1]) + " " + s[0] + ", " + s[2]
  }


  return (
      <>
          <Header />
          <div style={{ display: 'flex', justifyContent:'center' }}>
              <div className='search-res-container' style={{ width: screenWidth < 750 ? "85vw" : "" }}>
                  <h1 id="s-res">Search Results For : <span style={{ fontStyle: "italic" }}>{query}</span></h1>
                  <hr />
                  {data.posts ?
                   data.posts.map(el => {
                      const regQ = new RegExp(query, 'i')
                      const t = el.trg.match(regQ)
                      const first = el.trg.split(regQ)[0]
                      const second = el.trg.split(regQ)[1]
                      return (<div key={el.id} >
                          <Link to={{pathname: '/posts/' + el.profile.postId}}>
                              <div className='search-query-container'>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '7px' }}>
                                      <img src={el.profile.avatar.img ? `data:image/${el.profile.avatar.img.extension};base64, ${el.profile.avatar.img}` : avatarPlaceholder } alt='' style={{ width: '60px',  border: '2px solid #E8E8E8', borderRadius: '12px' }}/>
                                      <div style={{ marginLeft: '10px' }}>
                                          <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '20px', color: '#616161', marginBottom: '3px'}}>{capitalize(el.profile.fName) + ' ' + capitalize(el.profile.lName)}</h1> 
                                          <p style={{ fontSize: '12px', color: '#999999' }}>{formatDate(el.profile.date)}</p>
                                      </div>
                                  </div>
                                  {el.trg ? 
                                  <div>
                                      <p style={{ color: '#616161' }}>{first}<span className='target-query-search'>{t}</span>{second}</p>
                                  </div> : ""}
                              </div>
                          </Link>
                      </div>)
                  }) : ""}
                  {data.users ? data.users.map(el => {
                      const fullName = capitalize(el.profile.fName) + ' ' + capitalize(el.profile.lName)
                      const regQ = new RegExp(query, 'i')
                      const t = fullName.match(regQ)
                      const first = fullName.split(regQ)[0]
                      const second = fullName.split(regQ)[1]
                      return (<div key={el.id} >
                          <Link to={{pathname: '/profiles/' + el.profile.userId}}>
                              <div className='search-query-container'>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '7px' }}>
                                      <img src={el.profile.avatar.img ? `data:image/${el.profile.avatar.img.extension};base64, ${el.profile.avatar.img}` : avatarPlaceholder } alt='' style={{ width: '60px',  border: '2px solid #E8E8E8', borderRadius: '12px' }}/>
                                      <div style={{ marginLeft: '10px' }}>
                                      <h1 style={{ fontFamily: 'Open Sans Medium', fontSize: '20px', color: '#616161', marginBottom: '3px'}}>{first}<span className='target-query-search'>{t}</span>{second}</h1> 
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>)
                  }) : ""}
              </div>
          </div>
      </>)
}
  
export default Search
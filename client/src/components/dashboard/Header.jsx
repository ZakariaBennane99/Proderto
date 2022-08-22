import '../../styles/dashboard.css'
import logo from '../../Design_Stuff/Dashboard/logo.svg'
import { faMagnifyingGlass, faPlay, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import { slide as Menu } from 'react-burger-menu'
import MobileSearchModal from './MobileSearchModal'




const Header = () => {

  const screenWidth = window.innerWidth

  const imgAvatar = JSON.parse(localStorage.getItem("prodertoUserAvatar")) || avatarPlaceholder

  const currentUserId = JSON.parse(localStorage.getItem("prodertoUserId"))

  const mounted = useRef(false)

  const userfName = JSON.parse(window.localStorage.getItem('prodertoUserFullName'))
  
  const [dropdownClicked, setDropdownClicked] = useState(false)

  const [searchTxt, setSearchTxt] = useState('') 
  
  const [homeBurgerClicked, setHomeBurgerClicked] = useState(false)

  const [isActive, setIsActive] = useState(false)

  const [searchEmpty, setSearchEmpty] = useState(false)

  const [mobileSearchClicked, setMobileSearchClicked] = useState(false)

  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false)

  const [profileBurgerClicked, setProfileBurgerClicked] = useState(false)

  let navigate = useNavigate()

  function handleDropdown () {
    setIsActive(!isActive)
    setDropdownClicked(!dropdownClicked)
  }

  function handleSearchChange (e) {
    if (searchEmpty) {
      setSearchEmpty(false)
    }
    setSearchTxt(e.target.value)
  }

  function handleSignOut () {
    // remove all stored items 
    localStorage.clear()
    // navigate back the landing page
    navigate("/")
  }

  function handleSearch () {
    // check if the input is empty => show a tag warning
    if (searchTxt.length < 3) {
      setSearchEmpty(true)
    } else {
      // send the text with the URL
      navigate("/search/" + searchTxt, { replace: true })
    }
  }

  // check if the target element has mounted
  useEffect(() => {
    mounted.current = true
    return () => { 
      mounted.current = false
    }
  }, [])

  function handleBurger (e) {
    setBurgerMenuClicked(e.target.checked)
  }

  function hanldleCloseBurger (e) {
    setBurgerMenuClicked(!burgerMenuClicked)
  }

  function handleHomeBurgerClicked (e) {
    const target = e.target.id
    if (target === "new-goals" || target === "achieved" || target === "near-deadline") {
      return
    } 
    setHomeBurgerClicked(!homeBurgerClicked)
  }

  function handleProfileBurgerClicked (e) {
    const target = e.target.id
    if (target === "profile" || target === "settings" || target === "sign-out") {
      return
    } 
    setProfileBurgerClicked(!profileBurgerClicked)
  }

 
  return (<>
  {screenWidth < 1070 ? 
    <>
      <div className='homepage-header'>
        <Link to={{ pathname: '/home' }}><div className='lg-container'> <img src={logo} style={{ width:'170px' }} alt="logo" /></div></Link>
        {
          mobileSearchClicked && !burgerMenuClicked ? 
          <MobileSearchModal remove={() => setMobileSearchClicked(!mobileSearchClicked)} handleSearch={handleSearch} searchEmpty={searchEmpty} searchChange={handleSearchChange} searchValue={searchTxt} /> :
          <div style={{ borderRadius: "8px", backgroundColor: "rgba(110, 110, 110, 0.2)", cursor: "pointer" }} onClick={() => setMobileSearchClicked(!mobileSearchClicked)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color:'#999999', padding: "10px" }} />
          </div>
        }
        <input type="checkbox" id="checkbox4" class="checkbox4 visuallyHidden" onClick={handleBurger} checked={burgerMenuClicked}/>
        <label for="checkbox4" style={{ marginRight: "40px" }}>
            <div class="hamburger hamburger4">
                <span class="bar bar1"></span>
                <span class="bar bar2"></span>
                <span class="bar bar3"></span>
                <span class="bar bar4"></span>
                <span class="bar bar5"></span>
            </div>
        </label>
      </div>
      <Menu isOpen={ burgerMenuClicked } onClose={hanldleCloseBurger} >
        <div onClick={handleHomeBurgerClicked}>Home<FontAwesomeIcon icon={faAngleRight} style={{ color:'#363636', fontWeight: "bolder", position: "absolute", right: "10px", transform: homeBurgerClicked ? "rotate(90deg)" : "" }} />
          <div style={{ display: !homeBurgerClicked ? "none" : "" }}>
            <Link to={{ pathname: '/home' }}><p id="new-goals" class="strong-mobile-menu" style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "#363636" }} >New Goals</p></Link>
            <Link to={{ pathname: '/mobile/home/achieved'}}><p id="achieved" class="strong-mobile-menu" style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "#363636" }} >Achieved</p></Link>
            <Link to={{ pathname: '/mobile/home/near-deadline'}}><p id="near-deadline" class="strong-mobile-menu" style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "#363636" }} >Near Deadline</p></Link>
          </div>
        </div>
        
        <div onClick={handleProfileBurgerClicked}>Profile<FontAwesomeIcon icon={faAngleRight} style={{ color:'#363636', fontWeight: "bolder", position: "absolute", right: "10px", transform: profileBurgerClicked ? "rotate(90deg)" : ""}} />
          <div style={{ display: !profileBurgerClicked ? "none" : "" }}>
            <Link to={{ pathname: '/profiles/' + currentUserId }}><p id="profile" class="strong-mobile-menu" style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "#363636" }}>Profile</p></Link>
            <Link to={{ pathname: '/settings'}}><p id="settings" class="strong-mobile-menu" style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "#363636" }}>Settings</p></Link>
            <p id='sign-out' class="strong-mobile-menu" onClick={handleSignOut} style={{ paddingTop: "20px", paddingLeft: "8px", fontSize: '0.9em', color: "rgb(206, 0, 0)" }} >Sign Out</p>
          </div>
        </div>
      </Menu>
    </>
   : 
   <div className='homepage-header'>
      <Link to={{ pathname: '/home'}}><div className='lg-container'> <img src={logo} style={{ width:'170px' }} alt="logo" /> </div></Link>
      <div className='search-container' style={{ outline: searchEmpty ? '3px solid red' : 'none'}} onKeyDown={(e) => e.key === "Enter" ? handleSearch() : ''}> 
        <div className='icon-container' onClick={handleSearch} >
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color:'#999999' }} />
        </div>
        <input type="text" placeholder='Search For Goals, People...' onChange={handleSearchChange} value={searchTxt} required="required"/>
      </div>
      <div>
        <div id='profile-info-header' className={isActive ? 'profile-info-container active-state-btn' : 'profile-info-container' } onClick={handleDropdown}> 
          <img src={imgAvatar} style={{ width:'45px', border: '1.2px solid #E8E8E8', borderRadius: '9px' }} alt="profile" /> 
            <h1>{userfName}</h1> 
            <FontAwesomeIcon icon={faPlay} style={{ transform: dropdownClicked? 'rotate(-90deg)' : 'rotate(90deg)' }} /> 
        </div>
        <div className='dropdown' style={{ display: dropdownClicked ? 'block' : 'none', width: mounted.current ? `${document.querySelector("#profile-info-header").offsetWidth}px` : "" }} onMouseLeave={handleDropdown}>
          <a href={"/profiles/" + currentUserId}><h1>Profile</h1></a>
          <hr />
          <a href="/settings"><h1>Settings</h1></a>
          <hr />
          <h1 id='sign-out' onClick={handleSignOut}>Sign Out</h1>
        </div>
      </div>
    </div>}
  </>)
}
  
export default Header
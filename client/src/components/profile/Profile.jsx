import '../../styles/profile.css'
import Header from '../dashboard/Header'
import like from '../../Design_Stuff/Dashboard/like.svg'
import comment from '../../Design_Stuff/Dashboard/comment.svg'
import award from '../../Design_Stuff/Dashboard/award.svg'
import share from '../../Design_Stuff/Dashboard/share.svg'
import bin from '../../Design_Stuff/Dashboard/bin.svg'
import avatarPlaceholder from '../../Design_Stuff/Profile/avatar.svg'
import coverPlaceholder from '../../Design_Stuff/Profile/cover.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import React, { useState } from 'react'


const Profile = ({ data }) => {

    // make a get request with the given profileId and get the needed inforamtion
    // depending on whether the user asking for the profile his own or not

    const screenWidth = window.innerWidth

    const [posts, setPosts] = useState(data.posts)

    const [coverImg, setCoverImg] = useState(data.sameUser ? JSON.parse(window.localStorage.getItem('prodertoUserCover')) || coverPlaceholder : data.cover.img ? `data:image/${data.cover.ex};base64, ${data.cover.img}` : coverPlaceholder)

    const [avatarImg, setAvatarImg] = useState(data.sameUser ? JSON.parse(window.localStorage.getItem('prodertoUserAvatar')) || avatarPlaceholder : data.avatar.img ? `data:image/${data.avatar.ex};base64, ${data.avatar.img}` : avatarPlaceholder)

    const token = window.localStorage.getItem("prodertoPassToken")

    let navigate = useNavigate()

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }    

    async function handleBinClick (e) {
        e.preventDefault()
        const postId = e.target.name
        const deleteURL = "https://proderto.com/api/posts/" + postId
        try {
            const res = await axios.delete(deleteURL, {
                headers: {
                    "x-auth-token": JSON.parse(token)
                }
            })
            if (res.status === 204) {
                setPosts(posts.filter(el => el.id !== postId))
            }
        } catch (err) {
            console.log(err)
        }
    } 

    async function handleImageUpload (e) {

        const imgType = e.target.id 
        const img = e.target.files[0]
        const extension = img.type.split('/')[1]

        // for multer
        const formData = new FormData()
        formData.append("file", img)

        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = (e) => {
          const image = new Image()
          image.src = e.target.result
          image.onload = (e) => {
            const height = e.target.height
            const width = e.target.width
            // get the image dimensions then check 
            // if they meet the requirements
            if (imgType === "Cover") {
                if (width > 1920 || height > 1080) {
                    alert("Your image's dimensions are: " + width + "x" + height + "\n Width and Height must not exceed 1920px and 1080px, respectively.")
                    return
                }
            } 
            if (imgType === "Avatar") {
                if (width !== height &&  width > 1024) {
                    alert("Your image's dimensions are: " + width + "x" + height + "\nWidth and Height must be equal and less than 1024px.")
                    return
                }
            }
            // check if it meets the required size 
            if (Math.floor(img.size / 1000) > 700) {
                alert("Please upload an image of less than 0.7MB.")
                return 
            }   
            // check if it is the required image extension
            if (!/jpeg|jpg|png/i.test(extension)) {
                alert("Your image extension is: " + extension + "\nPlease upload an image with one of the following formats: JPG, JPEG, PNG")
                return
            }

            handleImages()

          }
        }


        async function handleImages () {
            // convert to base64, then store in the localstorage
            const base64Img = await getBase64(img)
            if (base64Img) {
                // save to local storage
                window.localStorage.setItem("prodertoUser" + imgType, JSON.stringify(base64Img))
            }

            // show the image
            if (imgType === 'Avatar') {
                setAvatarImg(base64Img)
            }
            if (imgType === 'Cover') {
                setCoverImg(base64Img)
            }

            const url = "https://proderto.com/api/profile/images"
            const token = JSON.parse(window.localStorage.getItem('prodertoPassToken'))

            try {
                const r = await axios.post(url, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Accept": "multipart/form-data",
                        "image-mime": extension,
                        "image-type": imgType,
                        "x-auth-token": token,
                }
            })

            } catch (err) {
                if (err.response.status === 403) {
                    localStorage.clear()
                    navigate("/login")
                }
                console.log(err)
            }


            // get the base64 of the image
            function getBase64 (file) {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                
                    fileReader.onload = () => {
                      resolve(fileReader.result)
                    }
                
                    fileReader.onerror = (error) => {
                      reject(error)
                    }
                })
            }
        }
    }

    
  return (
    <>
        <Header />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className='mother-container' style={{ width: screenWidth > 1200 ? "1200px" : "88vw" }}> 
                {data.sameUser ? <input type="file" id="Cover" onChange={data.sameUser ? handleImageUpload : ""} hidden/> : "" }
                <label htmlFor="Cover">
                    {data.sameUser ? <img src={coverImg} alt="" id='cover-img'/> : <img src={coverImg} style={{ pointerEvents: "none" }} alt="" id='cover-img'/>}
                </label>
                <div className='posts-container'>
                    <div className='profile-photo-container'>
                        {data.sameUser ? <input type="file" id="Avatar" onChange={handleImageUpload} hidden/> : "" }
                        <label htmlFor="Avatar">
                            <div style={{ width: 'fit-content', height: 'fit-content', backgroundColor: 'white', borderRadius: '20px' }}>
                                {data.sameUser ? <img src={avatarImg} alt="" id='avatar-img' /> : <img src={avatarImg} style={{ pointerEvents: "none" }} alt="" id='avatar-img'/> } 
                            </div>
                        </label>
                        <h1 style={{ marginLeft:'10px', marginTop:'95px', fontFamily: 'Open Sans Medium', fontSize: '25px' }}>{capitalize(data.fName)}</h1> 
                    </div>
                        {posts.map(el => {
                            return (<Link to={{pathname: '/posts/' + el.id}}><div key={el.id} className='post-container'>
                                <div>
                                    <div style={{ marginBottom: '13px' }}>
                                        <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>{el.title}</h1>
                                    </div>
                                    <div className='social-icons'>
                                        <div style={{ display: 'flex', alignItems: 'center', margin: "5px" }}><img src={like} alt="" style={{ width:'25px' }} /> <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{el.likes > 1 ? el.likes + ' Likes' : el.likes === 1 ? '1 Like' : 'like' }</p></div>
                                        <div style={{ display: 'flex', alignItems: 'center', margin: "5px" }}><img src={award} alt="" style={{ width:'25px' }} /> <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{el.awards > 1 ? el.awards + ' Awards' : el.awards === 1 ? '1 Award' : 'Award' }</p></div>
                                        <div style={{ display: 'flex', alignItems: 'center', margin: "5px" }}><img src={comment} alt="" style={{ width:'25px' }} /> <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{el.comments > 1 ? el.comments + ' Comments' : el.comments === 1 ? '1 Comment' : 'Comment' }</p></div>
                                        <div style={{ display: 'flex', alignItems: 'center', margin: "5px" }}><img src={share} alt="" style={{ width:'25px' }} /> <p style={{ fontSize: '16px', paddingLeft: '2px', color: '#AFAFAF' }}>{el.shares > 1 ? el.shares + ' Shares' : el.shares === 1 ? '1 Share' : 'Share' }</p></div>
                                    </div>
                                </div>
                                {
                                    data.sameUser ? 
                                        <div id='bin-container' onClick={handleBinClick}><img id='bin' name={el.id} src={bin} alt="" style={{ width: '27px' }}/></div>
                                    :
                                        ""
                                }

                            </div></Link>)
                        })}
                </div>            
            </div>
        </div>
    </>
  )
}

  
export default Profile
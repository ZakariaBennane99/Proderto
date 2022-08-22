import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react' 
import axios from 'axios'
import NewGoalsCon from './newGoalsCon'




const NewGoals = forwardRef((props, ref) => {

  const [data, setData] = useState()
  const [isDataLoading, setIsDataLoading] = useState()
  const [isInitialData, setIsInitialData] = useState(true)
  const [noMoreData, setIsNoMoreData] = useState()
  const [skips, setSkips] = useState(0)
  const [postExcHeight, setPostExcHeight] = useState()
  const [wholeSize, setWholeSize] = useState(0)
  const [scroll, setScroll] = useState(0)
  const [visibleSize, setVisibleSize] = useState(0)

  // call getPosts to get the first 4 posts
  useEffect(() => {
    getPosts()
  }, [])

  useImperativeHandle(ref, (e) => ({
    onScroll: (e) => {
      setScroll(e.target.scrollTop)
      setWholeSize(e.target.scrollHeight)
      setVisibleSize(e.target.clientHeight)
      if (postExcHeight === undefined) {
        setPostExcHeight(document.querySelector(".newGoals-container .mini-post-container").offsetHeight)
      }
      if (wholeSize - (scroll + visibleSize) < 5) {
        //console.log("Agin",skipsCopy, skips)
        getPosts()
      }
    }
  }))

  const getPosts = async () => {

    const url = "http://localhost:3000/api/posts/pagination"
    const token = window.localStorage.getItem("prodertoPassToken")
    setIsDataLoading(data !== undefined)
    try {
      const d = await axios.get(url, {
        headers: {
          "x-auth-token": JSON.parse(token),
          "num-of-posts": 4,
          "skips": skips
        }
      })
      if (data === undefined) {
        setIsInitialData(false)
        setData(d.data)
        setSkips(4)
        return
      }
      setData((prev) => {
        function uniq(a) {
          return Array.from(new Set(a))
        }
        const unique = uniq([...prev, ...d.data])
        return unique
      })  
      
      setSkips((prev) => {
        return prev + 4
      })
      setIsDataLoading(false)
    } catch (err) {
      if (err.response.status === 404) {
        setIsNoMoreData(true)
      }
      console.log(err)
    }
  }


  // if the data is undefined 
  if (isDataLoading) {
    return (
      <>
        <NewGoalsCon data={data} />
        {noMoreData ? <div style={{ height: `${postExcHeight}px`, display: "flex", justifyContent: 'center', alignItems: "center" }}>
          <h1 style={{ fontFamily: "Open Sans", fontSize: "larger" }}>No More Posts</h1>
        </div> : <div className='loader-holder' style={{ height: `${postExcHeight}px`}}>
        <div className="loader" style={{ width: '50px', height: '50px' }}></div></div>}
      </>)
  }

  if (isInitialData) {
    return (<div className='loader-holder' style={{ height: '500px'}}>
    <div className="loader" style={{ width: '50px', height: '50px' }}></div></div>)
  }

    
  return (<NewGoalsCon data={data} />)
})

  
export default NewGoals
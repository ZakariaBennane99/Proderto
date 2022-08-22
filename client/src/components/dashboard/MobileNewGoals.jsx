import React from "react"
import AchievedContainer from './AchievedContainer'
import Header from "./Header"


const MobileAchieved = () => { 

    return (
        <>
            <Header />
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px"}}>
                <AchievedContainer />
            </div>
        </>)
}

export default MobileAchieved



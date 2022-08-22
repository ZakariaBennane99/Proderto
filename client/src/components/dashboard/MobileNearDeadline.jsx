import React from "react"
import Header from "./Header"
import DeadlineContainer from './DeadlineContainer'


const MobileNearDeadline = () => { 

    return (<>
        <Header />
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px"}}>
            <DeadlineContainer />
        </div>
    </>)
}

export default MobileNearDeadline



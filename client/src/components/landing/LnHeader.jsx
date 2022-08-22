import React from 'react'
import logo from '../../Design_Stuff/Landing/logo.svg'
import { Link } from 'react-router-dom'


const LnHeader = (props) => {

    const screenWidth = window.innerWidth

    return (
    <>
        <div className={props.type === "post-sharing" ? 'homepage-header' : 'landing-header'}>
            {props.type === "post-sharing" ? <img src={logo} alt="" style={{ width: "180px", marginLeft: "20p" }} /> 
            : <img src={logo} alt=""  style={{ width: screenWidth < 490 ? "200px" : "200px", marginTop: "20px" }}/>}
            {
                props.type && props.type === "Home" ?
                <Link to={{ pathname: '/home' }}>
                    <button style={{ background: props.bckg }}>Home</button>
                </Link>
            :
                <Link to={{ pathname: '/login' }}>
                {props.type === "post-sharing" ? <button style={{ margin: "0px 20px 0px 0px", height: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}><p>login</p></button> 
                : <button style={{ background: props.bckg }}>login</button>} 
                </Link>
            }
        </div>
    </>)
}

export default LnHeader
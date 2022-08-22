import React from 'react'
import p404 from '../../Design_Stuff/Landing/page404.svg'
import LnHeader from '../landing/LnHeader'


const Page404LoggedIn = () => {

    const screenWidth = window.innerWidth

    return (
        <>
            <LnHeader bckg='linear-gradient(30deg, rgba(14,150,72,1) 0%, rgba(70,183,73,1) 64%, rgba(215,224,39,1) 100%)' type="Home" />
            <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "20px" }}>
                <img src={p404} alt="" style={{ width: screenWidth > 1200 ? '800px' : '60%' }}/>
                <h3 style={{ fontFamily: 'Open Sans Medium', fontSize: 'larger' }}>PAGE NOT FOUND</h3>
            </div>
        </>
    )

}
  
export default Page404LoggedIn
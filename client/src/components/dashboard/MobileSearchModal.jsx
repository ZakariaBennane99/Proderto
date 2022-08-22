import React from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const MobileSearchModal = ({ remove, handleSearch, searchEmpty, searchChange, searchValue }) => {

    return (
        <>
            <div className='modal-background' id='reward' onClick={remove} ></div>
            <div style={{ position: "absolute", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20%" }}>
                <div className='search-container' style={{ outline: searchEmpty ? '3px solid red' : 'none', position: "absolute", zIndex: "4", width: "50vw", padding: "13px" }} onKeyDown={(e) => e.key === "Enter" ? handleSearch() : ''}> 
                    <div className='icon-container' onClick={handleSearch} style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color:'#999999' }} />
                    </div>
                    <input type="text" placeholder='Search For Goals, People...' onChange={searchChange} value={searchValue} required="required" style={{ width: "100%", fontSize: "0.85em" }}/>
                </div>
            </div>
        </>
    )
}


export default MobileSearchModal
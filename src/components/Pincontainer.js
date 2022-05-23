import React from "react";
import Pin from "./Pin";

function Pincontainer(props) {

    const {data} = props
    let allPin = ""

    const deletePin = (URL) => {
        props.deletePin(URL)
    }

    // generate all Pins based on props.data passed in
    if (data.subCat && data.curCollection) {
        allPin = data.subCat[data.curCollection].map(imgArr => {
            return(
                <Pin imgData={imgArr} key={imgArr[0]} deletePin={deletePin}/>
            )
        })
    }

    
    return(
        <div className="content-container">
            <div className="content-box-bar">
                <i className="bi-trash3-fill delete-btn" />
                {props.data.curCollection}
                <i className="bi-search search-btn" />
            </div>
            <div className="content-box">
                {allPin}
            </div>
        </div>
    )
}

export default Pincontainer;
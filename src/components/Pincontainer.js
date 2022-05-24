import React from "react";
import Pin from "./Pin";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";

function Pincontainer() {
    const {data} = useContext(DataContext);

    // generate all Pins based on DataContext data 
    function allPin(data) {
        return data.subCat[data.curCollection]?.map(imgArr => {
            return(
                <Pin imgData={imgArr} key={imgArr[0]}/>
            )
        })
    }
    
    return(
        <>
        { data &&
        <div className="content-container">
            <div className="content-box-bar">
                <div className="content-box-title">{data.curCollection}</div>
                <i className="bi-search search-btn" />
            </div>
            <div className="content-box">
                {allPin(data)}
            </div>
        </div>
        }
        </>
    )
}

export default Pincontainer;
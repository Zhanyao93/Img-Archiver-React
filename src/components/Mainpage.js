import React, { useEffect, useState } from "react";
import '../styles/Mainpage.css'
import Inputbar from "./Inputbar";
import Pincontainer from "./Pincontainer";


function Mainpage() {

    const [data, setData] = useState("")

    const handleURL = (URL, label) => {
        let tempData = {...data}
        let collectionMap = new Map(tempData.subCat[tempData.curCollection]);
        collectionMap.set(URL, label);
        tempData.subCat[tempData.curCollection] = [...collectionMap];

        localStorage.setItem("collectionsData", JSON.stringify(tempData));
        setData(tempData);
    }

    const handlePinDel = (URL) => {
        let tempData = {...data}
        let collectionMap = new Map(tempData.subCat[tempData.curCollection]);
        collectionMap.delete(URL);
        tempData.subCat[tempData.curCollection] = [...collectionMap];

        localStorage.setItem("collectionsData", JSON.stringify(tempData));
        setData(tempData);
    }


    // useEffect with [] to load this once when component is loaded for the first time
    useEffect(()=> {
        if (localStorage.getItem("collectionsData") === null) {
            let defaultData = {
                title: "collections",
                icon: "bi-collection-fill",
                curCollection: "Default",
                subCat: {
                    "Default": []
                }
            }

            setData(defaultData);
            localStorage.setItem("collectionsData", JSON.stringify(defaultData));
        } else {
            let retriData = JSON.parse(localStorage.getItem("collectionsData"));
            setData(retriData);
        }

    }, [])


    return(
        <div className="main-page-layout">
            <div className="main-page">
                <h1>Img Archiver</h1>
                <Inputbar updateURL={handleURL} data={data}/>
                <Pincontainer data={data} deletePin={handlePinDel}/>
            </div>
        </div>
    )
}

export default Mainpage;
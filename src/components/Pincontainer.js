import React from "react";
import Pin from "./Pin";
import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";

function Pincontainer() {
    const {data} = useContext(DataContext);
    const [filterArr, setFilterArr] = useState([]);


    // generate all Pins based on DataContext data 
    function allPin(data) {

        let searchArr = filterArr;

        if (searchArr.length) {
            // get the query strings in form of arr from useState
            let filteredData = data.subCat[data.curCollection]
            .filter(imgArr => searchArr.some(searchStr=> {
                //check if there are ? symbol which will case error
                if (/([ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/.test(searchArr)){
                    // escape all special symbols
                    let regex = new RegExp(searchStr.replace(/([ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/g, '\\$1'), "i");
                    console.log("regex",regex)
                    return regex.test(imgArr[1]);
                }
                // create regex with each str in search arr with case insensitive
                let regex = new RegExp(searchStr, "i");
                return regex.test(imgArr[1]);
            }));

            return filteredData.map(imgArr => {
                return(
                    <Pin imgData={imgArr} key={imgArr[0]}/>
                )
            });

        } else {
            return data.subCat[data.curCollection]?.map(imgArr => {
                return(
                    <Pin imgData={imgArr} key={imgArr[0]}/>
                )
            });
        }
    }
    
    // handle searchbar input
    function handleOnChange(e){
        let queryArr = e.target.value.split(" ");
        let filtArr = queryArr.filter(ele => ele != null && ele.split("").length > 2);

        // check for changes in the queries 
        let ArrEqual = (firstArr, secondArr) => {
            return JSON.stringify(firstArr) === JSON.stringify(secondArr);
        }

        // only set filterArr when the search arr changes, to minimize multi rerenders
        if (!ArrEqual(filterArr, filtArr)) {
            setFilterArr(filtArr);
        }
    }

    return(
        <>
        { data &&
        <div className="content-container">
            <div className="content-box-bar">
                <div className="content-box-title">{data.curCollection}</div>
                <div className="search-container">
                    <input className="search-bar" autoComplete="off" placeholder="Insert Query" onChange={handleOnChange}/>
                </div>
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
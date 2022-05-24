import { createContext, useState, useEffect } from "react";
const DataContext = createContext({});

export const DataProvider = ({children}) => {
    
const [data, setData] = useState();

// using only this use context to interface with localStorage of data

// handle switching of curcollection
const handleCurCol = (newTarCol) => {
    let tempData = {...data, curCollection: newTarCol}
    localStorage.setItem("collectionsData", JSON.stringify(tempData));
    setData(tempData);
}

//handle adding of new collection
const handleNewCol = (label) => {
    let tempData = {...data};
    // add new key label with empty array data 
    tempData.subCat[label]=[];
    tempData = {...tempData, curCollection: label};

    localStorage.setItem("collectionsData", JSON.stringify(tempData));
    setData(tempData);
}

const handleEditCol = (label, oldLabel) => {
    let tempData = {...data};
    //set new key with old key's data
    tempData.subCat[label] = tempData.subCat[oldLabel];
    // delete old key
    delete tempData.subCat[oldLabel];
    tempData = {...tempData, curCollection: label}

    localStorage.setItem("collectionsData", JSON.stringify(tempData));
    setData(tempData);
}

const handleDelCol = (subTitle) => {
    let tempData = {...data};
    //delete collection with the provided key
    delete tempData.subCat[subTitle];

    if (Object.keys(tempData.subCat).length){
        tempData.curCollection = Object.keys(tempData.subCat)[0];
        localStorage.setItem("collectionsData", JSON.stringify(tempData));
        setData(tempData);
        return;
    }
    
    createDefault();
} 

// to handle new data from input
const handleURL = (URL, label) => {
    let tempData = {...data}
    let collectionMap = new Map(tempData.subCat[tempData.curCollection]);
    collectionMap.set(URL, label);
    tempData.subCat[tempData.curCollection] = [...collectionMap];

    localStorage.setItem("collectionsData", JSON.stringify(tempData));
    setData(tempData);
}

// to handle deletion of pin
const handlePinDel = (URL) => {
    let tempData = {...data}
    let collectionMap = new Map(tempData.subCat[tempData.curCollection]);
    collectionMap.delete(URL);
    tempData.subCat[tempData.curCollection] = [...collectionMap];

    localStorage.setItem("collectionsData", JSON.stringify(tempData));
    setData(tempData);
}

// function to create the default object and set to local storage
const createDefault = () => {
    let defaultData = {
        title: "Collections",
        icon: "bi-collection-fill",
        curCollection: "Default",
        subCat: {
            "Default": []
        }
    }

    setData(defaultData);
    localStorage.setItem("collectionsData", JSON.stringify(defaultData));
}

// useEffect with [] to load this once when component is loaded for the first time
useEffect(()=> {
if (localStorage.getItem("collectionsData") == null) {
    createDefault();
} else {
    let retriData = JSON.parse(localStorage.getItem("collectionsData"));
    setData(retriData);
}
}, [])

    return(
        <DataContext.Provider value={{ data, setData, handleURL, handlePinDel, handleCurCol, handleNewCol, handleEditCol, handleDelCol}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
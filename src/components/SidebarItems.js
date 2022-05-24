import React from "react";
import { useState, useContext } from "react";
import DataContext from "../contexts/DataContext";

function SidebarItem() {

    const {data, handleCurCol, handleNewCol, handleEditCol, handleDelCol} = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);


    function SubItem({subTitle}) {
        return(
            <span onClick={()=> handleCurCol(subTitle)}>
                <i className="bi-pin-fill" />
                <div className="sub-tile">{subTitle}</div>
                <i className="bi-pencil-square sub-btn" onClick={(e)=>{editColName(e,subTitle)}} />
                <i className="bi-x-square sub-btn" onClick={(e)=>{delCol(e,subTitle)}}/>
            </span>
        )
    }

    // returns a list of all the sub titles
    function allSub() {
        return Object.keys(data.subCat).map(subTitle => {
            return (
                <SubItem key={subTitle} subTitle={subTitle}/>
            )
        })
    }

    function addNewCol() {
        let label = prompt("Please enter collection name.");
        if (label === null || label === "") {
            alert("Collection requires a name");
            return
        }
        // check if collection already exist
        if (Object.keys(data.subCat).some(elem => elem === label)) {
            alert(`Collection with name(${label}) already exist`);
            return
        }

        handleNewCol(label);
    }

    function editColName(e, oldLabel) {
        e.stopPropagation();

        let label = prompt("Please enter new collection name.");
        if (label === null || label === "") {
            alert("Collection requires a name");
            return
        }
        // check if collection already exist
        if (Object.keys(data.subCat).some(elem => elem === label)) {
            alert(`Collection with name(${label}) already exist`);
            return
        }

        handleEditCol(label, oldLabel);
    }

    function delCol(e, subTitle) {
        e.stopPropagation();

        if (window.confirm(`Delete "${subTitle}"?`) === true) {
            handleDelCol(subTitle)
         }
    }

    return(
        <>
        {data &&
        <div className= {isOpen? "sidebar-item open": "sidebar-item"}>
            <div className="sidebar-title" onClick={()=> setIsOpen(!isOpen)}>
                <span>
                    <i className="bi-collection-fill"/>
                    {data.title}
                </span>
                <i className="bi-chevron-down toggle-btn"/>
            </div>
            <div className="sidebar-content">
                {allSub()}
                <div className="new-col-btn" onClick={addNewCol}>
                New Collection
                </div>
            </div>

        </div>
        }
        </>
    )
}

export default SidebarItem;
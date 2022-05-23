import React from "react";
import { useState } from "react";

function SidebarItem(props) {

    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className= {isOpen? "sidebar-item open": "sidebar-item"}>
            <div className="sidebar-title" onClick={()=> setIsOpen(!isOpen)}>
                <span>
                    <i className="bi-collection-fill"/>
                    {props.title}
                </span>
                <i className="bi-chevron-down toggle-btn"/>
            </div>
            <div className="sidebar-content">
                <span>
                    <i className="bi-pin-fill" />
                    sidebar content
                </span>
            </div>
        </div>
    )
}

export default SidebarItem;
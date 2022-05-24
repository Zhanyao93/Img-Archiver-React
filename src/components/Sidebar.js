import React from "react";
import SidebarItem from "./SidebarItems";
import '../styles/Sidebar.css';


function Sidebar() {

    return(
        <div className="sidebar">
            <div className="sidebar-header">
                IA
            </div>
            <SidebarItem title="Collections" />
        </div>
    )
}

export default Sidebar;
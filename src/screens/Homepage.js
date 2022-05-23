import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Mainpage from '../components/Mainpage';
import {BrowserRouter as Router, NavLink, Routes, Route} from 'react-router-dom';

function Homepage() {

    return (
        <>
        <Sidebar />
        
        <Router>
            <Routes>
            <Route path="/" element={<Mainpage />}></Route>
            </Routes>
        </Router>
        </>
    )
}


export default Homepage;
import Sidebar from '../components/Sidebar';
import Mainpage from '../components/Mainpage';
import {DataProvider} from "../contexts/DataContext"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Homepage() {
  
    return (
        <>
        <DataProvider>
            <Sidebar />
            
            <Router>
                <Routes>
                <Route path="/" element={<Mainpage />}></Route>
                </Routes>
            </Router>
        </DataProvider>
        </>
    )
}


export default Homepage;
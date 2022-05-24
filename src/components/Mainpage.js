import '../styles/Mainpage.css'
import Inputbar from "./Inputbar";
import Pincontainer from "./Pincontainer";


function Mainpage() {

    return(
        <div className="main-page-layout">
            <div className="main-page">
                <h1>Img Archiver</h1>
                <Inputbar />
                <Pincontainer />
            </div>
        </div>
    )
}

export default Mainpage;
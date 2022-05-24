import {useState} from 'react';
import { useContext } from "react";
import DataContext from "../contexts/DataContext";


function Pin(props) {
    const {handlePinDel} = useContext(DataContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [copyIsClicked, setCopyIsClicked] = useState(false);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
       }

   const onPinDel = () => {
    if (window.confirm(`Remove "${props.imgData[1]}"?`) === true) {
       handlePinDel(props.imgData[0])
    }
   }

   //copy link when input modal input is clicked
   const copyLink = () => {
    navigator.clipboard.writeText(props.imgData[0]);
    setCopyIsClicked(true);
    // turn toogle back off after 2s
    setTimeout(()=>{
        setCopyIsClicked(false)
    }, 2000)
   }

   const modal = <div className='img-modal-container'>
                    <div className="modal-panel">
                        {copyIsClicked?<span className={"modal-copy-text"}>Image link copied</span>: null}
                        <div className="modal-bar">
                            <div className="modal-title">{props.imgData[1]}</div>
                            <div className="modal-cross" onClick={toggleModal}>X</div>
                        </div>
                        <div className='modal-img-container'>
                            <img className="modal-img" src={props.imgData[0]} alt={`${props.imgData[0]} modal`}/>
                        </div>
                        <input className="modal-url" onClick={copyLink} value={props.imgData[0]} readOnly/>
                    </div>
                </div>

    return(
        <>
            <div className="pin-container">
                <div className="pin-bar">
                    <div className="pin-header">{props.imgData[1]}</div>
                    <div className="pin-cross" onClick={onPinDel}>X</div>
                </div>
                <div className="pin-img-frame">
                    <img className={"pin-img"} onClick={toggleModal} src={props.imgData[0]} alt={`${props.imgData[0]} Pin`}/>
                </div>
            </div>
            {!modalIsOpen? null : modal}

        </>
    )
}

export default Pin;
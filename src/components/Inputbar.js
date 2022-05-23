import React from "react";
import { useState, useRef, useEffect } from "react";

function Inputbar(props) {

    const {data} = props;
    const [URL, setURL] = useState("");
    const inputRef = useRef(null);

    const isDuplicate = (URL) => {
        if(data.subCat[data.curCollection].some((ele)=> ele[0] === URL)) {
            return true;
        }
        return false;
    }

    const validURL = (URL) => {
        let img = new Image();
        // use onload and onerror to determine if image is valid
        img.onload = () => {

            if (isDuplicate(URL)) {
                alert(`Image with (${URL}) already exist.`);
                return;
            }

            let label = prompt("Please label the image.");
            if (label === null || label === "") {
                alert("Image requires a label");
                return;
            }
            props.updateURL(URL, label);
        }

        img.onerror = () => {
            alert("Image URL cannot be loaded");
        }
        img.src = URL;
    }

    const handleOnChange = (e) => {
        setURL(e.target.value);
    }

    const handleOnSubmit = () => {
        if (!URL) {
            alert("Image URL cannot be empty");
            return;
        }

        //to check if image url dup/valid before passing the data over
        validURL(URL)

    }

    useEffect(() => {
        // focus on the input element
        inputRef.current.focus();
    },[])

    return(
        <div className="inputbar-layout">
            <input ref={inputRef} autoComplete="off" placeholder="Insert Image URL Here" onKeyUp={(e)=>{if(e.key == 'Enter'){handleOnSubmit()}}} onChange={handleOnChange}/>
            <button className="pin-button" onClick={handleOnSubmit}>Pin <i className="bi-pin-fill" /></button>
        </div>
    )
}

export default Inputbar;
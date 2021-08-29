import React, {useEffect, useState } from 'react'
import "./Navbar.css"

function Navbar() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll", null);
        };
    })
    return (
        <div className={`navbar ${show && "nav_black"}`}>
            <img 
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img className="nav_avatar" 
                 src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png"
                 alt="Avatar"
            />
            
            
        </div>
    )
}

export default Navbar

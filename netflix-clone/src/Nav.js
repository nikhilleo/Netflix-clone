import React, { useEffect, useState } from 'react';
import logo from "./logo.png"
import avatar from './avatar_logo.png'
import "./Nav.css";

function Nav() {

    const [show, handleShow] = useState(false)

    const transitionNavbar = () => {
        if(window.scrollY > 100)
        {
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll",transitionNavbar);
        return ()=>{
            window.removeEventListener("scroll",transitionNavbar);
        }
    }, [])

    return (
        <div className={`nav ${show ? "nav__black" : ""}`}>
            <div className="nav__content">
                <img className="nav__logo" src={logo} alt=""/>
                <img className="nav__avatar" src={avatar} alt=""/>
            </div>
        </div>
    )
}

export default Nav

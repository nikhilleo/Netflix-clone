import React, { useEffect, useState } from 'react';
import logo from "../logo.png"
import avatar from '../avatar_logo.png'
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
                <div>
                    <img className="nav__logo" src={logo} alt=""/>
                </div>
                <div className="nav_btns" >
                {/* <img className="nav__avatar" src={avatar} alt=""/> */}
                <button className="join_now" type="submit">Join Now </button>
                <button className="join_now1" type="submit">Sign In </button>
                </div>
            </div>
        </div>
    )
}

export default Nav

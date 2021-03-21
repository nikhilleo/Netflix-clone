import React, { useEffect, useState } from 'react';
import logo from "../logo.png"
import "./Nav.css";
import { Link } from 'react-router-dom';

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
            <Link to="/">
                <div>
                    <img className="nav__logo" src={logo} alt=""/>
                </div>
            </Link>
                <div className="nav_btns" >
                {/* <img className="nav__avatar" src={avatar} alt=""/> */}
                <Link to="/signup"><button className="join_now" type="submit">Join Now </button></Link>
                <button className="join_now1" type="submit">Sign In </button>
                </div>
            </div>
        </div>
    )
}

export default Nav

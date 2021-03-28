

import React from 'react'
import { Link } from 'react-router-dom'
import "./LoggedInNav.css"
import logo from "../logo.png"


function LoggedInNav() {
    return (
        <div className="nav_loggedIn">
             <Link to="/signup">
                <div>
                    <img className="nav__logo1" src={logo} alt=""/>
                </div>
            </Link>  
            <Link to="/signin"><button style={{"cursor":"pointer"}} className="join_nowLogged" type="submit">Sign Out </button></Link>
                  
        </div>
    )
}

export default LoggedInNav

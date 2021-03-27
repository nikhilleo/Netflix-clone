import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInNav from '../LoggedInNav/LoggedInNav'
import "./Step3.css"

function Step3() {
    return (
        <div>
            <LoggedInNav/>
            
            <div class="stepLogoContainer">
                <span className="logo_outer"><img className="paymentStepLogo" src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Lock.png" alt=""/></span>
                <div className="content_of_step3">
                <h5>Step 3 Of 3</h5>
                <h2>Set up your payment.</h2>
                <p>Your membership starts as soon as you set up payment.</p>
                <p style={{fontWeight:"700"}}>No commitments.Cancel online anytime.</p>
                <button className="to_step_3" type="submit">Pay Now </button>
            </div>
            </div>

            <div className="footer_step3">
                <h4>Questions? Call 000-800-040-1843</h4>
                <div className="content">
                <ul className="f_content__1">
                    <li>FAQ</li>
                    <li>Help Centre</li>
                    <li>Terms of Use</li>
                    <li>Privacy</li>
                </ul>
                <ul className="f_content1__1">
                    <li>Cookie Preferences</li>
                    <li>Corporate Information</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Step3

import React from 'react'
import "./Step1.css";
import LoggedInNav from '../LoggedInNav/LoggedInNav';
import { Link } from 'react-router-dom';

function Step1() {
    return (
        <div className="main">
            <LoggedInNav/>
            <div className="content_of_step1">
                <h5>Step 1 Of 3</h5>
                <h2>Choose Your Plan</h2>
                <div className="content_data">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>No commitments, cancel anytime.</h4>
                </div>
                <div className="content_data">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>Everything on Netflix for one low price.</h4>
                </div>
                <div className="content_data" id="last_con">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>No ads and no extra fees. Ever.</h4>
                </div>
                <Link to="/step2">
                    <button className="to_step_2" type="submit">Next</button>
                </Link>
            </div>
            <div className="footer1">
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

export default Step1

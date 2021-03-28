import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import "./SignIn.css"

function SignIn() {
    return (
        <div className="main_singin">
            <div>
            <Nav/>
            <div className="data1">
               <div className="formLogin">
                    <form className='form_fields'>
                        <h1>Sign In</h1>
                        <input type="text" placeholder="Email or phone number"/>
                        <input type="text" placeholder="Password"/>
                        <button >Sign In</button>
                    </form>
                    <div className="extra">
                        <div>
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check"> Remember Me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                    <br/>
                    <br/>
                        <button className="gPlusButton"><i class="fa fa-google-plus left-0" aria-hidden="true">  Sign In With Google</i></button>
                    <br/>
                    <div>
                      <span className="new">New To Netflix?</span> <Link className="toSignUp" to='signup'>Sign up now.</Link>
                    </div>
                    <br/>
                    <div className="protect">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                    </div>
               </div>
               
            </div>
        </div>
            <div className="footer">
                <h4>Questions? Call 000-800-040-1843</h4>
                <div className="content">
                <ul className="f_content">
                    <li>FAQ</li>
                    <li>Help Centre</li>
                    <li>Terms of Use</li>
                    <li>Privacy</li>
                </ul>
                <ul className="f_content1">
                    <li>Cookie Preferences</li>
                    <li>Corporate Information</li>
                    </ul>
                </div>
                {/* <div className="first_row">
                <span>FAQ</span>
                <span>Help Centre</span>
                <span>Terms of Use</span>
                <span>Privacy</span>
                </div>
                <div className="second_row">
                    <p>Cookie Preferences</p>
                    <p>Corporate Information</p>
                </div> */}
            </div>
        
        </div>

    )
}

export default SignIn

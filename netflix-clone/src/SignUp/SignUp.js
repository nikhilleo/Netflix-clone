
import Nav from "../Nav/Nav"
import "./SignUp.css"
import Axios from "axios"
import { Redirect, useHistory } from "react-router"

function SignUp() {
    const history = useHistory();
    
    const handleChange = ()=>{
        window.open("http://localhost:8080/auth/google", "_self");
    }

    return (
        <div>
            <div className="banner_signup">
            <Nav/>
            <div className="data">
               <div className="text__andButton">
                    <h1>Unlimited movies, TV shows and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className="email_and_getStart" >
                        <input className="email_text" type="email" placeholder="Email Address"/>
                        <button style={{"cursor":"pointer"}} className="getStart" type="submit">Get Started </button>
                    </div>
                    <br/>
                    <button onClick={handleChange} className="gPlusButton" style={{"width": "50%","cursor":"pointer", "marginLeft":"25%"}}><i class="fa fa-google-plus left-0" aria-hidden="true">  Sign In With Google</i></button>
               </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp

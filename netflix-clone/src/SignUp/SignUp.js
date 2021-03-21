
import Nav from "../Nav/Nav"
import "./SignUp.css"


function SignUp() {
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
                        <button className="getStart" type="submit">Get Started </button>
                    </div>
               </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp

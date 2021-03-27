


import React, { useEffect, useState } from 'react'
import "./Step2.css"
import LoggedInNav from '../LoggedInNav/LoggedInNav';
import { Link } from 'react-router-dom';


function Step2() {
    
    useEffect(() => {
        document.getElementsByClassName("plan_div")[1].classList.add("active"); 
    }, [])

    const handleClickNext = ()=>{
        console.log(index);
    }

    const [index, setIndex] = useState();

    useEffect(() => {
        if(index==undefined)
        {
            setIndex(1);
            // console.log(document.getElementsByClassName("price_table_data")[0].children[index].classList.add("acticve_data"));
            console.log(index)
        }
        else
        {
            console.log(document.getElementsByClassName("price_table_data")[0].children[index].classList.add("active_data"));
            console.log(document.getElementsByClassName("price_table_data")[1].children[index].classList.add("active_data"));
            console.log(document.getElementsByClassName("price_table_data")[2].children[index].classList.add("active_data"));
            console.log(index)
            switch (index) {
                case 0:
                    console.log(document.getElementsByClassName("price_table_data")[0].children[0].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[0].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[0].classList.add("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[1].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[2].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[3].classList.remove("active_data"));
                    break;

                case 1:
                    console.log(document.getElementsByClassName("price_table_data")[0].children[1].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[1].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[1].classList.add("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[0].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[2].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[3].classList.remove("active_data"));    

                    break;

                case 2:
                    console.log(document.getElementsByClassName("price_table_data")[0].children[2].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[2].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[2].classList.add("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[0].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[1].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[3].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[3].classList.remove("active_data"));  

                    break;

                case 3:
                    console.log(document.getElementsByClassName("price_table_data")[0].children[3].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[3].classList.add("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[3].classList.add("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[0].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[0].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[1].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[1].classList.remove("active_data"));

                    console.log(document.getElementsByClassName("price_table_data")[0].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[1].children[2].classList.remove("active_data"));
                    console.log(document.getElementsByClassName("price_table_data")[2].children[2].classList.remove("active_data"));  
                    break;
                default:
                    break;
            }
        }
    }, [index])


    const handleClick = (e) =>{
        // setIndex(e.target.name);
        console.log(e.target.innerHTML);
        switch (e.target.innerHTML) {
            case "Mobile":
                setIndex(0)
                document.getElementsByClassName("plan_div")[0].classList.add("active"); 
                document.getElementsByClassName("plan_div")[1].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[2].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[3].classList.remove("active"); 
                break;
            
            case "Basic":
                setIndex(1)
                document.getElementsByClassName("plan_div")[1].classList.add("active"); 
                document.getElementsByClassName("plan_div")[0].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[2].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[3].classList.remove("active"); 
                break;

            case "Standard":
                document.getElementsByClassName("plan_div")[0].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[1].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[2].classList.add("active"); 
                document.getElementsByClassName("plan_div")[3].classList.remove("active"); 
                setIndex(2)
                break;
                
            case "Premium":
                document.getElementsByClassName("plan_div")[0].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[1].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[2].classList.remove("active"); 
                document.getElementsByClassName("plan_div")[3].classList.add("active"); 
                setIndex(3)
                break;
            
            default:
                break;
        }
        // e.target.classList.add("active")
        // console.log(e.target.classList)
    }

    return (
        <div className="main">
            <LoggedInNav/>
            <div className="content_of_step2">
                <h5>Step 2 Of 3</h5>
                <h3>Choose Your Plan</h3>
                <div className="content_data__step2">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>Watch all you want. Ad-free.</h4>
                </div>
                <div className="content_data__step2">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>Recommendations just for you.</h4>
                </div>
                <div className="content_data__step2">
                    <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                    <h4>Change or cancel your plan anytime.</h4>
                </div>
            </div>
            <div className="plans_div">
                <div className="plan_main">
                    <div onClick={handleClick} className="plan_div">
                        Mobile
                    </div>
                    <div  onClick={handleClick} className="plan_div">
                    Basic
                    </div>
                    <div  onClick={handleClick} className="plan_div">
                        Standard
                    </div>
                    <div  onClick={handleClick} className="plan_div">
                        Premium
                    </div>
                </div>
                <table className="ab" >
                    <tr className="table_price">
                        <div className="type_table">
                            <td style={{width:"68vw"}}>Monthly Plan</td>
                        </div>
                        <div className="price_table_data">
                            <td >₹ 199</td>
                            <td >₹ 499</td>
                            <td >₹ 649</td>
                            <td >₹ 799</td>
                        </div>
                    </tr>
                </table>
                <table className="ab" >
                    {/* <tr style={{fontSize:'17px'}}>
                        <td style={{width:"40vw"}}>Video quality</td>
                        <td style={{width:"15vw"}}>Good</td>
                        <td style={{width:"15vw"}}>Good</td>
                        <td style={{width:"14vw"}}>Better</td>
                        <td style={{width:"9vw"}}>Best</td>
                    </tr> */}
                    <tr className="table_price">
                        <div className="type_table">
                            <td style={{width:"68vw"}}>Video quality</td>
                        </div>
                        <div className="price_table_data">
                            <td >Good</td>
                            <td >Good</td>
                            <td >Better</td>
                            <td >Best</td>
                        </div>
                    </tr>
                </table>
                <table className="ab" >
                    {/* <tr style={{fontSize:'17px'}}>
                        <td style={{width:"40vw"}}>Resolution</td>
                        <td style={{width:"15vw"}}>480p</td>
                        <td style={{width:"15vw"}}>480p</td>
                        <td style={{width:"14vw"}}>1080p</td>
                        <td style={{width:"9vw"}}>4K+HDR</td>
                    </tr> */}
                     <tr className="table_price">
                        <div className="type_table">
                            <td style={{width:"108vw"}}>Resolution</td>
                        </div>
                        <div className="price_table_data" id="res">
                            <td >480p</td>
                            <td >480p</td>
                            <td >1080p</td>
                            <td >4K+HDR</td>
                        </div>
                    </tr>
                </table>
            <div className="extra__step2">
                <p>
                Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content available in HD, Full HD, Ultra HD or HDR. See Terms of Use for more details.
                </p>
                <p>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.</p>
                <Link to="/step3"><button onClick={handleClickNext} className="to_step_2" type="submit">Next </button></Link>
            </div>
            </div>
            <div className="footer_step2">
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

export default Step2

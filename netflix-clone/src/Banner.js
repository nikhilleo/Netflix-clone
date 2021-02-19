import React, { useEffect, useState } from 'react'
import "./Banner.css"
import Axios from "./axios";
import requests from "./Request";

function Banner() {

    const [Movie, setMovie] = useState();


    useEffect(() => {
        async function fetchData()
        {
            // Axios.get(requests.fetchNetflixOriginals).then((res)=>{
            //     console.log(res.data.results);
            //     console.log();
            //     const no = Math.floor(Math.random(0.5) * res.data.results.length  - 1);
            //     console.log(no)
            //     setMovie(res.data.results[no]);
            // })
            // .catch((err)=>{
            //     console.log(err.response)
            // })
            const movie = await Axios.get(requests.fetchNetflixOriginals);
            console.log(movie.data.results);
            const no = Math.floor(Math.random() * movie.data.results.length  - 1);
            console.log(no);
            if(no>=0){
                setMovie(movie.data.results[no]);
            }
            else if(no<0)
            {
                setMovie(movie.data.results[19])
            }
            return movie;
        }
        fetchData();
        if(!Movie)
        {
            fetchData();
        }
    }, [])
    
    // console.log(Movie);

    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

    return (
        
        <div className="back" style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}")`,
            backgroundSize:"cover",
            backgroundPosition:"revert"}}>
            <div style={{backgroundImage:`linear-gradient(to right,#171717 0,rgba(23,23,23,.98) 20%,rgba(23,23,23,.97) 25%,rgba(23,23,23,.95) 35%,rgba(23,23,23,.94) 40%,rgba(23,23,23,.92) 45%,rgba(23,23,23,.9) 50%,rgba(23,23,23,.87) 55%,rgba(23,23,23,.82) 60%,rgba(23,23,23,.75) 65%,rgba(23,23,23,.63) 70%,rgba(23,23,23,.45) 75%,rgba(23,23,23,.27) 80%,rgba(23,23,23,.15) 85%,rgba(23,23,23,.08) 90%,rgba(23,23,23,.03) 95%,rgba(23,23,23,0) 100%)`, width:"50%"}}>
                <div className="banner__contents">
                <h1 className="banner__title">{Movie?.title || Movie?.name || Movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play !!</button>
                    <button className="banner__button">My List</button>
                </div>
                <div className="extra_info">
                    <h4 className="first_air" style={{color:"#a3a3a3"}} >{Movie?.first_air_date.split("-")[0] +  "  |  " + " "}</h4>
                    <h4 className="first_air" style={{color:"#a3a3a3",textTransform:"uppercase"}} >{Movie?.original_language +  "  |"}</h4>
                    <h4 className="first_air" style={{color:"#a3a3a3"}} >{Movie?.vote_average +  "/10 "}</h4>
    
                </div>
                <div className="banner__description">
                    {truncate(`${Movie?.overview}`,200)} 
                </div>
                </div>  
            </div>
            

        </div>

        // <header className="banner" style={{
        //     backgroundImage:`url("https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}")`,
        //     backgroundSize:"cover",
        //     backgroundPosition:"center center"
        // }}>


        // <div className="banner__contents">
        //     <h1 className="banner__title">{Movie?.title || Movie?.name || Movie?.original_name}</h1>
        //     <div className="banner__buttons">
        //         <button className="banner__button">Play</button>
        //         <button className="banner__button">My List</button>
        //     </div>
        //     <div className="banner__description">
        //         {truncate(`${Movie?.overview}`,150)} 
        //     </div>
        // </div>  
        // <div className="banner--fadeBottom" />
        // </header>
    )
}

export default Banner

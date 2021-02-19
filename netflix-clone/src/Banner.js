import React, { useEffect, useState } from 'react'
import "./Banner.css"
import Axios from "./axios";
import requests from "./Request";
import { ReactReduxContext } from 'react-redux';

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
            setMovie(movie.data.results[no]);
            return movie;
        }
        fetchData();
    }, [])
    
    console.log(Movie);

    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

    return (

        <header className="banner" style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}")`,
            backgroundSize:"cover",
            backgroundPosition:"center center"
        }}>

        <div className="banner__contents">
            <h1 className="banner__title">{Movie?.title || Movie?.name || Movie?.original_name}</h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <div className="banner__description">
                {truncate(`${Movie?.overview}`,150)} 
            </div>
            <div className="banner--fadeBottom" />
        </div>  
        </header>
    )
}

export default Banner

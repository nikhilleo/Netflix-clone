import React, { useEffect, useState } from 'react'
import Axios from "../axios";
import "./Row.css"

function Rows({title,fetchURL,isLarge}) {


    const [Movie, setMovie] = useState();

    const [Netflix, setNetflix] = useState();
    

    const handleClick = (movie) => {
        if(Movie?.name==movie.name)
        {
            setMovie()
            console.log("in if Else")
            console.log(Netflix);
        }
        else
        {
            console.log("in netflix");
            setMovie(movie);
            console.log(Netflix);
        }
        // // console.log(movie.name);
        // if(Movie?.title == movie?.title)
        // {
        //     setMovie()
        // }
        // else{
            
        //     setMovie(movie);
        // }
       console.log(movie); 
        
    }
    
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }


    const img_path = "https://image.tmdb.org/t/p/original/"
    const [Movies, setMovies] = useState([])
    
    useEffect(() => {
        async function get(){
            const response = await Axios.get(fetchURL);
            console.log(response.data);
            setMovies(response.data);
        }
        get();
    }, [fetchURL])
    
    console.log(Movies);

    return (

        <div className="row">
            <h2>{title}</h2>
            <div className="posters">
                {Movies.map(movie=>(
                (
                <>
                    <img 
                    key={movie.id}
                    // className={isLarge ? "row_poster" : "row_poster_small"} 
                    onClick={()=>handleClick(movie)}
                    className={isLarge ? "row_poster" : "row_poster_small"}
                    src={`${movie.poster_img}`} 
                    alt={movie.name}/>
                    {/* <span className="title">{movie.name ? movie.name : movie.original_title}</span> */}
                </>
                
                )))}
            </div>
            {Movie ?
            (<div className="movie_info" style={{}}>
                <div className="info">
                    <h5>{Movie.name}</h5>
                    <p>{truncate(Movie.overview,200) }</p>
                    <button>Play</button>
                </div>
                <div className="image">
                    <img className="row_info_image" src={`${Movie.carousal_img}`} alt=""/>
                </div>
            </div>) : ""}
        </div>
    )
}

export default Rows

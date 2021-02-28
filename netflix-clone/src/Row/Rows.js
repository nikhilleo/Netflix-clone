import React, { useEffect, useState } from 'react'
import Axios from "../axios";
import "./Row.css"

function Rows({title,fetchURL,isLarge}) {


    const [Movie, setMovie] = useState();


    const handleClick = (movie) => {
        if(Movie)
        {
            setMovie()
        }
        else
        {
            setMovie(movie);
        }
    }
    


    const img_path = "https://image.tmdb.org/t/p/original/"
    const [Movies, setMovies] = useState([])
    
    useEffect(() => {
        async function get(){
            const response = await Axios.get(fetchURL);
            console.log(response.data.results);
            setMovies(response.data.results);
        }
        get();
    }, [fetchURL])


    return (

        <div className="row">
            <h2>{title}</h2>
            <div className="posters">
                {Movies.map(movie=>(
                ((isLarge && movie.poster_path)||
                (!isLarge && movie.poster_path)) && (
                <>
                    <img 
                    onClick={()=>handleClick(movie)}
                    key={movie.id }
                    // className={isLarge ? "row_poster" : "row_poster_small"} 
                    className={isLarge ? "row_poster" : "row_poster_small"}
                    src={`${img_path}${movie.poster_path}`} 
                    alt={movie.name}/>
                    {/* <span className="title">{movie.name ? movie.name : movie.original_title}</span> */}
                </>
                
                )))}
            </div>
            {Movie ? 
            (<div className="movie_info" style={{}}>
                <div className="info">
                    <h5>{Movie.title}</h5>
                    <p>{Movie.overview}</p>
                    <button>Play</button>
                </div>
                <div className="image">
                    <img className="row_info_image" src={`https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}`} alt=""/>
                </div>
            </div>) : ""}
        </div>
    )
}

export default Rows

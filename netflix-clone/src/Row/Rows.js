import React, { useEffect, useState } from 'react'
import Axios from "../axios";
import "./Row.css"

function Rows({title,fetchURL,isLarge}) {


    const [Movie, setMovie] = useState();

    const [Netflix, setNetflix] = useState();
    

    const handleClick = (movie) => {
        if(Netflix?.name==movie.name)
        {
            setNetflix()
            console.log("in if Else")
            console.log(Netflix);
        }
        else
        {
            console.log("in netflix");
            setNetflix(movie);
            console.log(Netflix);
        }
        // console.log(movie.name);
        if(Movie?.title == movie?.title)
        {
            setMovie()
        }
        else{
            
            setMovie(movie);
        }
        
        
    }
    
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
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
                    key={movie.id}
                    // className={isLarge ? "row_poster" : "row_poster_small"} 
                    onClick={()=>handleClick(movie)}
                    className={isLarge ? "row_poster" : "row_poster_small"}
                    src={`${img_path}${movie.poster_path}`} 
                    alt={movie.name}/>
                    {/* <span className="title">{movie.name ? movie.name : movie.original_title}</span> */}
                </>
                
                )))}
            </div>
            {Movie || Netflix  ? 
            (<div className="movie_info" style={{}}>
                <div className="info">
                    <h5>{Movie ? Movie.title : Netflix.name}</h5>
                    <p>{Movie ? truncate(Movie.overview,250) : truncate(Netflix.overview,250) }</p>
                    <button>Play</button>
                </div>
                <div className="image">
                    <img className="row_info_image" src={`https://image.tmdb.org/t/p/original/${Movie ? Movie?.backdrop_path : Netflix?.backdrop_path}`} alt=""/>
                </div>
            </div>) : ""}
        </div>
    )
}

export default Rows

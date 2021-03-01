import React, { useEffect, useState } from 'react'
import Axios from "../axios";
import "./Row.css"
import ReactPlayer from 'react-player'

function Rows({title,fetchURL,isLarge}) {


    const [Movie, setMovie] = useState();

    const [Trailer, setTrailer] = useState();
    

    const showTrailer = (Movie)=>{
        setTrailer(Movie.trailer_url)
        var video = document.getElementById("video");
        if(video)
        {
            video?.classList.remove("videoNone")
        }
        document.body.classList.add("dis")
    }

    const closeVideo =  ()=>{
        var video = document.getElementById("video");
        if(video)
        {
            video?.classList.add("videoNone")
            document.body.classList.remove("dis")
        }
        setTrailer();
    }

    const handleClick = (movie) => {
        if(Movie?.name==movie.name)
        {
            setMovie()
            console.log("in if Else")
        }
        else
        {
            console.log("in netflix");
            setMovie(movie);
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
                   <div className="info_buttons">
                   <button onClick={()=>showTrailer(Movie)}>Trailer</button>
                   <button>Watch</button>
                   </div>
                </div>
                <div className="image">
                    <img className="row_info_image" src={`${Movie.carousal_img}`} alt=""/>
                </div>
            </div>
                ) : ""}
                {Trailer ? (
                    <div id="video" className="video">
                    <ReactPlayer id="a" width="50vw" height='60vh' style={{
                        // display:"block",
                        position:"fixed",
                        top:"25%",
                        left:"25%"
                        // marginBottom:"400px"
                    }} controls="true" url={Trailer} />
                    <button onClick={closeVideo}>X</button>
                </div>
                ): ""}
        </div>
    )
}

export default Rows

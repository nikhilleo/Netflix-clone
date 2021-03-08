
const api_key = "a58822497074ee7158002f1f8457cd68";

const Requests = {
    // fetchTrending : `trending/all/week?api_key=${api_key}&language=en-US`,
    // fetchNetflixOriginals:`discover/tv?api_key=${api_key}&with_networks=213&language=en-US`,
    // fetchActionMovies:`discover/movie?api_key=${api_key}&with_genres=28`,
    // fetchTopRated:`movie/top_rated?api_key=${api_key}&language=en-US`,
    // fetchComedy:`discover/movie?api_key=${api_key}&with_genres=35`,
    // fetchHorror:`discover/movie?api_key=${api_key}&with_genres=27`,
    // fetchRomance:`discover/movie?api_key=${api_key}&with_genres=10749`,
    // fetchDocs:`discover/movie?api_key=${api_key}&with_genres=99`,
    fetchTopRated:"https://netflix-clone-backend-1008.herokuapp.com/topRated/getTopRated",
    fetchHorror:"https://netflix-clone-backend-1008.herokuapp.com/horror/getHorror",
    fetchActionMovies:"https://netflix-clone-backend-1008.herokuapp.com/action/getAction",
    fetchRomance:"https://netflix-clone-backend-1008.herokuapp.com/romance/getRomance",
    fetchTrending:"https://netflix-clone-backend-1008.herokuapp.com/trending/getTrending",
    fetchComedy:"https://netflix-clone-backend-1008.herokuapp.com/comedy/getComedy",
    fetchDocs:"https://netflix-clone-backend-1008.herokuapp.com/docs/getDocs",
    fetchNetflixOriginals:"https://netflix-clone-backend-1008.herokuapp.com/originals/getOriginals"
}

export default Requests;
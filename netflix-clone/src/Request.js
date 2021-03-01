
const api_key = "a58822497074ee7158002f1f8457cd68";

const Requests = {
    // fetchTrending : `trending/all/week?api_key=${api_key}&language=en-US`,
    fetchNetflixOriginals:`discover/tv?api_key=${api_key}&with_networks=213&language=en-US`,
    fetchTopRated:`movie/top_rated?api_key=${api_key}&language=en-US`,
    fetchActionMovies:`discover/movie?api_key=${api_key}&with_genres=28`,
    fetchComedy:`discover/movie?api_key=${api_key}&with_genres=35`,
    fetchHorror:`discover/movie?api_key=${api_key}&with_genres=27`,
    fetchRomance:`discover/movie?api_key=${api_key}&with_genres=10749`,
    fetchDocs:`discover/movie?api_key=${api_key}&with_genres=99`,
    fetchTrending:"http://localhost:8080/trending/getTrending"
}

export default Requests;
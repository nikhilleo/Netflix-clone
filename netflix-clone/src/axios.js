
import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/"
    // baseURL:"http://localhost:8080"
})

export default instance;
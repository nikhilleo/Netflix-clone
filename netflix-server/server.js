require("dotenv").config();
require("../netflix-server/Database/database");
const express = require('express');
const app = express();
const morgan = require("morgan");
const port = process.env.PORT
const Axios = require("axios");
const download = require('image-downloader')
var trendingdata = [];

app.use(morgan("dev"));

app.get('/', async (req, res) => {
    const trending = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTrending}`)
    trendingdata = trending.data.results;
    for (let i = 0; i < trendingdata.length; i++) {
        if(trendingdata[i].title)
        {
            const options = {
                url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                dest: `./Uploads/${trendingdata[i].title}.jpg`
            }
            download.image(options)
            .then(async({filename}) => {
                if(filename)
                {
                    console.log(Date(Date.now().toLocaleString()))
                    // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
                }
            })
            .catch((err) => console.log(err))
        }
        if(trendingdata[i].original_name)
        {
            const options = {
                url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                dest: `./Uploads/${trendingdata[i].original_name}.jpg`
            }
            download.image(options)
            .then(({filename}) => {
                if(filename)
                {
                    console.log(Date(Date.now().toLocaleString()))
                }
                // console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
            })
            .catch((err) => console.log(err))
        }
    }
    res.send("Updated");
});;

app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
});
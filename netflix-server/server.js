
require("dotenv").config();
require("../netflix-server/Database/database");
const express = require('express');
const app = express();
const morgan = require("morgan");
const port = process.env.PORT
const Axios = require("axios");
const download = require('image-downloader')
const Trending = require("./models/trending");
const cloudinary = require('cloudinary').v2;
var trendingdata = [];
const fs = require("fs");

cloudinary.config({ 
    cloud_name: 'uccrgo5202', 
    api_key: '448152779933652', 
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE' 
  });

app.use(morgan("dev"));

app.get('/', async (req, res) => {
    const trending = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTrending}`)
    trendingdata = trending.data.results;
    for (let i = 0; i < trendingdata.length; i++) {
        if(trendingdata[i].title)
        {
            const data = {
                tmdb_id : trendingdata[i].id,
                name : trendingdata[i].title,
                overview : trendingdata[i].overview,
                date_of_release:trendingdata[i].release_date,
                language:trendingdata[i].original_language,
                avg_votes:trendingdata[i].vote_average,
                // carousal_img:process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path,
                // poster_img:process.env.BACK_IMAGE_URL + trendingdata[i].poster_path
            }
            // console.log(data);
            const options = {
                url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                dest: `./Uploads/${trendingdata[i].title}.jpg`
            }
            download.image(options)
            .then(async({filename}) => {
                if(filename)
                {
                    // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
                    const img_url = await cloudinary.uploader.upload(filename);
                    // await console.log(img_url);
                    data.poster_img = img_url.url
                    console.log(data);
                    fs.unlink(filename,(err)=>{
                        if(err) console.log(err)
                        else
                        console.log(`Deleted file: ${filename}`); 
                    });
                }
            })
            .catch((err) => console.log(err))
        }
        if(trendingdata[i].name)
        {
            const data = {
                tmdb_id : trendingdata[i].id,
                name : trendingdata[i].name,
                overview : trendingdata[i].overview,
                date_of_release:trendingdata[i].first_air_date,
                language:trendingdata[i].original_language,
                avg_votes:trendingdata[i].vote_average,
                // carousal_img:process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path,
                // poster_img:process.env.BACK_IMAGE_URL + trendingdata[i].poster_path
            }
            console.log(data);
            const options = {
                url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                dest: `./Uploads/${trendingdata[i].name}.jpg`
            }
            download.image(options)
            .then(async({filename}) => {
                if(filename)
                {
                    // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
                    const img_url = await cloudinary.uploader.upload(filename);
                    // await console.log(img_url);
                    data.poster_img = img_url.url
                    console.log(data);
                    fs.unlink(filename,(err)=>{
                        if(err) console.log(err)
                        else
                        console.log(`Deleted file: ${filename}`); 
                    });
                }
            })
            .catch((err) => console.log(err))
        }
    }
    res.send("Updated");
});;

app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
});
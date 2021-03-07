

require("dotenv").config();
require("../netflix-server/Database/database");
const express = require('express');
const app = express();
const morgan = require("morgan");
const port = process.env.PORT
const cors = require("cors");
const trending_routes = require("./routes/trending");
const original_routes = require("./routes/originals");
const topRated_routes = require("./routes/topRated");
const action_routes = require("./routes/action");
const comedy_routes = require("./routes/comedy");
const horror_routes = require("./routes/horror");
const romance_routes = require("./routes/romance");
const docs_routes = require("./routes/docs");
const Axios = require("axios");


setInterval(()=>{
        Axios.get("http://localhost:8080/").then((res)=>{
            console.log(res.data)
            console.log(Date(Date.now().toLocaleString()))
        }).catch((err)=>{
            console.log(err.response.data);
        })
    }, 25 * 60 * 1000 )


app.use(cors());

app.use(morgan("dev"));

app.use("/trending",trending_routes);

app.use("/originals",original_routes);

app.use("/topRated",topRated_routes);

app.use("/action",action_routes);

app.use("/comedy",comedy_routes);

app.use("/horror",horror_routes);

app.use("/romance",romance_routes);

app.use("/docs",docs_routes);

app.use("/",(req,res)=>{
    res.send("Hello From Netflix Server");
});

app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
});



// setInterval(()=>{
//     Axios.get("http://localhost:8080/").then((res)=>{
//         console.log(res.data)
//     }).catch((err)=>{
//         console.log(err.response.data);
//     })
// },50000)


// cloudinary.config({
//     cloud_name: 'uccrgo5202',
//     api_key: '448152779933652',
//     api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
// });




// app.get('/trending/updateTrending/', async (req, res) => {
//     // cloudinary.api.delete_folder("TrendingCarousal/",(res)=>{
//     //     console.log(res)
//     // })
//     // cloudinary.api.delete_folder("TrendingPosters/",(res)=>{
//     //     console.log(res)
//     // })
//     // cloudinary.api.delete_resources_by_prefix('TrendingPosters/', function(result){
//     //     console.log(result)
//     // })
//     const pos_deleted = await cloudinary.api.delete_resources_by_prefix("TrendingPosters/")
//     console.log(pos_deleted);
//     const car_deleted = await cloudinary.api.delete_resources_by_prefix('TrendingCarousal/')
//     console.log(car_deleted);
//     // cloudinary.api.delete_resources_by_prefix("TrendingCarousal/", function (re) {
//     //     console.log(re);
//     // });
//     // cloudinary.api.delete_resources_by_prefix("TrendingPosters/", function (re) {
//     //     console.log(re);
//     // });
//     await Trending.deleteMany({});
//     const trending = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTrending}`)
//     trendingdata = trending.data.results;
//     for (let i = 0; i < trendingdata.length; i++) {
//         if (trendingdata[i].title || trendingdata[i].name) {
//             const data = {
//                 tmdb_id: trendingdata[i].id,
//                 name: trendingdata[i].title || trendingdata[i].name,
//                 overview: trendingdata[i].overview,
//                 date_of_release: trendingdata[i].release_date || trendingdata[i].first_air_date,
//                 language: trendingdata[i].original_language,
//                 avg_votes: trendingdata[i].vote_average,
//             }
//             if (trendingdata[i].title) {
//                 var options = {
//                     url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
//                     dest: `./PosterUploads/${trendingdata[i].title}.jpg`,
//                 }
//             } else if (trendingdata[i].name) {
//                 var options = {
//                     url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
//                     dest: `./PosterUploads/${trendingdata[i].name}.jpg`,
//                 }
//             }
//             download.image(options)
//                 .then(async ({
//                     filename
//                 }) => {
//                     if (filename) { 
//                         const img_url = await cloudinary.uploader.upload(filename, {
//                             folder: "TrendingPosters/"
//                         });
//                         data.poster_img = img_url.url
//                         var cnt = 1;
//                         if (cnt == 1) {
//                             const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
//                             const trailer_url = getURL(r.all, data.name)
//                             data.trailer_url = trailer_url
//                             cnt++;
//                         }
//                         const trending_data = await new Trending(data);
//                         await trending_data.save();
//                         carousal_downUp(trending_data._id, trending_data.name, process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path);
//                         fs.unlink(filename, (err) => {
//                             if (err) console.log(err)
//                             else
//                             console.log(`Deleted file: ${filename}`); 
//                         });
//                     }
//                 })
//                 .catch((err) => console.log(err))
//         }
//     }
//     res.send("Updated Trending");
// });;

// function carousal_downUp(id, name, url) {
//     const options = {
//         url: url,
//         dest: `./CarousalUploads/${name}.jpg`,
//     }
//     download.image(options)
//         .then(async ({
//             filename
//         }) => {
//             if (filename) {
//                 const img_url = await cloudinary.uploader.upload(filename, {
//                     folder: "TrendingCarousal/"
//                 });
//                 const data = await Trending.findByIdAndUpdate({
//                     _id: id
//                 }, {
//                     carousal_img: img_url.url
//                 });
//                 fs.unlink(filename, (err) => {
//                     if (err) console.log(err)
//                     else
//                     console.log(`Deleted file: ${filename}`); 
//                 });
//             }

//         })
// }


// function getURL(data, name1) {
//     var flag = 0;
//     var goodLinks = []
//     const name = name1.toLowerCase()
//     for (let i = 0; i < data.length; i++) {
//         var title = data[i].title.toLowerCase();
//         if (title.includes(":")) {
//             title.replace(":", "");
//         }
//         if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 180) {
//             goodLinks.push(data[i].url);
//         }
//     }
//     if (goodLinks.length < 1) {
//         for (let i = 0; i < data.length; i++) {
//             if (title.includes(":")) {
//                 title.replace(":", "");
//             }
//             if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 300) {
//                 goodLinks.push(data[i].url);
//             }
//         }
//     }
//     return goodLinks;
// }

